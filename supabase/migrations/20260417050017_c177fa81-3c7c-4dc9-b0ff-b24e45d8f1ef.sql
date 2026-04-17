CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'opleiding')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  opleiding_naam TEXT,
  opleiding_datum TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block public access"
ON public.form_submissions
FOR ALL
TO public
USING (false)
WITH CHECK (false);

CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_type ON public.form_submissions(type);

-- Cleanup-trigger: verwijdert oude rijen bij elke insert (max 1x per uur)
CREATE OR REPLACE FUNCTION public.cleanup_old_form_submissions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Alleen cleanup als laatste cleanup > 1 uur geleden was
  IF NOT EXISTS (
    SELECT 1 FROM public.form_submissions
    WHERE created_at > now() - INTERVAL '1 hour'
      AND id != NEW.id
    LIMIT 1
  ) THEN
    DELETE FROM public.form_submissions
    WHERE created_at < now() - INTERVAL '90 days';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_cleanup_old_form_submissions
AFTER INSERT ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.cleanup_old_form_submissions();