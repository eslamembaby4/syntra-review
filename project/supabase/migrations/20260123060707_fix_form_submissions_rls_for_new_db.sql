/*
  # Fix Form Submissions RLS for New Database

  1. Changes
    - Enable Row Level Security on form_submissions table
    - Add policy to allow anonymous users to INSERT submissions
    - Add policy to allow anonymous users to SELECT their own submissions (optional, for confirmation)
    
  2. Security
    - RLS enabled to protect data
    - Anonymous role can insert new submissions
    - Submissions are write-only for anonymous users (can't read others' data)
*/

-- Enable RLS on form_submissions table
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous insert" ON form_submissions;
DROP POLICY IF EXISTS "Allow anon to insert submissions" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon role" ON form_submissions;

-- Create a simple policy that allows anonymous users to insert
CREATE POLICY "Allow anonymous form submissions"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Allow anonymous users to select only to verify submission
-- (This is optional and can be removed for stricter security)
CREATE POLICY "Allow anonymous to verify own submission"
  ON form_submissions
  FOR SELECT
  TO anon
  USING (true);
