import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RETENTION_DAYS = 60;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
    const cutoffISO = cutoffDate.toISOString();

    console.log(`Cleaning up applications older than ${RETENTION_DAYS} days (before ${cutoffISO})`);

    // Fetch old applications to get CV URLs before deleting
    const { data: oldApplications, error: fetchError } = await supabase
      .from('job_applications')
      .select('id, cv_url, name, created_at')
      .lt('created_at', cutoffISO);

    if (fetchError) {
      console.error("Error fetching old applications:", fetchError);
      throw fetchError;
    }

    if (!oldApplications || oldApplications.length === 0) {
      console.log("No applications to clean up");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "No applications to clean up",
          deleted: 0 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${oldApplications.length} applications to delete`);

    // Extract CV file paths from URLs and delete from storage
    const cvFilesToDelete: string[] = [];
    for (const app of oldApplications) {
      if (app.cv_url) {
        // Extract filename from signed URL
        // URL format: .../cv-uploads/filename?token=...
        const urlMatch = app.cv_url.match(/cv-uploads\/([^?]+)/);
        if (urlMatch && urlMatch[1]) {
          cvFilesToDelete.push(urlMatch[1]);
        }
      }
    }

    // Delete CVs from storage
    if (cvFilesToDelete.length > 0) {
      console.log(`Deleting ${cvFilesToDelete.length} CV files from storage`);
      const { error: storageError } = await supabase.storage
        .from('cv-uploads')
        .remove(cvFilesToDelete);
      
      if (storageError) {
        console.error("Error deleting CV files:", storageError);
        // Continue anyway - database cleanup is more important
      } else {
        console.log("CV files deleted successfully");
      }
    }

    // Delete applications from database
    const applicationIds = oldApplications.map(app => app.id);
    const { error: deleteError } = await supabase
      .from('job_applications')
      .delete()
      .in('id', applicationIds);

    if (deleteError) {
      console.error("Error deleting applications:", deleteError);
      throw deleteError;
    }

    console.log(`Successfully deleted ${oldApplications.length} applications`);

    // Log details for audit
    for (const app of oldApplications) {
      console.log(`Deleted: ${app.name} (created: ${app.created_at})`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Deleted ${oldApplications.length} applications older than ${RETENTION_DAYS} days`,
        deleted: oldApplications.length,
        cvFilesDeleted: cvFilesToDelete.length
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Cleanup error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
