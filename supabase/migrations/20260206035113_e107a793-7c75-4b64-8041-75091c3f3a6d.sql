-- Enable required extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Add DELETE policy for service role on job_applications
-- This allows the cleanup edge function to delete old records
CREATE POLICY "Service role can delete applications"
ON public.job_applications
FOR DELETE
USING (true);

-- Schedule the cleanup job to run daily at 3:00 AM
SELECT cron.schedule(
  'cleanup-old-applications',
  '0 3 * * *',
  $$
  SELECT
    net.http_post(
      url := 'https://kbntzeqmbigjycnatlhz.supabase.co/functions/v1/cleanup-applications',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibnR6ZXFtYmlnanljbmF0bGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTk1MTcsImV4cCI6MjA3ODUzNTUxN30.63XBVxtTo5WKsl0kuSQmWZbAAs0OhgjaPxrN0tj6bLo"}'::jsonb,
      body := '{}'::jsonb
    ) AS request_id;
  $$
);