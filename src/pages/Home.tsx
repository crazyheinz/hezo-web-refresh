import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import USPSection from "@/components/home/USPSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Hezo | Minder administratie, meer zorg"
        description="Zelfstandig thuisverpleegkundige? Hezo regelt je administratie, facturatie en patiënteninstroom. Ontdek wat wij voor jou doen →"
        path="/"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.hezo.be/#organization",
              "name": "Hezo",
              "url": "https://www.hezo.be",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.hezo.be/favicon.png"
              },
              "description": "Hezo is een Belgisch netwerk dat zelfstandige thuisverpleegkundigen ondersteunt met administratie, facturatie, patiëntenstroom en begeleiding.",
              "foundingDate": "2025",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gent",
                "addressCountry": "BE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+32 9 265 17 20",
                "email": "info@hezo.be",
                "contactType": "customer service",
                "availableLanguage": ["nl"]
              },
              "knowsAbout": [
                "Thuisverpleging",
                "Zelfstandige verpleegkundigen",
                "Thuiszorg België",
                "RIZIV-facturatie",
                "Verpleegkundige administratie"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://www.hezo.be/#website",
              "url": "https://www.hezo.be",
              "name": "Hezo",
              "publisher": {
                "@id": "https://www.hezo.be/#organization"
              },
              "inLanguage": "nl-BE"
            },
            {
              "@type": "WebPage",
              "@id": "https://www.hezo.be/#webpage",
              "url": "https://www.hezo.be",
              "name": "Hezo | Ondersteuning voor Zelfstandige Thuisverpleegkundigen",
              "description": "Hezo ondersteunt zelfstandige thuisverpleegkundigen met administratie, facturatie, patiëntenstroom en begeleiding.",
              "isPartOf": {
                "@id": "https://www.hezo.be/#website"
              },
              "about": {
                "@id": "https://www.hezo.be/#organization"
              },
              "inLanguage": "nl-BE"
            },
            {
              "@type": "HealthcareService",
              "name": "Hezo - Ondersteuning Thuisverpleging",
              "description": "Hezo biedt ondersteuning voor zelfstandige thuisverpleegkundigen in België: patiënteninstroom, administratie, facturatie, opleiding en begeleiding.",
              "provider": {
                "@id": "https://www.hezo.be/#organization"
              },
              "serviceType": "Ondersteuning voor zelfstandige thuisverpleegkundigen",
              "areaServed": {
                "@type": "Country",
                "name": "België"
              },
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://www.hezo.be/contact/",
                "servicePhone": "+32 9 265 17 20"
              }
            }
          ]
        }}
      />
      <HeroSection />
      <MissionSection />
      <USPSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
