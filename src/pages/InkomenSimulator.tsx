import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Indicatieve gemiddelde RIZIV-vergoedingen (afgerond) per prestatie-type
const TARIEF_BASIS = 14; // hygienische zorg / basisbezoek
const TARIEF_TOILET = 22; // toilet + ADL
const TARIEF_TECHNISCH = 35; // wondzorg, injecties complexer

const InkomenSimulator = () => {
  const [dagen, setDagen] = useState(5);
  const [patientenPerDag, setPatientenPerDag] = useState(14);
  const [mixBasis, setMixBasis] = useState(40);
  const [mixToilet, setMixToilet] = useState(30);
  const [aangesloten, setAangesloten] = useState(false);

  // mixTech = rest
  const mixTech = Math.max(0, 100 - mixBasis - mixToilet);

  const result = useMemo(() => {
    const weken = 4.33;
    const totalePrestaties = dagen * weken * patientenPerDag;
    const gemTarief =
      (TARIEF_BASIS * mixBasis + TARIEF_TOILET * mixToilet + TARIEF_TECHNISCH * mixTech) / 100;

    let brutoMaand = totalePrestaties * gemTarief;

    // Afdracht aan netwerk (Hezo: 8% vanaf 1 jaar ervaring) of solo (0)
    const afdracht = aangesloten ? brutoMaand * 0.08 : 0;
    brutoMaand -= afdracht;

    // Vaste kosten / maand (auto + materiaal + verzekering + boekhouder)
    const vasteKosten = 850;
    // Solo: hogere kosten (eigen software, eigen tariferingsdienst)
    const extraKostenSolo = aangesloten ? 0 : 180;

    const inkomenVoorBijdragen = brutoMaand - vasteKosten - extraKostenSolo;

    // Sociale bijdragen 20,5%
    const socialeBijdragen = inkomenVoorBijdragen * 0.205;

    // Belastingen progressief (vereenvoudigd, gemiddelde druk 25%)
    const belastbaar = inkomenVoorBijdragen - socialeBijdragen;
    const belastingen = Math.max(0, belastbaar * 0.25);

    const netto = belastbaar - belastingen;

    return {
      brutoMaand: Math.round(brutoMaand),
      vasteKosten: vasteKosten + extraKostenSolo,
      socialeBijdragen: Math.round(socialeBijdragen),
      belastingen: Math.round(belastingen),
      netto: Math.round(netto),
      nettoJaar: Math.round(netto * 12),
    };
  }, [dagen, patientenPerDag, mixBasis, mixToilet, mixTech, aangesloten]);

  const fmt = (n: number) => `€${n.toLocaleString("nl-BE")}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Inkomensimulator zelfstandige thuisverpleegkundige",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Bereken indicatief je netto inkomen als zelfstandige thuisverpleegkundige in Belgie op basis van werkdagen, patienten en zorgtype.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <>
      <SEO
        title="Inkomen zelfstandige thuisverpleegkundige berekenen | Simulator - Hezo"
        description="Hoeveel verdien je als zelfstandige thuisverpleegkundige? Bereken indicatief je netto maandinkomen op basis van werkdagen, patienten en zorgtype."
        path="/inkomen-simulator/"
        structuredData={structuredData}
      />

      <div className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Calculator className="h-12 w-12 text-secondary mx-auto mb-4" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Inkomensimulator zelfstandige thuisverpleegkundige
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Een realistische indicatie van je netto maandinkomen op basis van je werkritme, patientenmix en
                of je solo werkt of via een netwerk. Geen registratie nodig.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Invoer */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-8">
                  <div>
                    <Label className="text-base font-medium">
                      Werkdagen per week: <span className="text-secondary font-bold">{dagen}</span>
                    </Label>
                    <Slider
                      value={[dagen]}
                      onValueChange={(v) => setDagen(v[0])}
                      min={3}
                      max={7}
                      step={1}
                      className="mt-3"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Patienten per dag:{" "}
                      <span className="text-secondary font-bold">{patientenPerDag}</span>
                    </Label>
                    <Slider
                      value={[patientenPerDag]}
                      onValueChange={(v) => setPatientenPerDag(v[0])}
                      min={8}
                      max={25}
                      step={1}
                      className="mt-3"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <Label className="text-base font-medium block">Zorgmix (samen 100%)</Label>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Basiszorg / hygiene</span>
                        <span className="font-medium text-secondary">{mixBasis}%</span>
                      </div>
                      <Slider
                        value={[mixBasis]}
                        onValueChange={(v) => {
                          const nieuwe = v[0];
                          setMixBasis(nieuwe);
                          if (nieuwe + mixToilet > 100) setMixToilet(100 - nieuwe);
                        }}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Toilet / ADL</span>
                        <span className="font-medium text-secondary">{mixToilet}%</span>
                      </div>
                      <Slider
                        value={[mixToilet]}
                        onValueChange={(v) => {
                          const nieuwe = v[0];
                          if (mixBasis + nieuwe <= 100) setMixToilet(nieuwe);
                        }}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Technische zorg (wondzorg, complexere injecties):{" "}
                      <span className="font-medium text-secondary">{mixTech}%</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4 border-t">
                    <Switch
                      id="aangesloten"
                      checked={aangesloten}
                      onCheckedChange={setAangesloten}
                    />
                    <div className="flex-1">
                      <Label htmlFor="aangesloten" className="text-base font-medium cursor-pointer">
                        Aangesloten bij een netwerk (zoals Hezo)
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Lagere overheadkosten en patienteninstroom, in ruil voor 8% praktijkafdracht
                        (vanaf 1 jaar ervaring).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resultaat */}
              <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <div className="text-sm uppercase tracking-wide opacity-80 mb-2">
                      Indicatief netto / maand
                    </div>
                    <div className="text-5xl font-bold mb-2">{fmt(result.netto)}</div>
                    <div className="text-sm opacity-80">
                      Ongeveer {fmt(result.nettoJaar)} per jaar
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-semibold text-primary mb-3">Opbouw berekening</h3>
                    <Row label="Bruto omzet (na afdracht)" value={fmt(result.brutoMaand)} />
                    <Row label="Vaste kosten" value={`- ${fmt(result.vasteKosten)}`} />
                    <Row label="Sociale bijdragen (20,5%)" value={`- ${fmt(result.socialeBijdragen)}`} />
                    <Row label="Belastingen (gemiddeld 25%)" value={`- ${fmt(result.belastingen)}`} />
                    <div className="pt-3 border-t flex justify-between font-semibold text-primary">
                      <span>Netto / maand</span>
                      <span>{fmt(result.netto)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-xs text-muted-foreground p-4 bg-muted rounded-lg">
                  <strong>Disclaimer:</strong> dit is een vereenvoudigde simulatie ter indicatie. Werkelijke
                  cijfers hangen af van je exacte zorgmix, verplaatsingen, regio, fiscale situatie en
                  premies (telematicapremie, RIZIV sociaal statuut). Voor een exacte berekening van sociale
                  bijdragen contacteer een sociaal verzekeringsfonds zoals{" "}
                  <a
                    href="https://www.xerius.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    Xerius
                  </a>
                  .
                </div>
              </div>
            </div>

            {/* CTA-blok */}
            <div className="mt-12 grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-8 rounded-2xl">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Realistisch in jouw regio?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Wat haalbaar is in Antwerpen verschilt van Gent. Wij brengen de cijfers in jouw regio in kaart
                  tijdens een vrijblijvend gesprek.
                </p>
                <Button asChild>
                  <Link to="/contact/">
                    Plan een kennismaking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-secondary/10 p-8 rounded-2xl border-2 border-secondary/30">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Download de startersgids
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Een praktisch stappenplan in 7 stappen: RIZIV, sociaal statuut, verzekeringen en patienteninstroom.
                  Gratis, in PDF, naar je mailbox.
                </p>
                <Button asChild variant="secondary">
                  <Link to="/startersgids/">
                    <Download className="mr-2 h-4 w-4" />
                    Vraag de gids aan
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm text-muted-foreground">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default InkomenSimulator;
