/*
  # Fix reference ID trigger function to use REF-SYN format

  1. Changes
    - Update the generate_reference_id() function to use 'REF-SYN-' prefix
    - This trigger function was still using the old 'SR-REQ-' format
    
  2. Note
    - The trigger overrides the column default, so this fix is critical
*/

CREATE OR REPLACE FUNCTION public.generate_reference_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  NEW.reference_id := 'REF-SYN-' || LPAD(nextval('form_submission_ref_seq')::text, 6, '0');
  RETURN NEW;
END;
$function$;
