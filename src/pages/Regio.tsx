import { useParams, Navigate, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle2, Phone, Mail } from "lucide-react";
import { regios } from "@/data/regios";

const Regio = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? regios[slug] : undefined;

  if (!data) return <Navigate to="/" replace />;

  const url = `https://www.hezo.be/thuisverpleging/${data.slug}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${url}#business`,
        name: `Hezo Thuisverpleging ${data.naam}`,
        description: data.metaDescription,
        url,
        telephone: "+32 9 265 17 20",
        email: "info@hezo.be",
        priceRange: "RIZIV",
        areaServed: {
          "@type": data.type === "stad" ? "City" : "AdministrativeArea",
          name: data.naam,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: data.naam,
          addressRegion: "Vlaanderen",
          addressCountry: "BE",
          postalCode: data.postalArea,
        },
        medicalSpecialty: "Nursing",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.hezo.be/" },
          { "@type": "ListItem", position: 2, name: "Thuisverpleging", item: "https://www.hezo.be/wat-we-doen/" },
          { "@type": "ListItem", position: 3, name: data.naam, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={`/thuisverpleging/${data.slug}/`}
        structuredData={structuredData}
      />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="mb-12">
              <div className="flex items-center gap-2 text-secondary text-sm font-medium mb-3">
                <MapPin className="h-4 w-4" />
                Regio {data.naam}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Thuisverpleging in {data.naam}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.intro}
              </p>
            </div>

            {/* Voor verpleegkundigen */}
            <Card className="border-secondary/20 bg-muted/40 mb-12">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  Voor verpleegkundigen in {data.naam}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {data.voorVerpleegkundigen}
                </p>
                <div className="space-y-2 mb-6">
                  {["Volledig zelfstandig statuut", "Administratieve ontzorging", "Vaste patiënteninstroom", "Gratis opleidingen"].map(
                    (item) => (
                      <div key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ),
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="default">
                    <Link to="/zo-sluit-je-aan/">Zo sluit je aan</Link>
                  </Button>
                  {data.vacatureLink && (
                    <Button asChild variant="outline">
                      <Link to={data.vacatureLink.href}>Bekijk vacature</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verdiepende links */}
            <div className="mb-12 p-8 bg-muted rounded-2xl">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Meer weten over zelfstandig werken in de thuisverpleging?
              </h2>
              <p className="text-muted-foreground mb-6">
                Of je nu net afgestudeerd bent of al jaren als verpleegkundige werkt: deze artikels helpen je
                een onderbouwde keuze maken.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  to="/blog/zelfstandig-thuisverpleegkundige-worden/"
                  className="block p-4 bg-background rounded-lg hover:bg-secondary/5 transition-colors"
                >
                  <div className="font-medium text-primary mb-1">Stappenplan zelfstandig worden</div>
                  <div className="text-sm text-muted-foreground">RIZIV, sociaal statuut, eerste maanden</div>
                </Link>
                <Link
                  to="/inkomen-simulator/"
                  className="block p-4 bg-background rounded-lg hover:bg-secondary/5 transition-colors"
                >
                  <div className="font-medium text-primary mb-1">Bereken je inkomen</div>
                  <div className="text-sm text-muted-foreground">
                    Indicatieve simulator op basis van je situatie
                  </div>
                </Link>
                <Link
                  to="/blog/administratie-thuisverpleging/"
                  className="block p-4 bg-background rounded-lg hover:bg-secondary/5 transition-colors"
                >
                  <div className="font-medium text-primary mb-1">Administratie efficiënt regelen</div>
                  <div className="text-sm text-muted-foreground">Facturatie, registratie, tarificatie</div>
                </Link>
                <Link
                  to="/blog/patienten-thuisverpleegkundige/"
                  className="block p-4 bg-background rounded-lg hover:bg-secondary/5 transition-colors"
                >
                  <div className="font-medium text-primary mb-1">Patiënten vinden</div>
                  <div className="text-sm text-muted-foreground">Hoe bouw je een stabiele patiënteninstroom</div>
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-3">
                Contact Hezo {data.naam}
              </h2>
              <p className="opacity-90 mb-6">
                Vrijblijvend kennismaken kan altijd. Wij nemen binnen 2 werkdagen contact met je op.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+3292651720"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +32 9 265 17 20
                </a>
                <a
                  href="mailto:info@hezo.be"
                  className="inline-flex items-center gap-2 bg-background text-primary px-5 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@hezo.be
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regio;
