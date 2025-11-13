import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const Opleidingen = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
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
            <p className="text-lg text-foreground font-medium">
              De eerste opleidingen starten in februari 2026. Daarna bouwen we stap voor stap een
              aanbod uit met bijscholingen, webinars en leermomenten afgestemd op de noden van
              zelfstandige thuisverpleging.
            </p>
          </div>

          {/* Featured Training */}
          <Card className="mb-16 border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Starten als zelfstandige thuisverpleegkundige
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="text-muted-foreground">Start: februari 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span className="text-muted-foreground">Locatie: Gent (en online)</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Denk je eraan om als zelfstandige te starten? Deze opleiding helpt je om voorbereid en
                met vertrouwen van start te gaan.
              </p>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Je leert:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>hoe je jouw RIZIV- en verzekeringsadministratie in orde brengt,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>welke software en tools je nodig hebt voor facturatie en opvolging,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>hoe tarificatie en remgeld in de praktijk werken,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>hoe je patiënten vindt en communiceert met artsen,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>wat er komt kijken bij je eerste zorgaanvragen.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Voor wie:</h3>
                <p className="text-muted-foreground">
                  Verpleegkundigen die zelfstandig willen starten of hun overstap voorbereiden.
                </p>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Inschrijven kan vanaf januari 2026.
              </p>
            </CardContent>
          </Card>

          {/* Coming Soon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Nieuwe opleiding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Meer informatie volgt binnenkort.</p>
                <p className="text-sm text-muted-foreground">
                  Vorm: hybride opleiding – combinatie van infosessies en praktijkvoorbeelden
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webinar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Meer informatie volgt binnenkort.</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Opleidingen;
