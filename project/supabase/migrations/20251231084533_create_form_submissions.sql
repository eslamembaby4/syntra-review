/*
  # Create Form Submissions Table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `form_type` (text) - Type of form (partner_inquiry, investor_inquiry)
      - `first_name` (text) - Submitter's first name
      - `last_name` (text) - Submitter's last name
      - `email` (text) - Submitter's email address
      - `organization` (text) - Organization/company name
      - `interest_type` (text) - Type of interest/inquiry
      - `message` (text) - Message or inquiry details
      - `created_at` (timestamptz) - Timestamp of submission
      - `read_status` (boolean) - Whether the submission has been read (default: false)

  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for service role to insert submissions (for anonymous form submissions)
    - Add policy for authenticated users to read all submissions (for admin access)

  3. Important Notes
    - Forms are public-facing, so we allow inserts without authentication
    - Only authenticated users (admins) can view submissions
    - Data integrity is maintained with NOT NULL constraints on key fields
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  organization text NOT NULL,
  interest_type text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  read_status boolean DEFAULT false
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert form submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
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

CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_read_status ON form_submissions(read_status);