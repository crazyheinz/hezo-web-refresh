import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { activeVacatures } from "@/data/vacatures";

const Vacatures = () => {
  const jobs = activeVacatures;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Vacatures bij Hezo",
        "description":
          "Bekijk openstaande vacatures bij Hezo. Werk als praktijkcoach, zelfstandig verantwoordelijke verpleegkundige in de thuisverpleging.",
        "url": "https://www.hezo.be/vacatures/",
      },
      ...jobs.map((job) => ({
        "@type": "JobPosting",
        "@id": `https://www.hezo.be/vacatures/${job.id}/`,
        "identifier": { "@type": "PropertyValue", "name": "Hezo", "value": job.id },
        "title": job.title,
        "description": `<p>${job.description}</p>`,
        "datePosted": job.datePosted,
        "validThrough": job.validThrough,
        "employmentType": ["CONTRACTOR", "FULL_TIME", "PART_TIME"],
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Hezo",
          "sameAs": "https://www.hezo.be",
          "logo": "https://www.hezo.be/favicon.png",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.locality,
            "addressRegion": "Vlaanderen",
            "addressCountry": "BE",
          },
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": job.baseSalary.min,
            "maxValue": job.baseSalary.max,
            "unitText": job.baseSalary.unit,
          },
        },
        "directApply": true,
        "url": `https://www.hezo.be/vacatures/${job.id}/`,
        "applicantLocationRequirements": { "@type": "Country", "name": "BE" },
      })),
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Welke vacatures zijn er bij Hezo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hezo zoekt regelmatig nieuwe mensen: praktijkcoaches en zelfstandig verantwoordelijke verpleegkundigen met een hart voor zorg. Bekijk de actuele vacatures op hezo.be/vacatures.",
            },
          },
          {
            "@type": "Question",
            "name": "Wat doet een verantwoordelijke verpleegkundige bij Hezo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Als zelfstandig verantwoordelijke verpleegkundige bouw je aan een sterk lokaal netwerk van verpleegkundigen en zorgpartners. Je combineert organisatie en inhoudelijke zorgexpertise, ondersteunt zelfstandige thuisverpleegkundigen en bewaakt de kwaliteit van zorg.",
            },
          },
          {
            "@type": "Question",
            "name": "Wat doet een praktijkcoach bij Hezo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Als praktijkcoach begeleid en inspireer je onze praktijkcoördinatoren en startende zelfstandigen. Je bent het vaste aanspreekpunt voor aangesloten verpleegkundigen en helpt hen groeien, persoonlijk, professioneel en strategisch.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title="Vacatures thuisverpleging | Werken bij Hezo"
        description="Wil jij het verschil maken in de thuiszorg? Bekijk onze openstaande vacatures als praktijkcoach of zelfstandig verantwoordelijke verpleegkundige. Solliciteer direct →"
        path="/vacatures/"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Briefcase className="h-16 w-16 text-secondary mx-auto mb-6" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Vacatures</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Maak het verschil in de zorg - dicht bij de mensen, samen met je team
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hezo groeit en zoekt regelmatig nieuwe mensen die ons netwerk willen versterken - van
              coaches en administratieve medewerkers tot ondersteunende profielen met een hart voor
              zorg. Wil je meewerken aan een toekomst waarin zelfstandige verpleegkundigen sterker
              staan? Laat van je horen.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <Link key={job.id} to={`/vacatures/${job.id}/`} className="block group">
                <Card className="border-secondary/20 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        Zelfstandig
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.region}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{job.tagline}</p>
                  </CardHeader>
                  <CardContent>
                    <span className="text-secondary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Bekijk vacature
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Momenteel zijn er geen openstaande vacatures.</p>
              <Link to="/contact/" className="text-secondary hover:underline mt-2 inline-block">
                Neem toch contact met ons op
              </Link>
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Geen geschikte vacature gevonden?</p>
            <Link to="/contact/">
              <Button variant="outline" size="lg">
                Stuur ons een spontane sollicitatie
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacatures;
