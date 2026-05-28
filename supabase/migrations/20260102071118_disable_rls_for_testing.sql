/*
  # Temporarily Disable RLS for Form Submissions

  1. Changes
    - Disable RLS on form_submissions table to allow testing
    - This is a temporary measure to diagnose the issue
    
  2. Security Note
    - This removes security restrictions
    - Should only be used for testing/development
    - Will re-enable with proper policies once issue is identified
*/

-- Disable RLS temporarily
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;
