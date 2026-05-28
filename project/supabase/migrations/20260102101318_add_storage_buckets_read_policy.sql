/*
  # Add Storage Buckets Read Policy for Anon Role

  1. Problem
    - The storage.buckets table has RLS enabled but had NO policies
    - This prevented the anon role from even reading bucket configuration
    - Result: "new row violates row-level security policy" error on uploads

  2. Solution
    - Add SELECT policy on storage.buckets for anon role
    - This allows the Supabase client to read bucket metadata before uploading

  3. Security
    - Only allows reading bucket information (not modifying)
    - Required for file uploads to work with anon key
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow anon to read buckets" ON storage.buckets;

-- Allow anon role to read bucket information
CREATE POLICY "Allow anon to read buckets"
ON storage.buckets FOR SELECT
TO anon
USING (true);
