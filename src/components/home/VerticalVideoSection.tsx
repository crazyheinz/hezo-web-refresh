import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = [
  {
    id: "Q-gvY42NchU",
    title: "Hezo - meer patiënten, minder administratie",
    description:
      "Ontdek hoe Hezo zelfstandige thuisverpleegkundigen ondersteunt: meer patiënten, minder administratie.",
  },
  {
    id: "DUpwaM4uVqM",
    title: "Hezo - volledige autonomie voor thuisverpleegkundigen",
    description:
      "Een thuisverpleegkundige deelt haar ervaring over volledige autonomie binnen het Hezo-netwerk.",
  },
  {
    id: "PSmNrb9D-xk",
    title: "Hezo - minder administratie, meer zorg",
    description:
      "Een thuisverpleegkundige vertelt hoe Hezo haar helpt om minder tijd te besteden aan administratie.",
  },
];

const VideoSlide = ({
  video,
}: {
  video: (typeof VIDEOS)[number];
}) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-[320px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
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
          aria-label={`Speel video af: ${video.title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
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
  );
};

const VerticalVideoSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index),
    [api],
  );

  return (
    <section className="py-12 lg:py-16 bg-white" aria-labelledby="video-heading">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2
              id="video-heading"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Meer patiënten. Minder administratie. Volledige autonomie.
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Drie korte verhalen van thuisverpleegkundigen uit het Hezo-netwerk
              over wat het concreet betekent: minder administratie, volledige
              autonomie en meer patiënten.
            </p>
            <a
              href="/wat-we-doen/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Ontdek wat we doen
            </a>
          </div>

          {/* Carousel */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full max-w-[320px]"
            >
              <CarouselContent>
                {VIDEOS.map((video) => (
                  <CarouselItem key={video.id}>
                    <VideoSlide video={video} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Navigation arrows */}
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow hover:bg-white transition-colors"
                aria-label="Vorige video"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow hover:bg-white transition-colors"
                aria-label="Volgende video"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </Carousel>
            {/* Dots */}
            {count > 0 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === current
                        ? "bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Ga naar video ${index + 1}`}
                    aria-current={index === current ? "true" : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": VIDEOS.map((video) => ({
              "@type": "VideoObject",
              name: video.title,
              description: video.description,
              thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`],
              uploadDate: "2026-06-11",
              contentUrl: `https://www.youtube.com/shorts/${video.id}`,
              embedUrl: `https://www.youtube.com/embed/${video.id}`,
              publisher: {
                "@type": "Organization",
                name: "Hezo",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.hezo.be/favicon.png",
                },
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default VerticalVideoSection;
