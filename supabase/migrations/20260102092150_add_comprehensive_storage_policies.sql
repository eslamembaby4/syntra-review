/*
  # Add Comprehensive Storage Policies for Career Applications

  1. Updates
    - Add UPDATE and DELETE policies for completeness
    - Ensure all operations are explicitly allowed
    - Simplify INSERT policy with explicit role grants

  2. Security
    - Public can INSERT, SELECT, UPDATE, DELETE on career-applications bucket
    - Files restricted to resumes/ folder for uploads
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to career applications" ON storage.objects;

-- Allow anyone to INSERT (upload) files to career-applications bucket
CREATE POLICY "career_applications_insert"
  ON storage.objects
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (
    bucket_id = 'career-applications'
    AND (storage.foldername(name))[1] = 'resumes'
  );

-- Allow anyone to SELECT (read) files from career-applications bucket
CREATE POLICY "career_applications_select"
  ON storage.objects
  FOR SELECT
  TO public, anon, authenticated
  USING (bucket_id = 'career-applications');

-- Allow anyone to UPDATE files in career-applications bucket
CREATE POLICY "career_applications_update"
  ON storage.objects
  FOR UPDATE
  TO public, anon, authenticated
  USING (bucket_id = 'career-applications')
  WITH CHECK (bucket_id = 'career-applications');

-- Allow anyone to DELETE files from career-applications bucket
CREATE POLICY "career_applications_delete"
  ON storage.objects
  FOR DELETE
  TO public, anon, authenticated
  USING (bucket_id = 'career-applications');