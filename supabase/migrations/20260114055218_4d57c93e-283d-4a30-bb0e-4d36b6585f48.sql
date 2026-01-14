-- Block all public/anonymous SELECT access to job_applications
-- The existing service role policy will continue to work for edge functions
CREATE POLICY "Block public reads"
ON public.job_applications
FOR SELECT
USING (false);