import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Allowed origins for CORS
const allowedOrigins = [
  'https://hezo.be',
  'https://www.hezo.be',
  'https://id-preview--a96ce8fe-4af9-40f6-ac0c-9214f80fd048.lovable.app',
  'http://localhost:8080',
  'http://localhost:5173',
];

// In-memory rate limiting (resets on cold starts, but provides basic protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per hour per IP

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }
  
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  
  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}

// HTML escape function to prevent XSS in email templates
function escapeHtml(text: string): string {
  if (!text) return "";
  return text.replace(/[&<>"']/g, (char) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeMap[char] || char;
  });
}

// Email validation regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Input validation function
function validateInput(data: ContactRequest): string | null {
  if (!data.name || data.name.trim().length === 0) {
    return "Name is required";
  }
  if (data.name.length > 200) {
    return "Name must be less than 200 characters";
  }
  if (!data.email || !isValidEmail(data.email)) {
    return "Valid email is required";
  }
  if (data.email.length > 255) {
    return "Email must be less than 255 characters";
  }
  if (!data.message || data.message.trim().length === 0) {
    return "Message is required";
  }
  if (data.message.length > 5000) {
    return "Message must be less than 5000 characters";
  }
  if (data.phone && data.phone.length > 50) {
    return "Phone number must be less than 50 characters";
  }
  return null;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = getClientIp(req);
  const { allowed, remaining } = checkRateLimit(clientIp);
  
  if (!allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: "Te veel aanvragen. Probeer het later opnieuw." }),
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": "0",
          "Retry-After": "3600"
        },
      }
    );
  }

  try {
    const rawData = await req.json();
    
    // Trim and sanitize input
    const data: ContactRequest = {
      name: (rawData.name || "").trim(),
      email: (rawData.email || "").trim().toLowerCase(),
      phone: (rawData.phone || "").trim(),
      message: (rawData.message || "").trim(),
    };

    console.log("Received contact form:", { name: data.name, email: data.email, phone: data.phone ? "provided" : "not provided", ip: clientIp });

    // Server-side input validation
    const validationError = validateInput(data);
    if (validationError) {
      console.error("Validation error:", validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // HTML escape all user input for email template
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = escapeHtml(data.phone || "");
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hezo Website <noreply@hezo.be>",
        to: ["info@hezo.be"],
        reply_to: data.email,
        subject: `Nieuw contactbericht van ${safeName}`,
        html: `
          <h1>Nieuw contactbericht</h1>
          <hr />
          <p><strong>Naam:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Telefoon:</strong> ${safePhone || "Niet opgegeven"}</p>
          <h3>Bericht:</h3>
          <p>${safeMessage}</p>
          <hr />
          <p><small>Dit bericht werd verzonden via het contactformulier op hezo.be</small></p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend error:", errorText);
      throw new Error("Failed to send email");
    }

    console.log("Contact email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": remaining.toString()
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact:", error);
    return new Response(
      JSON.stringify({ error: "Er is een fout opgetreden. Probeer het later opnieuw." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
