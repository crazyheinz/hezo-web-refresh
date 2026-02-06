import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = [
  'https://hezo.be',
  'https://www.hezo.be',
  'https://id-preview--a96ce8fe-4af9-40f6-ac0c-9214f80fd048.lovable.app',
  'http://localhost:8080',
  'http://localhost:5173',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string' || token.length !== 64) {
      return new Response(
        JSON.stringify({ error: "Invalid token format", code: "INVALID_TOKEN" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch invite by token using service role (bypasses RLS)
    const { data: invite, error: inviteError } = await supabase
      .from('webinar_invites')
      .select('id, webinar_id, expires_at, view_count, viewed_at')
      .eq('token', token)
      .maybeSingle();

    if (inviteError) {
      console.error("Error fetching invite:", inviteError);
      return new Response(
        JSON.stringify({ error: "Database error", code: "DB_ERROR" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!invite) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired link", code: "NOT_FOUND" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if expired
    if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "This link has expired", code: "EXPIRED" }),
        { status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the webinar
    const { data: webinar, error: webinarError } = await supabase
      .from('webinars')
      .select('id, title, description, video_url, thumbnail_url')
      .eq('id', invite.webinar_id)
      .eq('is_active', true)
      .maybeSingle();

    if (webinarError) {
      console.error("Error fetching webinar:", webinarError);
      return new Response(
        JSON.stringify({ error: "Database error", code: "DB_ERROR" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!webinar) {
      return new Response(
        JSON.stringify({ error: "Webinar not available", code: "WEBINAR_UNAVAILABLE" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update view stats (first view sets viewed_at, always increment count)
    const { error: updateError } = await supabase
      .from('webinar_invites')
      .update({
        viewed_at: invite.viewed_at || new Date().toISOString(),
        view_count: (invite.view_count || 0) + 1,
      })
      .eq('id', invite.id);

    if (updateError) {
      // Log but don't fail the request
      console.error("Error updating view stats:", updateError);
    }

    // Return webinar data (never expose the token or internal IDs to prevent enumeration)
    return new Response(
      JSON.stringify({
        webinar: {
          title: webinar.title,
          description: webinar.description,
          video_url: webinar.video_url,
          thumbnail_url: webinar.thumbnail_url,
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in webinar-view:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", code: "INTERNAL_ERROR" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
