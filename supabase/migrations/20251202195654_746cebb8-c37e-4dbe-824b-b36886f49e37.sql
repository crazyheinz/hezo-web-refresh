-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-uploads', 'cv-uploads', false);

-- Allow authenticated and anonymous users to upload CVs
CREATE POLICY "Anyone can upload CVs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cv-uploads');

-- Allow service role to read CVs (for edge function)
CREATE POLICY "Service role can read CVs"
ON storage.objects FOR SELECT
USING (bucket_id = 'cv-uploads');

-- Create table for job applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  motivation TEXT NOT NULL,
  cv_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from the edge function with service role)
CREATE POLICY "Service role can manage applications"
ON public.job_applications
FOR ALL
USING (true)
WITH CHECK (true);