-- Remove overly permissive DELETE policy
-- The cleanup edge function uses service_role which bypasses RLS anyway
DROP POLICY IF EXISTS "Service role can delete applications" ON public.job_applications;