/*
  # Fix Security Issues

  1. Security Fixes
    - Fix function search_path mutable issue by setting explicit search_path
    - Add SECURITY DEFINER to generate_reference_id function
    
  2. Notes
    - The function now has an immutable search_path for security
    - Indexes are kept as they will be used as data grows and queries are optimized
*/

-- Recreate the function with explicit search_path
CREATE OR REPLACE FUNCTION generate_reference_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.reference_id IS NULL THEN
    NEW.reference_id := 'SR-REQ-' || LPAD(nextval('form_submission_ref_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;