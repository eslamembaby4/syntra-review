/*
  ============================================================================
  SYNTRA REFINING - UNIFIED FORM SUBMISSIONS SYSTEM
  ============================================================================

  DASHBOARD-ONLY MIGRATION SCRIPT
  Paste this entire script into Supabase SQL Editor and run it in one click.

  ## What This Creates

  1. **form_submissions table**
     - Unified table for ALL form types across the website
     - Automatic reference ID generation (SR-REQ-000001, SR-REQ-000002, etc.)
     - Flexible schema supporting multiple form types
     - Read/unread status tracking for admin dashboard

  2. **Form Types Supported**
     - partner_inquiry → commercial@syntrarefining.com
     - investor_inquiry → investors@syntrarefining.com
     - career_application → careers@syntrarefining.com
     - supplier_document_submission → commercial@syntrarefining.com
     - supplier_rfq_response → commercial@syntrarefining.com
     - tds_package_request → commercial@syntrarefining.com
     - sds_inquiry → hse@syntrarefining.com
     - newsletter_subscription → marketing@syntrarefining.com

  3. **Security Features**
     - Row Level Security (RLS) enabled
     - Anonymous users can INSERT only (submit forms)
     - Authenticated users can SELECT, UPDATE, DELETE (admin access)
     - Sequence permissions configured for anonymous inserts

  4. **Auto-Generated Reference IDs**
     - Format: SR-REQ-000001, SR-REQ-000002, etc.
     - Automatic incrementing
     - Unique constraint

  5. **Flexible Data Storage**
     - Core fields: first_name, last_name, email, phone, organization
     - Message field for long-form text
     - additional_data JSONB for form-specific fields
     - Supports resume URLs, LinkedIn profiles, custom fields

  ============================================================================
*/

-- ============================================================================
-- 1. DROP EXISTING TABLE IF NEEDED (BE CAREFUL - THIS DELETES DATA)
-- ============================================================================
-- Uncomment the following line ONLY if you want to start fresh
-- DROP TABLE IF EXISTS public.form_submissions CASCADE;
-- DROP SEQUENCE IF EXISTS public.form_submissions_ref_seq CASCADE;

-- ============================================================================
-- 2. CREATE SEQUENCE FOR REFERENCE IDs
-- ============================================================================
CREATE SEQUENCE IF NOT EXISTS public.form_submissions_ref_seq START WITH 1;

-- ============================================================================
-- 3. CREATE FORM_SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.form_submissions (
  -- Primary Key
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Auto-generated Reference ID
  reference_id text UNIQUE DEFAULT ('SR-REQ-' || LPAD(nextval('form_submissions_ref_seq')::text, 6, '0')),

  -- Form Classification
  form_type text NOT NULL,

  -- Contact Information (Core Fields)
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text,

  -- Organization/Company (for B2B forms)
  organization text,
  company text, -- Alias for organization, both supported

  -- Interest/Category
  interest_type text,

  -- Message/Notes
  message text,

  -- Status Tracking
  read_status boolean NOT NULL DEFAULT false,

  -- Additional Data (JSON for flexibility)
  additional_data jsonb NOT NULL DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_read_status ON public.form_submissions(read_status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_reference_id ON public.form_submissions(reference_id);

-- ============================================================================
-- 5. CREATE UPDATE TRIGGER FOR updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_form_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_form_submissions_updated_at ON public.form_submissions;
CREATE TRIGGER trigger_update_form_submissions_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_form_submissions_updated_at();

-- ============================================================================
-- 6. ENABLE ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 7. CREATE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public.form_submissions;

-- Policy 1: Allow anonymous users to INSERT (submit forms)
CREATE POLICY "Anyone can submit forms"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Allow authenticated users to SELECT (view in admin)
CREATE POLICY "Authenticated users can view all submissions"
  ON public.form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Allow authenticated users to UPDATE (mark as read/unread)
CREATE POLICY "Authenticated users can update submissions"
  ON public.form_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Allow authenticated users to DELETE
CREATE POLICY "Authenticated users can delete submissions"
  ON public.form_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- 8. GRANT PERMISSIONS TO ANON ROLE
-- ============================================================================
-- Critical: Allow anon role to use the sequence for reference_id generation
GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO anon;
GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO authenticated;

-- Grant INSERT permission to anon (covered by RLS policy, but explicit is better)
GRANT INSERT ON TABLE public.form_submissions TO anon;
GRANT ALL ON TABLE public.form_submissions TO authenticated;

-- ============================================================================
-- 9. TEST DATA (OPTIONAL - COMMENT OUT IF NOT NEEDED)
-- ============================================================================
-- Insert a test submission to verify everything works
/*
INSERT INTO public.form_submissions (
  form_type,
  first_name,
  last_name,
  email,
  phone,
  organization,
  interest_type,
  message,
  additional_data
) VALUES (
  'partner_inquiry',
  'Test',
  'User',
  'test@example.com',
  '+1-555-0100',
  'Test Company Inc',
  'Commercial Partnership',
  'This is a test submission to verify the database is working correctly.',
  '{"test": true, "source": "migration_script"}'::jsonb
);
*/

-- ============================================================================
-- 10. VERIFICATION QUERIES
-- ============================================================================
-- Run these queries to verify the migration succeeded:

-- Check if table exists and has correct structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'form_submissions' AND table_schema = 'public'
-- ORDER BY ordinal_position;

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'form_submissions';

-- Check policies
-- SELECT policyname, permissive, roles, cmd FROM pg_policies WHERE tablename = 'form_submissions';

-- Count submissions
-- SELECT COUNT(*) as total_submissions FROM public.form_submissions;

-- View recent submissions
-- SELECT reference_id, form_type, first_name, email, created_at
-- FROM public.form_submissions
-- ORDER BY created_at DESC
-- LIMIT 10;

/*
  ============================================================================
  MIGRATION COMPLETE
  ============================================================================

  Next Steps:
  1. Run this script in Supabase SQL Editor
  2. Set up storage bucket for career resume uploads (see STORAGE_SETUP.md)
  3. Deploy the edge function for email notifications
  4. Update frontend to use the unified form system

  ============================================================================
*/
