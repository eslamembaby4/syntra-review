/*
  # Fix Storage Policies for Anon Role

  1. Changes
    - Drop existing storage policies that only allow 'public' role
    - Recreate policies to allow both 'anon' and 'public' roles for career-applications bucket
    - This fixes the "new row violates row-level security policy" error on file uploads

  2. Security
    - Maintains the same security restrictions (resumes folder, file size, mime types)
    - Simply adds the 'anon' role which is used by the Supabase client
*/

-- Drop existing policies
DROP POLICY IF EXISTS career_applications_select ON storage.objects;
DROP POLICY IF EXISTS career_applications_insert ON storage.objects;
DROP POLICY IF EXISTS career_applications_update ON storage.objects;
DROP POLICY IF EXISTS career_applications_delete ON storage.objects;

-- Recreate policies with both anon and public roles
CREATE POLICY "career_applications_select"
ON storage.objects FOR SELECT
TO anon, public
USING (bucket_id = 'career-applications');

CREATE POLICY "career_applications_insert"
ON storage.objects FOR INSERT
TO anon, public
WITH CHECK (
  bucket_id = 'career-applications' 
  AND (storage.foldername(name))[1] = 'resumes'
);

CREATE POLICY "career_applications_update"
ON storage.objects FOR UPDATE
TO anon, public
USING (bucket_id = 'career-applications')
WITH CHECK (bucket_id = 'career-applications');

CREATE POLICY "career_applications_delete"
ON storage.objects FOR DELETE
TO anon, public
USING (bucket_id = 'career-applications');
