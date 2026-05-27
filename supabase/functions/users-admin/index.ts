import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const allowedOrigins = [
  "https://hezo.be",
  "https://www.hezo.be",
  "https://hezo-web-refresh.lovable.app",
  "https://id-preview--a96ce8fe-4af9-40f6-ac0c-9214f80fd048.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  };
}

async function authorizeAdmin(req: Request): Promise<{ ok: true; userId: string } | { ok: false; status: number }> {
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

  return { ok: true, userId: userData.user.id };
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const auth = await authorizeAdmin(req);
  if (!auth.ok) {
    return new Response(
      JSON.stringify({ error: auth.status === 403 ? "Forbidden" : "Unauthorized" }),
      { status: auth.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const action = body.action || (req.method === "GET" ? "list" : null);

    // List all admins
    if (action === "list") {
      const { data: roles, error: rolesErr } = await supabase
        .from("user_roles")
        .select("user_id, created_at")
        .eq("role", "admin");
      if (rolesErr) throw rolesErr;

      const admins: Array<{ user_id: string; email: string | null; created_at: string }> = [];
      for (const r of roles || []) {
        const { data: u } = await supabase.auth.admin.getUserById(r.user_id);
        admins.push({
          user_id: r.user_id,
          email: u?.user?.email || null,
          created_at: r.created_at,
        });
      }
      return new Response(JSON.stringify(admins), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create new admin: invite by email (sends magic link) or create with password
    if (action === "create") {
      const email = String(body.email || "").trim().toLowerCase();
      const password = body.password ? String(body.password) : null;
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({ error: "Ongeldig e-mailadres" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (password && password.length < 12) {
        return new Response(JSON.stringify({ error: "Wachtwoord moet minstens 12 tekens zijn" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find existing user by listing (Supabase doesn't expose getUserByEmail directly)
      let userId: string | null = null;
      const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = list?.users?.find((u) => u.email?.toLowerCase() === email);
      if (existing) {
        userId = existing.id;
      } else {
        const { data: created, error: createErr } = await supabase.auth.admin.createUser({
          email,
          password: password || undefined,
          email_confirm: true,
        });
        if (createErr || !created.user) {
          return new Response(JSON.stringify({ error: createErr?.message || "Kon gebruiker niet aanmaken" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        userId = created.user.id;
      }

      // Assign admin role (idempotent thanks to unique constraint)
      const { error: roleErr } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      if (roleErr && !roleErr.message.includes("duplicate")) {
        return new Response(JSON.stringify({ error: roleErr.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true, user_id: userId }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Remove admin role
    if (action === "remove") {
      const targetUserId = String(body.user_id || "");
      if (!targetUserId) {
        return new Response(JSON.stringify({ error: "user_id is verplicht" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (targetUserId === auth.userId) {
        return new Response(JSON.stringify({ error: "Je kan jezelf niet verwijderen" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", targetUserId)
        .eq("role", "admin");
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("users-admin error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
