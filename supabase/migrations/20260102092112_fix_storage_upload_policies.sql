/*
  # Fix Storage Upload Policies for Career Applications

  1. Updates
    - Add policy for authenticated users to upload resumes
    - Ensure both anon and authenticated roles can upload
    - Keep existing SELECT policy

  2. Security
    - Restrict uploads to resumes/ folder only
    - Public read access maintained
*/

-- Drop and recreate the INSERT policy to include both anon and authenticated
DROP POLICY IF EXISTS "Allow anonymous users to upload resumes" ON storage.objects;

-- Allow both anonymous and authenticated users to upload resumes
CREATE POLICY "Allow users to upload resumes"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'career-applications'
    AND (storage.foldername(name))[1] = 'resumes'
  );