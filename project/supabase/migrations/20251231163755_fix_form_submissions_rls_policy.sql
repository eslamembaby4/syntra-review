/*
  # Fix Form Submissions RLS Policy
  
  1. Changes
    - Drop existing INSERT policy
    - Recreate INSERT policy with explicit anon access
    - Ensure public role can also insert
    
  2. Security
    - Allow anonymous form submissions (public-facing forms)
    - Maintain read restrictions to authenticated users only
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can insert form submissions" ON form_submissions;

-- Recreate with explicit permissions for anonymous users
CREATE POLICY "Enable insert for anon users"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users"
  ON form_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
