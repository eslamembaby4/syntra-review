/*
  # Fix RLS Policy for Form Submissions - Final Fix

  1. Changes
    - Drop existing INSERT policy
    - Create new INSERT policy using different syntax
    - Try explicit boolean true instead of implicit
    
  2. Security
    - Allow anonymous form submissions with explicit true check
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON form_submissions;

-- Create policy with explicit (true) expression
CREATE POLICY "Enable insert for form submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK ((true));
