import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    console.log("Received contact form:", { name: data.name, email: data.email, phone: data.phone ? "provided" : "not provided" });

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
      headers: { ...corsHeaders, "Content-Type": "application/json" },
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