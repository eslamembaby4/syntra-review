/*
  # Grant Sequence Permissions to Anonymous Users
  
  1. Changes
    - Grant USAGE on form_submission_ref_seq to anon role
    - This allows the trigger function to generate reference IDs for anonymous submissions
    
  2. Security
    - Only grants sequence usage, not direct table access
    - RLS policies still control table access
*/

-- Grant usage on sequence to anon users so the trigger can work
GRANT USAGE ON SEQUENCE form_submission_ref_seq TO anon;
GRANT USAGE ON SEQUENCE form_submission_ref_seq TO authenticated;
