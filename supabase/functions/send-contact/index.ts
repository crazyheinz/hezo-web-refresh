import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactRequest = await req.json();

    console.log("Received contact form:", { name, email, phone: phone || "not provided" });

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hezo Website <noreply@hezo.be>",
        to: ["info@hezo.be"],
        reply_to: email,
        subject: `Nieuw contactbericht van ${name}`,
        html: `
          <h1>Nieuw contactbericht</h1>
          <hr />
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
          <h3>Bericht:</h3>
          <p>${message.replace(/\n/g, "<br />")}</p>
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
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
