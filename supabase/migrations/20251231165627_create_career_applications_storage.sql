/*
  # Create Career Applications Storage Bucket

  1. New Storage Bucket
    - `career-applications` - Stores resume files uploaded by job applicants
      - Organized in `resumes/` folder
      - Files are publicly accessible for review by hiring team

  2. Notes
    - Public bucket to allow easy access to resumes
    - Storage policies are managed by Supabase's default storage policies
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'career-applications', 
  'career-applications', 
  true,
  5242880,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];