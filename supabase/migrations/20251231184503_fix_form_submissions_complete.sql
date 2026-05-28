/*
  Fix form_submissions table structure and RLS policies
  
  This migration:
  1. Adds missing columns (organization, interest_type, read_status)
  2. Fixes RLS policies to allow anon INSERT
  3. Grants sequence permissions to anon role
*/

-- Add missing columns if they don't exist
DO $$ 
BEGIN
  -- Add organization column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'form_submissions' AND column_name = 'organization'
  ) THEN
    ALTER TABLE public.form_submissions ADD COLUMN organization text;
  END IF;

  -- Add interest_type column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'form_submissions' AND column_name = 'interest_type'
  ) THEN
    ALTER TABLE public.form_submissions ADD COLUMN interest_type text;
  END IF;

  -- Add read_status column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'form_submissions' AND column_name = 'read_status'
  ) THEN
    ALTER TABLE public.form_submissions ADD COLUMN read_status boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them correctly
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public.form_submissions;

-- Create INSERT policy for anonymous and authenticated users
CREATE POLICY "Anyone can submit forms"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create SELECT policy for authenticated users only
CREATE POLICY "Authenticated users can view all submissions"
  ON public.form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create UPDATE policy for authenticated users only
CREATE POLICY "Authenticated users can update submissions"
  ON public.form_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy for authenticated users only
CREATE POLICY "Authenticated users can delete submissions"
  ON public.form_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Grant sequence permissions to anon role
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'form_submissions_ref_seq') THEN
    GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO anon;
    GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO authenticated;
  END IF;
END $$;

-- Grant table permissions explicitly
GRANT INSERT ON TABLE public.form_submissions TO anon;
GRANT ALL ON TABLE public.form_submissions TO authenticated;

-- Verify the setup
DO $$
BEGIN
  RAISE NOTICE 'Migration complete. Policies configured for anon INSERT access.';
END $$;
