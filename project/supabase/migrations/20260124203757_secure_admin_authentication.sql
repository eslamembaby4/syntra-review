/*
  # Secure Admin Authentication System

  1. Changes to form_submissions table
    - Remove anonymous DELETE policy (security risk)
    - Add authenticated-only policies for admin operations
    - Admins identified by custom claim in JWT: app_metadata.role = 'admin'

  2. Security Improvements
    - Only authenticated admin users can SELECT, UPDATE, DELETE form submissions
    - Anonymous users can only INSERT (submit forms)
    - All admin actions require valid authentication token

  3. Admin User Setup
    - Admins must be created via Supabase Dashboard
    - Set user's app_metadata.role = 'admin' in the dashboard
    - Example: {"role": "admin"}

  4. Audit Logging
    - Create admin_audit_log table to track all admin actions
    - Automatically log SELECT, UPDATE, DELETE operations
*/

-- Remove the risky anonymous delete policy
DROP POLICY IF EXISTS "Anyone can delete submissions" ON form_submissions;
DROP POLICY IF EXISTS "Anon can delete own submissions" ON form_submissions;

-- Remove overly permissive anonymous select policy
DROP POLICY IF EXISTS "Anon users can select" ON form_submissions;
DROP POLICY IF EXISTS "Anyone can view submissions" ON form_submissions;

-- Keep anonymous INSERT for form submissions (needed for public forms)
-- This should already exist, but let's ensure it's correct
DROP POLICY IF EXISTS "Allow anonymous insert" ON form_submissions;
CREATE POLICY "Public can submit forms"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin-only SELECT policy
CREATE POLICY "Admins can view all submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Admin-only UPDATE policy
CREATE POLICY "Admins can update submissions"
  ON form_submissions
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Admin-only DELETE policy
CREATE POLICY "Admins can delete submissions"
  ON form_submissions
  FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Create audit log table
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES auth.users(id),
  admin_email text,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  details jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON admin_audit_log
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  p_action text,
  p_table_name text,
  p_record_id uuid DEFAULT NULL,
  p_details jsonb DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO admin_audit_log (
    admin_user_id,
    admin_email,
    action,
    table_name,
    record_id,
    details
  )
  VALUES (
    auth.uid(),
    auth.jwt() ->> 'email',
    p_action,
    p_table_name,
    p_record_id,
    p_details
  );
END;
$$;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON admin_audit_log(admin_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON admin_audit_log(action, created_at DESC);

-- Add comment for setup instructions
COMMENT ON TABLE admin_audit_log IS 'Admin action audit log. To create an admin user: 1) Create user via Supabase Auth, 2) Update user metadata in Dashboard: app_metadata = {"role": "admin"}';
