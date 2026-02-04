-- Create webinars table
CREATE TABLE public.webinars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create webinar invites table for magic links
CREATE TABLE public.webinar_invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webinar_id UUID NOT NULL REFERENCES public.webinars(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  email TEXT,
  name TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_invites ENABLE ROW LEVEL SECURITY;

-- Webinars: Only allow read access (admin will use service role)
CREATE POLICY "Webinars are viewable by everyone" 
ON public.webinars 
FOR SELECT 
USING (is_active = true);

-- Webinar invites: Allow read access for token validation
CREATE POLICY "Invites are viewable by token" 
ON public.webinar_invites 
FOR SELECT 
USING (true);

-- Allow updating view stats
CREATE POLICY "Invites view stats can be updated" 
ON public.webinar_invites 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_webinar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_webinars_updated_at
BEFORE UPDATE ON public.webinars
FOR EACH ROW
EXECUTE FUNCTION public.update_webinar_updated_at();

-- Create index for faster token lookups
CREATE INDEX idx_webinar_invites_token ON public.webinar_invites(token);