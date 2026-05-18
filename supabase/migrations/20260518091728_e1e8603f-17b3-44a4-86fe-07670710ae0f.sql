CREATE TABLE public.lead_magnets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  magnet_type TEXT NOT NULL DEFAULT 'startersgids',
  region TEXT,
  is_active_freelancer BOOLEAN NOT NULL DEFAULT false,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_magnets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block public access lead_magnets"
  ON public.lead_magnets
  FOR ALL
  TO public
  USING (false)
  WITH CHECK (false);

CREATE INDEX idx_lead_magnets_created_at ON public.lead_magnets(created_at DESC);
CREATE INDEX idx_lead_magnets_email ON public.lead_magnets(email);