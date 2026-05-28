/*
  # Update reference ID format to REF-SYN-XXXXXX

  1. Changes
    - Update the default value for reference_id column to use 'REF-SYN-' prefix
    - Maintains the 6-digit sequential number format
    - Ensures existing sequence continues incrementing

  2. Format
    - Old: SR-REQ-000001, SR-REQ-000002, etc.
    - New: REF-SYN-000001, REF-SYN-000002, etc.

  3. Notes
    - Does not affect existing records
    - Only applies to new insertions
    - Sequence continues from current value
*/

-- Update reference_id column default to use new format
ALTER TABLE public.form_submissions 
  ALTER COLUMN reference_id SET DEFAULT ('REF-SYN-' || LPAD(nextval('form_submissions_ref_seq')::text, 6, '0'));
