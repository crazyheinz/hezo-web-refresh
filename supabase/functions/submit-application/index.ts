import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

// Input validation function
function validateInput(name: string, email: string, motivation: string, position: string): string | null {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }
  if (name.length > 200) {
    return "Name must be less than 200 characters";
  }
  if (!email || !isValidEmail(email)) {
    return "Valid email is required";
  }
  if (email.length > 255) {
    return "Email must be less than 255 characters";
  }
  if (!motivation || motivation.trim().length === 0) {
    return "Motivation is required";
  }
  if (motivation.length > 10000) {
    return "Motivation must be less than 10000 characters";
  }
  if (!position || position.trim().length === 0) {
    return "Position is required";
  }
  if (position.length > 200) {
    return "Position must be less than 200 characters";
  }
  return null;
}

// File validation function
function validateFile(file: File | null): string | null {
  if (!file) return null; // File is optional
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];
  
  if (file.size > maxSize) {
    return "File must be less than 10MB";
  }
  if (!allowedTypes.includes(file.type)) {
    return "Only PDF and Word documents are allowed";
  }
  return null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim().toLowerCase();
    const phone = (formData.get("phone") as string || "").trim();
    const motivation = (formData.get("motivation") as string || "").trim();
    const position = (formData.get("position") as string || "").trim();
    const cvFile = formData.get("cv") as File | null;

    console.log("Received application:", { name, email, position, hasCV: !!cvFile });

    // Server-side input validation
    const validationError = validateInput(name, email, motivation, position);
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

    // Validate phone if provided
    if (phone && phone.length > 50) {
      return new Response(
        JSON.stringify({ error: "Phone number must be less than 50 characters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // File validation
    const fileError = validateFile(cvFile);
    if (fileError) {
      console.error("File validation error:", fileError);
      return new Response(
        JSON.stringify({ error: fileError }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upload CV if provided
    let cvUrl = null;
    let cvAttachment = null;
    
    if (cvFile && cvFile.size > 0) {
      const fileExt = cvFile.name.split(".").pop();
      const sanitizedName = name.replace(/[^a-zA-Z0-9\-]/g, "-");
      const fileName = `${Date.now()}-${sanitizedName}.${fileExt}`;
      
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

    // HTML escape all user input for email templates
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMotivation = escapeHtml(motivation).replace(/\n/g, "<br />");
    const safePosition = escapeHtml(position);

    // Send email notification with attachment to HR
    const emailPayload: Record<string, unknown> = {
      from: "Hezo Sollicitaties <noreply@hezo.be>",
      to: ["info@hezo.be"],
      subject: `Nieuwe sollicitatie: ${safePosition} - ${safeName}`,
      html: `
        <h1>Nieuwe sollicitatie ontvangen</h1>
        <h2>Functie: ${safePosition}</h2>
        <hr />
        <p><strong>Naam:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Telefoon:</strong> ${safePhone || "Niet opgegeven"}</p>
        <h3>Motivatie:</h3>
        <p>${safeMotivation}</p>
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
        subject: `Bevestiging sollicitatie: ${safePosition}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Bedankt voor je sollicitatie, ${safeName}!</h1>
            <p>We hebben je sollicitatie voor de functie <strong>${safePosition}</strong> goed ontvangen.</p>
            <p>Ons team zal je kandidatuur zorgvuldig bekijken. We nemen zo snel mogelijk contact met je op.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <h3 style="color: #1a365d;">Jouw gegevens:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Naam:</strong> ${safeName}</li>
              <li><strong>E-mail:</strong> ${safeEmail}</li>
              ${safePhone ? `<li><strong>Telefoon:</strong> ${safePhone}</li>` : ""}
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
    return new Response(
      JSON.stringify({ error: "Er is een fout opgetreden. Probeer het later opnieuw." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});