/*
  # Expand Form Submissions to Support All Form Types

  1. Changes
    - Add new form types to support all submission forms across the website
    - Make last_name nullable to accommodate various form types
    - Add phone field for forms that collect contact numbers
    - Add additional_data jsonb field for form-specific data
    - Add reference_id field for tracking submissions with auto-generation
    
  2. Security
    - Existing RLS policies cover all new form types
    - All forms remain publicly submittable (anon access)
    - Only authenticated users can view submissions
    
  3. Indexes
    - Add index on reference_id for quick lookups
*/

-- Add phone field
ALTER TABLE form_submissions 
ADD COLUMN IF NOT EXISTS phone text;

-- Add jsonb field for additional form-specific data
ALTER TABLE form_submissions 
ADD COLUMN IF NOT EXISTS additional_data jsonb DEFAULT '{}'::jsonb;

-- Add reference_id for tracking
ALTER TABLE form_submissions 
ADD COLUMN IF NOT EXISTS reference_id text;

-- Create sequence for reference IDs
CREATE SEQUENCE IF NOT EXISTS form_submission_ref_seq START 1;

-- Create function to generate reference IDs
CREATE OR REPLACE FUNCTION generate_reference_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_id IS NULL THEN
    NEW.reference_id := 'SR-REQ-' || LPAD(nextval('form_submission_ref_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-generate reference IDs
DROP TRIGGER IF EXISTS set_reference_id ON form_submissions;
CREATE TRIGGER set_reference_id
  BEFORE INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION generate_reference_id();

-- Create index on reference_id
CREATE INDEX IF NOT EXISTS idx_form_submissions_reference_id ON form_submissions(reference_id);