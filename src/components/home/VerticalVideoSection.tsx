import { useState } from "react";

const VIDEO_ID = "Q-gvY42NchU";
const VIDEO_TITLE = "Hezo - meer patiënten, minder administratie";
const VIDEO_DESCRIPTION =
  "Ontdek hoe Hezo zelfstandige thuisverpleegkundigen ondersteunt: meer patiënten, minder administratie.";

const VerticalVideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="video-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2
              id="video-heading"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Meer patiënten, minder administratie
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              In 30 seconden ontdek je hoe Hezo zelfstandige thuisverpleegkundigen
              ontzorgt. Wij regelen je facturatie, administratie en patiëntenstroom,
              zodat jij je volledig kan focussen op zorg.
            </p>
            <a
              href="/wat-we-doen/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Ontdek wat we doen
            </a>
          </div>

          {/* Vertical video frame */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black"
            >
              {playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={VIDEO_TITLE}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 w-full h-full"
                  aria-label={`Speel video af: ${VIDEO_TITLE}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                    alt={VIDEO_TITLE}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-lg group-hover:scale-110 transition-transform">
                      <svg
                        className="w-7 h-7 text-primary ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: VIDEO_TITLE,
            description: VIDEO_DESCRIPTION,
            thumbnailUrl: [`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`],
            uploadDate: "2026-06-11",
            contentUrl: `https://www.youtube.com/shorts/${VIDEO_ID}`,
            embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
            publisher: {
              "@type": "Organization",
              name: "Hezo",
              logo: {
                "@type": "ImageObject",
                url: "https://www.hezo.be/favicon.png",
              },
            },
          }),
        }}
      />
    </section>
  );
};

export default VerticalVideoSection;
