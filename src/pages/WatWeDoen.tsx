import SEO from "@/components/SEO";
import HeroSection from "@/components/diensten/HeroSection";
import NavBlock from "@/components/diensten/NavBlock";
import AdminSection from "@/components/diensten/AdminSection";
import InstroomSection from "@/components/diensten/InstroomSection";
import BegeleidingSection from "@/components/diensten/BegeleidingSection";
import OpleidingSection from "@/components/diensten/OpleidingSection";
import SamenBlock from "@/components/diensten/SamenBlock";

const WatWeDoen = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Onze Diensten | Hezo - Ondersteuning Thuisverpleging"
        description="Ontdek hoe Hezo zelfstandige thuisverpleegkundigen ondersteunt met patiënteninstroom, administratie, begeleiding en opleidingen."
        path="/wat-we-doen"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "name": "Onze Diensten - Hezo",
              "description": "Hezo ondersteunt zelfstandige thuisverpleegkundigen met patiënteninstroom, administratie, begeleiding en opleidingen.",
              "url": "https://www.hezo.be/wat-we-doen/"
            },
            {
              "@type": "Service",
              "@id": "https://www.hezo.be/#service",
              "name": "Ondersteuning voor Zelfstandige Thuisverpleegkundigen",
              "description": "Hezo biedt complete ondersteuning voor zelfstandige thuisverpleegkundigen: patiënteninstroom via het Helan-netwerk, administratieve ondersteuning, facturatie, begeleiding en opleidingen.",
              "provider": {
                "@type": "Organization",
                "name": "Hezo",
                "url": "https://www.hezo.be"
              },
              "serviceType": "Ondersteuning thuisverpleging",
              "areaServed": {
                "@type": "Country",
                "name": "België"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Diensten voor thuisverpleegkundigen",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Administratie & ondersteuning",
                      "description": "Betrouwbare administratieve ondersteuning inclusief tarificatie, facturatie naar mutualiteiten en remgeldopvolging."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Instroom van patiënten",
                      "description": "Regelmatige instroom van nieuwe patiënten via het Helan-netwerk voor zelfstandige thuisverpleegkundigen."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Persoonlijke begeleiding",
                      "description": "Persoonlijke begeleiding voor startende en ervaren zelfstandige verpleegkundigen."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Opleiding en groei",
                      "description": "Praktijkgerichte opleidingen en bijscholing voor thuisverpleegkundigen."
                    }
                  }
                ]
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Wat is Hezo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hezo is een Belgisch netwerk dat zelfstandige thuisverpleegkundigen ondersteunt met administratie, facturatie, patiëntenstroom en begeleiding. Het netwerk is verbonden aan Helan, een groot ziekenfonds en welzijnsnetwerk."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hoe zorgt Hezo voor patiënteninstroom?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bij Hezo komt de zorgvraag rechtstreeks vanuit Welzijnsgroep Helan, die mensen begeleidt in hun zoektocht naar thuisverpleging. Vanuit dat netwerk worden patiënten in contact gebracht met zelfstandige verpleegkundigen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welke administratieve ondersteuning biedt Hezo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hezo zorgt voor tarificatie, facturatie naar mutualiteiten, opvolging van weigeringen en correcties, remgeldverwerking en tijdige uitbetalingen aan verpleegkundigen."
                  }
                }
              ]
            }
          ]
        }}
      />
      <HeroSection />
      <NavBlock />
      <AdminSection />
      <InstroomSection />
      <BegeleidingSection />
      <OpleidingSection />
      <SamenBlock />
    </div>
  );
};

export default WatWeDoen;
