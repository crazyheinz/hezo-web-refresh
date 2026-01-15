-- Fix 1: Remove the overly permissive RLS policy that triggers Supabase linter warning
-- Service role bypasses RLS by default, so this policy is redundant
DROP POLICY IF EXISTS "Service role can manage applications" ON public.job_applications;

-- Fix 2: Remove the anonymous upload policy that allows bypassing edge function validation
DROP POLICY IF EXISTS "Anyone can upload CVs" ON storage.objects;