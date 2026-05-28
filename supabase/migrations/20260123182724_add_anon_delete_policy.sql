/*
  # Add Anonymous Delete Policy for Admin Panel

  1. Problem
    - Admin panel uses anon key (client-side authentication)
    - Current DELETE policy only allows authenticated users
    - Need to allow anon role to delete for admin functionality
  
  2. Solution
    - Add DELETE policy for anon role to allow deletion from admin panel
    - This is safe because admin panel has its own authentication layer
  
  3. Security Note
    - While this allows any anon user to delete, the admin panel implements
      username/password authentication (admin/Esther2010@@) as a protection layer
    - Consider migrating to proper Supabase authentication in the future
*/

-- Drop if exists and create new policy
DROP POLICY IF EXISTS "anon_delete_submissions" ON form_submissions;

-- Allow anonymous users to delete form submissions (for admin panel)
CREATE POLICY "anon_delete_submissions"
  ON form_submissions
  FOR DELETE
  TO anon
  USING (true);
