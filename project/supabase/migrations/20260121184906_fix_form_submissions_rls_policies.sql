/*
  # Fix Form Submissions RLS Policies

  1. Problem
    - Anonymous users cannot insert form submissions despite having policies
    - The existing INSERT policies are not working correctly
  
  2. Solution
    - Drop all existing RLS policies
    - Create a simple, working INSERT policy for anonymous users
    - Maintain security policies for authenticated admin users
  
  3. Security
    - Anonymous users can INSERT form submissions (required for public forms)
    - Only authenticated users can SELECT, UPDATE, or DELETE submissions
    - Ensures form data is secure while allowing public form submissions
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "authenticated_select_policy" ON form_submissions;
DROP POLICY IF EXISTS "authenticated_update_policy" ON form_submissions;
DROP POLICY IF EXISTS "authenticated_delete_policy" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for form submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to update submissions" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to delete submissions" ON form_submissions;

-- Create new simplified policies
-- Allow anonymous users to insert form submissions
CREATE POLICY "anon_insert_submissions"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to insert form submissions
CREATE POLICY "authenticated_insert_submissions"
  ON form_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to view all submissions
CREATE POLICY "authenticated_select_submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update submissions
CREATE POLICY "authenticated_update_submissions"
  ON form_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete submissions
CREATE POLICY "authenticated_delete_submissions"
  ON form_submissions
  FOR DELETE
  TO authenticated
  USING (true);
