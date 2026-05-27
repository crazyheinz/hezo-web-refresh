DROP POLICY IF EXISTS "Active webinars are viewable by everyone" ON public.webinars;
REVOKE SELECT ON public.webinars FROM anon;
REVOKE SELECT ON public.webinars FROM authenticated;