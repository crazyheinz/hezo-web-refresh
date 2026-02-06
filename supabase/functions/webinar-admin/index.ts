import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const ADMIN_PASSWORD = Deno.env.get("WEBINAR_ADMIN_PASSWORD");
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

async function sendInviteEmail(
  email: string,
  name: string | null,
  webinarTitle: string,
  magicLink: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const greeting = name ? `Beste ${name}` : 'Beste';
    
    const { error } = await resend.emails.send({
      from: 'Hezo <info@hezo.be>',
      to: [email],
      subject: `Uitnodiging: ${webinarTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a365d; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Hezo</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1a365d; font-size: 22px;">${greeting},</h2>
              
              <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Je bent uitgenodigd om de volgende webinar te bekijken:
              </p>
              
              <div style="background-color: #f7fafc; border-left: 4px solid #1a365d; padding: 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                <h3 style="margin: 0; color: #1a365d; font-size: 18px;">${webinarTitle}</h3>
              </div>
              
              <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Klik op onderstaande knop om de webinar te bekijken. Deze link is persoonlijk en kan niet gedeeld worden.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <a href="${magicLink}" style="display: inline-block; background-color: #1a365d; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      Bekijk Webinar
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                Werkt de knop niet? Kopieer en plak deze link in je browser:<br>
                <a href="${magicLink}" style="color: #1a365d; word-break: break-all;">${magicLink}</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f7fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #718096; font-size: 14px;">
                © ${new Date().getFullYear()} Hezo. Alle rechten voorbehouden.
              </p>
              <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">
                Deze email werd verstuurd omdat je bent uitgenodigd voor een webinar.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email sending exception:', err);
    return { success: false, error: String(err) };
  }
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
      const { webinar_id, email, name, expires_at, recipients, send_email } = body;

      if (!webinar_id) {
        return new Response(
          JSON.stringify({ error: "webinar_id is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get webinar title for emails
      const { data: webinar } = await supabase
        .from('webinars')
        .select('title')
        .eq('id', webinar_id)
        .single();

      const webinarTitle = webinar?.title || 'Webinar';
      const baseUrl = origin || 'https://hezo.be';

      // Bulk create from recipients array (CSV/textarea import)
      if (recipients && Array.isArray(recipients) && recipients.length > 0) {
        const invites = recipients.map((r: { name?: string; email?: string }) => ({
          webinar_id,
          name: r.name || null,
          email: r.email || null,
          expires_at: expires_at || null
        }));

        const { data, error } = await supabase
          .from('webinar_invites')
          .insert(invites)
          .select();

        if (error) throw error;

        // Send emails for recipients with email addresses if send_email is true
        const emailResults: { email: string; success: boolean; error?: string }[] = [];
        if (send_email && data) {
          for (const invite of data) {
            if (invite.email) {
              const magicLink = `${baseUrl}/webinar/${invite.token}`;
              const result = await sendInviteEmail(invite.email, invite.name, webinarTitle, magicLink);
              emailResults.push({ email: invite.email, ...result });
            }
          }
        }

        return new Response(JSON.stringify({ 
          invites: data, 
          emails_sent: emailResults.filter(r => r.success).length,
          email_errors: emailResults.filter(r => !r.success)
        }), {
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

      // Send email if email is provided and send_email is true
      let emailSent = false;
      let emailError: string | undefined;
      if (send_email && email && data) {
        const magicLink = `${baseUrl}/webinar/${data.token}`;
        const result = await sendInviteEmail(email, name, webinarTitle, magicLink);
        emailSent = result.success;
        emailError = result.error;
      }

      return new Response(JSON.stringify({ 
        ...data, 
        email_sent: emailSent,
        email_error: emailError 
      }), {
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
