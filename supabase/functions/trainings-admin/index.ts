import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = [
  'https://hezo.be',
  'https://www.hezo.be',
  'https://hezo-web-refresh.lovable.app',
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

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function authorizeAdmin(req: Request): Promise<{ ok: true } | { ok: false; status: number }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return { ok: false, status: 401 };
  const token = authHeader.replace("Bearer ", "");

  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser(token);
  if (userErr || !userData.user) return { ok: false, status: 401 };

  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: roleData, error: roleErr } = await adminClient.rpc("has_role", {
    _user_id: userData.user.id,
    _role: "admin",
  });
  if (roleErr || !roleData) return { ok: false, status: 403 };

  return { ok: true };
}

interface TrainingPayload {
  id?: string;
  titel?: string;
  datum?: string;
  tijd?: string;
  locatie?: string | null;
  max_deelnemers?: number;
  beschrijving?: string;
  lesgever?: string;
  type?: 'webinar' | 'fysiek';
  opname_beschikbaar?: boolean;
  is_active?: boolean;
}

function validateCreatePayload(p: TrainingPayload): string | null {
  if (!p.titel || typeof p.titel !== 'string' || p.titel.length > 500) return 'titel is required';
  if (!p.datum || !/^\d{4}-\d{2}-\d{2}$/.test(p.datum)) return 'datum (YYYY-MM-DD) is required';
  if (!p.tijd || typeof p.tijd !== 'string' || p.tijd.length > 200) return 'tijd is required';
  if (!p.beschrijving || typeof p.beschrijving !== 'string') return 'beschrijving is required';
  if (!p.lesgever || typeof p.lesgever !== 'string') return 'lesgever is required';
  if (p.type !== 'webinar' && p.type !== 'fysiek') return 'type must be webinar or fysiek';
  if (typeof p.max_deelnemers !== 'number' || p.max_deelnemers < 1 || p.max_deelnemers > 10000) return 'max_deelnemers invalid';
  return null;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const auth = await authorizeAdmin(req);
  if (!auth.ok) {
    return new Response(
      JSON.stringify({ error: auth.status === 403 ? "Forbidden" : "Unauthorized" }),
      { status: auth.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { action, payload } = body as {
      action?: string;
      payload?: TrainingPayload;
    };

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (action === "list_all") {
      const { data, error } = await supabase
        .from('trainings')
        .select('*')
        .order('datum', { ascending: true });
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "create") {
      if (!payload) {
        return new Response(JSON.stringify({ error: "payload required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const err = validateCreatePayload(payload);
      if (err) {
        return new Response(JSON.stringify({ error: err }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const { data, error } = await supabase
        .from('trainings')
        .insert({
          titel: payload.titel!,
          datum: payload.datum!,
          tijd: payload.tijd!,
          locatie: payload.locatie || null,
          max_deelnemers: payload.max_deelnemers!,
          beschrijving: payload.beschrijving!,
          lesgever: payload.lesgever!,
          type: payload.type!,
          opname_beschikbaar: !!payload.opname_beschikbaar,
          is_active: payload.is_active !== false,
        })
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "update") {
      if (!payload?.id) {
        return new Response(JSON.stringify({ error: "id required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const { id, ...rest } = payload;
      const update: Record<string, unknown> = {};
      const allowed = ['titel', 'datum', 'tijd', 'locatie', 'max_deelnemers', 'beschrijving', 'lesgever', 'type', 'opname_beschikbaar', 'is_active'];
      for (const key of allowed) {
        if (key in rest) update[key] = (rest as Record<string, unknown>)[key];
      }
      if (update.type && update.type !== 'webinar' && update.type !== 'fysiek') {
        return new Response(JSON.stringify({ error: "type invalid" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const { data, error } = await supabase
        .from('trainings')
        .update(update)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "toggle_active") {
      if (!payload?.id) {
        return new Response(JSON.stringify({ error: "id required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const { data, error } = await supabase
        .from('trainings')
        .update({ is_active: !!payload.is_active })
        .eq('id', payload.id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (action === "delete") {
      if (!payload?.id) {
        return new Response(JSON.stringify({ error: "id required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const { error } = await supabase
        .from('trainings')
        .delete()
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error in trainings-admin:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
