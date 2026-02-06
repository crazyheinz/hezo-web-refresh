-- Fix security issues: Remove public access to webinar_invites table
-- All token validation and view tracking is now handled by the webinar-view edge function

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Invites are viewable by token" ON public.webinar_invites;

-- Drop the overly permissive UPDATE policy
DROP POLICY IF EXISTS "Invites view stats can be updated" ON public.webinar_invites;

-- Create restrictive policies that deny direct public access
-- The edge function uses service role key to bypass RLS
CREATE POLICY "Deny direct public select on invites"
ON public.webinar_invites
FOR SELECT
USING (false);

CREATE POLICY "Deny direct public update on invites"
ON public.webinar_invites
FOR UPDATE
USING (false);

-- Also fix the webinars SELECT policy to be permissive instead of restrictive
-- Currently it's a restrictive policy which means it acts as a filter
DROP POLICY IF EXISTS "Webinars are viewable by everyone" ON public.webinars;

CREATE POLICY "Active webinars are viewable by everyone"
ON public.webinars
FOR SELECT
USING (is_active = true);