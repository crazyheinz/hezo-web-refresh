import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

interface WebinarData {
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
}

const WebinarView = () => {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [webinar, setWebinar] = useState<WebinarData | null>(null);

  useEffect(() => {
    const validateAndLoad = async () => {
      if (!token) {
        setError("Geen geldige link");
        setIsLoading(false);
        return;
      }

      try {
        // Use edge function for secure token validation
        const { data, error: fnError } = await supabase.functions.invoke('webinar-view', {
          body: { token }
        });

        if (fnError) {
          console.error("Edge function error:", fnError);
          setError("Er is een fout opgetreden");
          setIsLoading(false);
          return;
        }

        if (data?.error) {
          // Map error codes to user-friendly messages
          const errorMessages: Record<string, string> = {
            INVALID_TOKEN: "Ongeldige link",
            NOT_FOUND: "Deze link is ongeldig of verlopen",
            EXPIRED: "Deze link is verlopen",
            WEBINAR_UNAVAILABLE: "Deze webinar is niet beschikbaar",
          };
          setError(errorMessages[data.code] || "Er is een fout opgetreden");
          setIsLoading(false);
          return;
        }

        if (data?.webinar) {
          setWebinar(data.webinar);
        } else {
          setError("Er is een fout opgetreden");
        }
      } catch (err) {
        console.error("Error loading webinar:", err);
        setError("Er is een fout opgetreden");
      }

      setIsLoading(false);
    };

    validateAndLoad();
  }, [token]);

  // Convert video URL to embed URL
  const getEmbedUrl = (url: string): string => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&rel=0`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0`;
    }

    // If it's already an embed URL or unknown format, return as-is
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Webinar laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-xl font-semibold mb-2">Toegang geweigerd</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!webinar) return null;

  return (
    <>
      <SEO 
        title={`${webinar.title} | Hezo Webinar`}
        description={webinar.description || "Bekijk deze exclusieve webinar van Hezo."}
        noIndex={true}
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{webinar.title}</h1>
            {webinar.description && (
              <p className="mt-2 text-lg text-muted-foreground">{webinar.description}</p>
            )}
          </div>

          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={getEmbedUrl(webinar.video_url)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={webinar.title}
            />
          </div>

          {/* Footer note */}
          <p className="mt-6 text-sm text-muted-foreground text-center">
            Deze webinar is exclusief beschikbaar voor uitgenodigde kijkers.
          </p>
        </div>
      </div>
    </>
  );
};

export default WebinarView;
