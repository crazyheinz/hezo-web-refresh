import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return false;
  entry.count++;
  return true;
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SITE_URL = "https://hezo.be";
const PDF_URL = `${SITE_URL}/downloads/startersgids-thuisverpleegkundige.pdf`;

interface LeadRequest {
  name: string;
  email: string;
  region?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Te veel aanvragen. Probeer over een uur opnieuw." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: LeadRequest;
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        region: String(formData.get("region") || ""),
      };
    } else {
      body = await req.json();
    }
  } catch {
    return new Response(JSON.stringify({ error: "Ongeldige aanvraag" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const name = (body.name || "").trim().slice(0, 120);
  const email = (body.email || "").trim().toLowerCase().slice(0, 200);
  const region = (body.region || "").trim().slice(0, 80) || null;

  if (!name || name.length < 2) {
    return new Response(JSON.stringify({ error: "Geef een geldige naam op" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Geef een geldig e-mailadres op" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  let emailSent = false;
  let emailError: string | null = null;

  if (RESEND_API_KEY) {
    try {
      const safeName = escapeHtml(name);

      console.log("Sending startersgids email", { email, region });

      // E-mail naar lead
      const userRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Hezo <info@hezo.be>",
          to: [email],
          reply_to: "info@hezo.be",
          subject: "Jouw startersgids zelfstandig thuisverpleegkundige",
          html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1A2E5C;line-height:1.6;max-width:600px;margin:0 auto;padding:24px;">
<h2 style="color:#1A2E5C;">Bedankt ${safeName}</h2>
<p>Hierbij jouw startersgids "Zelfstandig thuisverpleegkundige worden in België". Een praktisch stappenplan in 7 stappen, met realistische doorlooptijden en kostenramingen.</p>
<p style="margin:28px 0;">
  <a href="${PDF_URL}" style="background:#326AAA;color:#ffffff;padding:14px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">Download de startersgids (PDF)</a>
</p>
<p>Heb je vragen of wil je vrijblijvend kennismaken met Hezo? Antwoord gerust op deze mail of bel ons op +32 9 265 17 20.</p>
<p style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e5e5;color:#6B7280;font-size:13px;">
  Hezo - netwerk van zelfstandige thuisverpleegkundigen<br>
  www.hezo.be
</p>
</body></html>`,
        }),
      });

      if (!userRes.ok) {
        const errorText = await userRes.text();
        emailError = `Resend: ${userRes.status} ${errorText}`.slice(0, 500);
        console.error("Startersgids email failed", emailError);
      } else {
        emailSent = true;
        console.log("Startersgids email sent", { email });
      }

      // Interne notificatie
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Hezo Website <info@hezo.be>",
          to: ["info@hezo.be"],
          subject: `Nieuwe lead startersgids: ${name}`,
          html: `<p><strong>Nieuwe download startersgids</strong></p>
<ul>
  <li>Naam: ${escapeHtml(name)}</li>
  <li>E-mail: ${escapeHtml(email)}</li>
  <li>Regio: ${escapeHtml(region || "niet opgegeven")}</li>
</ul>`,
        }),
      });
    } catch (e) {
      emailError = String(e).slice(0, 500);
      console.error("Startersgids email exception", emailError);
    }
  } else {
    emailError = "RESEND_API_KEY niet geconfigureerd";
    console.error(emailError);
  }

  await supabase.from("lead_magnets").insert({
    name,
    email,
    magnet_type: "startersgids",
    region,
    email_sent: emailSent,
    email_error: emailError,
  });

  return new Response(JSON.stringify({ success: true, pdfUrl: PDF_URL }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
