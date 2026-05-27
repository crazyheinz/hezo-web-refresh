DROP POLICY IF EXISTS "Service role can read CVs" ON storage.objects;
CREATE POLICY "Service role reads cvs"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'cv-uploads');