/*
  Complete form_submissions setup with sequence and clean RLS policies
*/

-- Create sequence for reference IDs
CREATE SEQUENCE IF NOT EXISTS public.form_submissions_ref_seq START WITH 1;

-- Update reference_id column to use the sequence if not already set
ALTER TABLE public.form_submissions 
  ALTER COLUMN reference_id SET DEFAULT ('SR-REQ-' || LPAD(nextval('form_submissions_ref_seq')::text, 6, '0'));

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;
DROP POLICY IF EXISTS "Anonymous users can insert submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can insert submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Allow public form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Allow authenticated to view submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Allow authenticated to update submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Allow authenticated to delete submissions" ON public.form_submissions;

-- Ensure RLS is enabled
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create INSERT policy for anon and authenticated (WITH CHECK true = allow all inserts)
CREATE POLICY "anon_authenticated_insert_policy"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create SELECT policy for authenticated only
CREATE POLICY "authenticated_select_policy"
  ON public.form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create UPDATE policy for authenticated only
CREATE POLICY "authenticated_update_policy"
  ON public.form_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create DELETE policy for authenticated only
CREATE POLICY "authenticated_delete_policy"
  ON public.form_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Grant sequence usage to anon and authenticated
GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO anon;
GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO authenticated;

-- Grant explicit INSERT permission to anon
GRANT INSERT ON TABLE public.form_submissions TO anon;
GRANT ALL ON TABLE public.form_submissions TO authenticated;
