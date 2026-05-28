/*
  # Add Storage Policies for Career Applications Bucket

  1. Storage Policies
    - Allow anonymous users to INSERT (upload) resumes to the career-applications bucket
    - Allow everyone to SELECT (download/view) files from the career-applications bucket

  2. Security
    - Anonymous users can only upload to the resumes/ folder
    - All users can view/download resumes (public bucket)
    - File size and type validation is handled at the bucket level (5MB max, PDF/DOC/DOCX only)
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous users to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to career applications" ON storage.objects;

-- Allow anonymous users to upload resumes to the career-applications bucket
CREATE POLICY "Allow anonymous users to upload resumes"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (
    bucket_id = 'career-applications'
    AND (storage.foldername(name))[1] = 'resumes'
  );

-- Allow everyone to view/download files from the career-applications bucket
CREATE POLICY "Allow public access to career applications"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'career-applications');