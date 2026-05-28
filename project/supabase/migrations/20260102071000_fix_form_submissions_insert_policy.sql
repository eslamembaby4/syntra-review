/*
  # Fix Form Submissions RLS Insert Policy

  1. Changes
    - Drop existing INSERT policy that's causing issues
    - Create new explicit INSERT policy allowing anonymous submissions
    - Ensure WITH CHECK clause properly evaluates to true
    
  2. Security
    - Maintain secure access for anonymous form submissions
    - Keep other policies (SELECT, UPDATE, DELETE) for authenticated only
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "anon_authenticated_insert_policy" ON form_submissions;

-- Create new INSERT policy with explicit TRUE condition
CREATE POLICY "Allow anonymous form submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
