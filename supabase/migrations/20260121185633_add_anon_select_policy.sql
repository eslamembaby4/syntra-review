/*
  # Add SELECT policy for anonymous users
  
  1. Changes
    - Add policy to allow anonymous users to read form submissions
    - This allows the admin panel and queries to view all submissions
  
  2. Security
    - Allows anonymous role to SELECT all form submissions
    - Necessary for viewing submissions in admin dashboards
*/

-- Add SELECT policy for anonymous users
CREATE POLICY "anon_select_submissions"
  ON form_submissions
  FOR SELECT
  TO anon
  USING (true);
