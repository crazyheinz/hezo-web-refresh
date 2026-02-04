import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_PASSWORD = Deno.env.get("WEBINAR_ADMIN_PASSWORD");

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
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };
}

function validateAdminPassword(req: Request): boolean {
  const password = req.headers.get('x-admin-password');
  return password === ADMIN_PASSWORD;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate admin password
  if (!validateAdminPassword(req)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();

  try {
    // GET /webinar-admin/webinars - List all webinars
    if (req.method === "GET" && path === "webinars") {
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // POST /webinar-admin/webinars - Create a webinar
    if (req.method === "POST" && path === "webinars") {
      const body = await req.json();
      const { title, description, video_url, thumbnail_url } = body;

      if (!title || !video_url) {
        return new Response(
          JSON.stringify({ error: "Title and video_url are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await supabase
        .from('webinars')
        .insert({ title, description, video_url, thumbnail_url })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // PUT /webinar-admin/webinars/:id - Update a webinar
    if (req.method === "PUT" && path !== "webinars" && path !== "invites") {
      const webinarId = path;
      const body = await req.json();

      const { data, error } = await supabase
        .from('webinars')
        .update(body)
        .eq('id', webinarId)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // DELETE /webinar-admin/webinars/:id - Delete a webinar
    if (req.method === "DELETE" && path !== "webinars" && path !== "invites") {
      const webinarId = path;

      const { error } = await supabase
        .from('webinars')
        .delete()
        .eq('id', webinarId);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // GET /webinar-admin/invites?webinar_id=xxx - List invites for a webinar
    if (req.method === "GET" && path === "invites") {
      const webinarId = url.searchParams.get('webinar_id');
      
      let query = supabase.from('webinar_invites').select('*, webinars(title)');
      if (webinarId) {
        query = query.eq('webinar_id', webinarId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // POST /webinar-admin/invites - Create invite(s)
    if (req.method === "POST" && path === "invites") {
      const body = await req.json();
      const { webinar_id, email, name, expires_at, count } = body;

      if (!webinar_id) {
        return new Response(
          JSON.stringify({ error: "webinar_id is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Create multiple anonymous invites if count is provided
      if (count && count > 1) {
        const invites = Array.from({ length: count }, () => ({
          webinar_id,
          expires_at: expires_at || null
        }));

        const { data, error } = await supabase
          .from('webinar_invites')
          .insert(invites)
          .select();

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Create single invite
      const { data, error } = await supabase
        .from('webinar_invites')
        .insert({ webinar_id, email, name, expires_at })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // DELETE /webinar-admin/invites/:id - Delete an invite
    if (req.method === "DELETE" && url.pathname.includes('/invites/')) {
      const inviteId = url.pathname.split('/').pop();

      const { error } = await supabase
        .from('webinar_invites')
        .delete()
        .eq('id', inviteId);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in webinar-admin:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
