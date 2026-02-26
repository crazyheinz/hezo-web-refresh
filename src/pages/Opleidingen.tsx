import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Clock, Users, Monitor, Building2, Euro } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

const Opleidingen = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO 
        title="Opleidingen | Hezo - Vorming voor Thuisverpleegkundigen"
        description="Groei in je vak met praktijkgerichte opleidingen van Hezo. Sessies over administratie, communicatie en zorgkwaliteit voor zelfstandige verpleegkundigen."
        path="/opleidingen"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              "name": "Starten als zelfstandige thuisverpleegkundige",
              "description": "Opleiding voor verpleegkundigen die zelfstandig willen starten of hun overstap voorbereiden. Leer over RIZIV- en verzekeringsadministratie, software en tools voor facturatie, tarificatie en remgeld, patiëntenwerving en communicatie met artsen.",
              "provider": {
                "@type": "Organization",
                "name": "Hezo",
                "sameAs": "https://www.hezo.be"
              },
              "courseMode": "blended",
              "startDate": "2026-02",
              "educationalLevel": "Professional",
              "teaches": [
                "RIZIV-administratie",
                "Facturatie thuisverpleging",
                "Tarificatie en remgeld",
                "Patiëntenwerving",
                "Communicatie met artsen"
              ],
              "location": {
                "@type": "Place",
                "name": "Gent",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Gent",
                  "addressCountry": "BE"
                }
              },
              "inLanguage": "nl"
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Welke opleidingen biedt Hezo voor thuisverpleegkundigen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hezo biedt praktijkgerichte opleidingen voor zelfstandige thuisverpleegkundigen. De eerste opleiding 'Starten als zelfstandige thuisverpleegkundige' start in februari 2026 en behandelt RIZIV-administratie, facturatie, tarificatie en patiëntenwerving."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wanneer starten de opleidingen van Hezo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "De eerste opleidingen starten in februari 2026. Inschrijven kan vanaf januari 2026. Daarna bouwt Hezo stap voor stap een aanbod uit met bijscholingen, webinars en leermomenten."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Waar vinden de opleidingen van Hezo plaats?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "De opleidingen vinden plaats in Gent en online (hybride vorm). Dit combineert infosessies met praktijkvoorbeelden."
                  }
                }
              ]
            }
          ]
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <GraduationCap className="h-16 w-16 text-secondary mx-auto mb-6" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Opleidingen</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Groei in je vak, met houvast en praktijkgerichte kennis.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bij Hezo zien we vorming als een manier om sterker te staan in je dagelijks werk, niet
              als een verplichting, maar als een kans om met meer rust en zekerheid te zorgen. Onze
              opleidingen helpen zelfstandige verpleegkundigen om vertrouwd te blijven met nieuwe
              inzichten, regelgeving en praktische tools.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We combineren kennis uit de praktijk met thema's die écht relevant zijn voor jouw werk:
              administratie, communicatie, samenwerking en zorgkwaliteit. Elke sessie is opgebouwd
              rond herkenbare situaties, met aandacht voor efficiëntie én welzijn.
            </p>
          </div>

          {/* Opleiding 1 */}
          <Card className="mb-8 border-secondary/20 shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">
                  <Monitor className="h-3 w-3 mr-1" />
                  Webinar
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  Opname beschikbaar
                </Badge>
              </div>
              <CardTitle className="text-2xl">
                Poortkatheters voor verpleegkundigen in de thuiszorg
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">23 maart 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">13:30 – 15:00 (1u30)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Max. 50 deelnemers</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                De verschillende stappen van de procedure rond poortkatheters worden behandeld: aanprikken, bloedafname, afsluiten en spoelen. Tijdens deze sessie worden de belangrijkste aandachtspunten per stap duidelijk toegelicht door middel van foto's, uitleg, kennisclips. De webinar is te herbekijken tot 10 dagen na de datum.
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-secondary" />
                <span>Lesgever: Artevelde Hogeschool</span>
              </div>

              <div className="bg-muted p-5 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Euro className="h-4 w-4 text-secondary" />
                  Kostprijs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-muted-foreground">Hezo-klanten</span>
                    <span className="font-semibold text-secondary text-lg">Gratis</span>
                  </div>
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-muted-foreground">Niet-Hezo-klanten</span>
                    <span className="font-semibold text-foreground text-lg">€ 35</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opleiding 2 */}
          <Card className="mb-16 border-secondary/20 shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">
                  <Building2 className="h-3 w-3 mr-1" />
                  Fysieke opleiding
                </Badge>
              </div>
              <CardTitle className="text-2xl">
                BLS/AED – officieel certificaat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">11 mei 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">13:30 – 17:30 (4u00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Helan Hoofdkantoor – zaal Magnolia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Max. 12 deelnemers</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Wist je dat je elke 2 jaar een gecertificeerde opleiding BLS/AED moet volgen? Deze opleiding, onder begeleiding van Hogent, neemt je mee in alle principes van BLS en het gebruik van een AED.
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-secondary" />
                <span>Lesgever: Hogent</span>
              </div>

              <div className="bg-muted p-5 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Euro className="h-4 w-4 text-secondary" />
                  Kostprijs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-muted-foreground">Hezo-klanten</span>
                    <span className="font-semibold text-secondary text-lg">Gratis</span>
                  </div>
                  <div className="flex justify-between sm:flex-col sm:gap-1">
                    <span className="text-muted-foreground">Niet-Hezo-klanten</span>
                    <span className="font-semibold text-foreground text-lg">€ 85</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Opleidingen;
