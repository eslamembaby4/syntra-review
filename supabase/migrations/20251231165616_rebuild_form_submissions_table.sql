/*
  # Rebuild Form Submissions Table with Proper Permissions
  
  1. Changes
    - Drop existing form_submissions table and related objects
    - Recreate table with all necessary columns
    - Create sequence for reference IDs
    - Set up trigger function for auto-generating reference IDs
    - Grant all necessary permissions to anon and authenticated roles
    
  2. Security
    - Enable RLS on form_submissions table
    - Allow anonymous users to INSERT submissions
    - Allow authenticated users to SELECT, INSERT, and UPDATE submissions
    - Grant sequence usage to both anon and authenticated roles
    - Grant execute permission on trigger function
*/

-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS set_reference_id ON form_submissions;
DROP FUNCTION IF EXISTS generate_reference_id() CASCADE;
DROP SEQUENCE IF EXISTS form_submission_ref_seq CASCADE;
DROP TABLE IF EXISTS form_submissions CASCADE;

-- Create the form_submissions table
CREATE TABLE form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id text UNIQUE,
  form_type text NOT NULL,
  first_name text,
  last_name text,
  email text NOT NULL,
  company text,
  phone text,
  message text,
  additional_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sequence for reference IDs
CREATE SEQUENCE form_submission_ref_seq START 1;

-- Grant sequence usage to all roles
GRANT USAGE ON SEQUENCE form_submission_ref_seq TO anon;
GRANT USAGE ON SEQUENCE form_submission_ref_seq TO authenticated;
GRANT USAGE ON SEQUENCE form_submission_ref_seq TO service_role;

-- Create function to generate reference IDs
CREATE OR REPLACE FUNCTION generate_reference_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reference_id := 'SR-REQ-' || LPAD(nextval('form_submission_ref_seq')::text, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION generate_reference_id() TO anon;
GRANT EXECUTE ON FUNCTION generate_reference_id() TO authenticated;
GRANT EXECUTE ON FUNCTION generate_reference_id() TO service_role;

-- Create trigger
CREATE TRIGGER set_reference_id
  BEFORE INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION generate_reference_id();

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anonymous users can insert submissions"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert submissions"
  ON form_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON form_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX idx_form_submissions_email ON form_submissions(email);
CREATE INDEX idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_reference_id ON form_submissions(reference_id);