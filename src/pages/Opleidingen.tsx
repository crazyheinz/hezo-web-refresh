import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Clock, Users, Monitor, Building2, Euro, Search, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import InschrijfDialog from "@/components/opleidingen/InschrijfDialog";

interface Opleiding {
  titel: string;
  datum: Date;
  datumTekst: string;
  tijd: string;
  locatie?: string;
  maxDeelnemers: number;
  beschrijving: string;
  lesgever: string;
  type: "webinar" | "fysiek";
  opnameBeschikbaar: boolean;
}

const opleidingen: Opleiding[] = [
  {
    titel: "Poortkatheters voor verpleegkundigen in de thuiszorg",
    datum: new Date(2026, 2, 23),
    datumTekst: "23 maart 2026",
    tijd: "13:30 – 15:00 (1u30)",
    maxDeelnemers: 50,
    beschrijving: "De verschillende stappen van de procedure rond poortkatheters worden behandeld: aanprikken, bloedafname, afsluiten en spoelen. Tijdens deze sessie worden de belangrijkste aandachtspunten per stap duidelijk toegelicht door middel van foto's, uitleg, kennisclips. De webinar is te herbekijken tot 10 dagen na de datum.",
    lesgever: "Artevelde Hogeschool",
    type: "webinar",
    opnameBeschikbaar: true,
  },
  {
    titel: "BLS/AED – officieel certificaat",
    datum: new Date(2026, 4, 11),
    datumTekst: "11 mei 2026",
    tijd: "13:30 – 17:30 (4u00)",
    locatie: "Helan Hoofdkantoor – zaal Magnolia",
    maxDeelnemers: 12,
    beschrijving: "Wist je dat je elke 2 jaar een gecertificeerde opleiding BLS/AED moet volgen? Deze opleiding, onder begeleiding van Hogent, neemt je mee in alle principes van BLS en het gebruik van een AED.",
    lesgever: "Hogent",
    type: "fysiek",
    opnameBeschikbaar: false,
  },
  {
    titel: "Palliatieve Zorg: vroegtijdige zorgplanning en sociale voorzieningen",
    datum: new Date(2026, 3, 21),
    datumTekst: "21 april 2026",
    tijd: "13:00 – 16:00 (3u00)",
    maxDeelnemers: 50,
    beschrijving: "In deze opleiding leer je alles over vroegtijdige zorgplanning, communicatie en beschikbare voorziening voor de patiënt.",
    lesgever: "Palliatief netwerk Gent-Eeklo",
    type: "webinar",
    opnameBeschikbaar: true,
  },
  {
    titel: "Katz schaal in de thuisverpleging",
    datum: new Date(2026, 3, 27),
    datumTekst: "27 april 2026",
    tijd: "13:30 – 15:30 (2u00)",
    maxDeelnemers: 50,
    beschrijving: "De Katz schaal is een essentieel instrument in de thuisverpleging. In deze opleiding komen de richtlijnen uitgebreid aan bod en oefenen we de toepassing en gebruik ervan met casussen uit de praktijk.",
    lesgever: "Onafhankelijk Ziekenfonds: Els Desmet en Debbie Goossens",
    type: "webinar",
    opnameBeschikbaar: true,
  },
  {
    titel: "Palliatieve Zorg: Pijn- en symptoomcontrole",
    datum: new Date(2026, 4, 20),
    datumTekst: "20 mei 2026",
    tijd: "13:00 – 16:00 (2u00)",
    maxDeelnemers: 50,
    beschrijving: "Comfortzorg in de thuisomgeving omvat onder meer gerichte pijn- en symptoomcontrole. In deze opleiding krijg je tips om pijn te herkennen en onder controle te houden.",
    lesgever: "Palliatief netwerk Gent-Eeklo",
    type: "webinar",
    opnameBeschikbaar: true,
  },
  {
    titel: "Toelichting: controle van de verzekeringsinstellingen",
    datum: new Date(2026, 4, 21),
    datumTekst: "21 mei 2026",
    tijd: "13:30 – 15:30 (2u00)",
    maxDeelnemers: 50,
    beschrijving: "In deze opleiding krijg je informatie over de controles die gebeuren door de verzekeringsinstellingen (mutualiteiten). Hoe verloopt een controle en waar wordt op gelet? Wat als een controle niet kan doorgaan? Wat als je een afscoring hebt? Wat kan je zelf doen?",
    lesgever: "Onafhankelijk Ziekenfonds: Els Desmet en Debbie Goossens",
    type: "webinar",
    opnameBeschikbaar: true,
  },
];

const Opleidingen = () => {
  const [zoekterm, setZoekterm] = useState("");
  const [expandedOpleiding, setExpandedOpleiding] = useState<string | null>(null);

  const gefilterdeOpleidingen = useMemo(() => {
    const term = zoekterm.toLowerCase();
    return opleidingen
      .filter((o) =>
        !term ||
        o.titel.toLowerCase().includes(term) ||
        o.beschrijving.toLowerCase().includes(term) ||
        o.lesgever.toLowerCase().includes(term)
      )
      .sort((a, b) => a.datum.getTime() - b.datum.getTime());
  }, [zoekterm]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title="Opleidingen thuisverpleging | Gratis bijscholing"
        description="Gratis praktijkgerichte opleidingen voor thuisverpleegkundigen: administratie, communicatie en zorgkwaliteit. Bekijk het aanbod en schrijf je in →"
        path="/opleidingen"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              "name": "Starten als zelfstandige thuisverpleegkundige",
              "description": "Opleiding voor verpleegkundigen die zelfstandig willen starten of hun overstap voorbereiden.",
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

          {/* Zoekbalk */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Zoek op titel, onderwerp of lesgever..."
              value={zoekterm}
              onChange={(e) => setZoekterm(e.target.value)}
              className="pl-11 h-12 text-base"
            />
          </div>

          {gefilterdeOpleidingen.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Geen opleidingen gevonden voor "{zoekterm}"</p>
            </div>
          ) : (
            <div className="space-y-4 mb-16">
              {gefilterdeOpleidingen.map((opleiding) => {
                const isExpanded = expandedOpleiding === opleiding.titel;
                return (
                  <Card
                    key={opleiding.titel}
                    className={`border-secondary/20 shadow-sm hover:shadow-md transition-shadow ${!isExpanded ? "cursor-pointer" : ""}`}
                    onClick={() => { if (!isExpanded) setExpandedOpleiding(opleiding.titel); }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">
                          {opleiding.type === "webinar" ? (
                            <><Monitor className="h-3 w-3 mr-1" />Webinar</>
                          ) : (
                            <><Building2 className="h-3 w-3 mr-1" />Fysieke opleiding</>
                          )}
                        </Badge>
                        {opleiding.opnameBeschikbaar && (
                          <Badge variant="outline" className="text-muted-foreground">
                            Opname beschikbaar
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{opleiding.titel}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-secondary" />
                          {opleiding.datumTekst}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-secondary" />
                          {opleiding.tijd}
                        </span>
                        {opleiding.locatie && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-secondary" />
                            {opleiding.locatie}
                          </span>
                        )}
                      </div>
                      <button
                        className="text-secondary font-medium text-sm mt-2 hover:underline inline-flex items-center gap-1 w-fit"
                        onClick={(e) => { e.stopPropagation(); setExpandedOpleiding(isExpanded ? null : opleiding.titel); }}
                      >
                        {isExpanded ? "Minder tonen" : "Bekijk opleiding"}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="space-y-6 pt-0" onClick={(e) => e.stopPropagation()}>
                        <p className="text-muted-foreground leading-relaxed">{opleiding.beschrijving}</p>

                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-secondary" />
                            <span>Lesgever: {opleiding.lesgever}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-secondary" />
                            <span>Max. {opleiding.maxDeelnemers} deelnemers</span>
                          </div>
                        </div>

                        <div className="bg-muted p-5 rounded-lg space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Euro className="h-4 w-4 text-secondary" />
                            <span className="font-semibold text-foreground">Hezo-klanten:</span>
                            <span className="font-semibold text-secondary text-lg">Gratis</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ben je geen klant bij Hezo, maar wil je toch graag deelnemen aan de opleiding? Neem dan contact met ons op via{" "}
                            <a href="mailto:info@hezo.be" className="text-secondary hover:underline">info@hezo.be</a>.
                          </p>
                        </div>

                        <InschrijfDialog opleidingNaam={opleiding.titel} opleidingDatum={opleiding.datumTekst}>
                          <Button className="w-full sm:w-auto">Schrijf je in</Button>
                        </InschrijfDialog>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opleidingen;