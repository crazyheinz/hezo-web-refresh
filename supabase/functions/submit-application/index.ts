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

    let cvUrl = null;

    // Upload CV if provided
    if (cvFile && cvFile.size > 0) {
      const fileExt = cvFile.name.split(".").pop();
      const fileName = `${Date.now()}-${name.replace(/\s+/g, "-")}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("cv-uploads")
        .upload(fileName, cvFile, {
          contentType: cvFile.type,
        });

      if (uploadError) {
        console.error("CV upload error:", uploadError);
        throw new Error("Failed to upload CV");
      }

      // Get signed URL for the CV (bucket is private)
      const { data: urlData } = await supabase.storage
        .from("cv-uploads")
        .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days
      
      cvUrl = urlData?.signedUrl;
      console.log("CV uploaded:", fileName);
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

    // Send email notification to HR via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hezo Sollicitaties <onboarding@resend.dev>",
        to: ["monika.conkova@helan.be"],
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
          ${cvUrl ? `<p><strong>CV:</strong> <a href="${cvUrl}">Download CV</a></p>` : "<p><em>Geen CV bijgevoegd</em></p>"}
          <hr />
          <p><small>Deze sollicitatie werd ontvangen via hezo.be</small></p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text();
      console.error("Email error:", emailError);
      // Don't throw - application is saved, email is secondary
    } else {
      console.log("Email notification sent to HR");
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
