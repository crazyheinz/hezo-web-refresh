import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string || "";
    const motivation = formData.get("motivation") as string;
    const position = formData.get("position") as string;
    const cvFile = formData.get("cv") as File | null;

    console.log("Received application:", { name, email, position, hasCV: !!cvFile });

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upload CV if provided
    let cvUrl = null;
    let cvAttachment = null;
    
    if (cvFile && cvFile.size > 0) {
      const fileExt = cvFile.name.split(".").pop();
      const fileName = `${Date.now()}-${name.replace(/\s+/g, "-")}.${fileExt}`;
      
      // Convert file to base64 for email attachment (chunked to avoid stack overflow)
      const arrayBuffer = await cvFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binaryString = "";
      const chunkSize = 8192;
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, i + chunkSize);
        binaryString += String.fromCharCode(...chunk);
      }
      const base64Content = btoa(binaryString);
      cvAttachment = {
        filename: cvFile.name,
        content: base64Content,
      };
      
      // Also save to storage as backup
      const { error: uploadError } = await supabase.storage
        .from("cv-uploads")
        .upload(fileName, cvFile, {
          contentType: cvFile.type,
        });

      if (uploadError) {
        console.error("CV upload error:", uploadError);
        // Continue anyway - email attachment is more important
      } else {
        const { data: urlData } = await supabase.storage
          .from("cv-uploads")
          .createSignedUrl(fileName, 60 * 60 * 24 * 7);
        cvUrl = urlData?.signedUrl;
        console.log("CV uploaded to storage:", fileName);
      }
    }

    // Save application to database
    const { error: dbError } = await supabase
      .from("job_applications")
      .insert({
        name,
        email,
        phone,
        motivation,
        position,
        cv_url: cvUrl,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save application");
    }

    console.log("Application saved to database");

    // Send email notification with attachment to HR
    const emailPayload: Record<string, unknown> = {
      from: "Hezo Sollicitaties <noreply@hezo.be>",
      to: ["info@hezo.be"],
      subject: `Nieuwe sollicitatie: ${position} - ${name}`,
      html: `
        <h1>Nieuwe sollicitatie ontvangen</h1>
        <h2>Functie: ${position}</h2>
        <hr />
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
        <h3>Motivatie:</h3>
        <p>${motivation.replace(/\n/g, "<br />")}</p>
        ${cvAttachment ? "<p><strong>CV:</strong> Zie bijlage</p>" : "<p><em>Geen CV bijgevoegd</em></p>"}
        <hr />
        <p><small>Deze sollicitatie werd ontvangen via hezo.be</small></p>
      `,
    };
    
    if (cvAttachment) {
      emailPayload.attachments = [cvAttachment];
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text();
      console.error("Email error to HR:", emailError);
      // Don't throw - application is saved, email is secondary
    } else {
      console.log("Email notification sent to HR");
    }

    // Send confirmation email to applicant
    const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hezo <info@hezo.be>",
        to: [email],
        subject: `Bevestiging sollicitatie: ${position}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Bedankt voor je sollicitatie, ${name}!</h1>
            <p>We hebben je sollicitatie voor de functie <strong>${position}</strong> goed ontvangen.</p>
            <p>Ons team zal je kandidatuur zorgvuldig bekijken. We nemen zo snel mogelijk contact met je op.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <h3 style="color: #1a365d;">Jouw gegevens:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Naam:</strong> ${name}</li>
              <li><strong>E-mail:</strong> ${email}</li>
              ${phone ? `<li><strong>Telefoon:</strong> ${phone}</li>` : ""}
            </ul>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #718096; font-size: 14px;">
              Met vriendelijke groeten,<br />
              <strong>Het Hezo Team</strong>
            </p>
            <p style="color: #a0aec0; font-size: 12px;">
              Heb je vragen? Neem gerust contact met ons op via <a href="mailto:info@hezo.be" style="color: #3182ce;">info@hezo.be</a>
            </p>
          </div>
        `,
      }),
    });

    if (!confirmationEmailResponse.ok) {
      const confirmError = await confirmationEmailResponse.text();
      console.error("Confirmation email error:", confirmError);
    } else {
      console.log("Confirmation email sent to applicant:", email);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error in submit-application:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
