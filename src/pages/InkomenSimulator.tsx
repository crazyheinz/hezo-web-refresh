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
const TARIEF_BASIS = 14; // hygiënische zorg / basisbezoek
const TARIEF_TOILET = 22; // toilet + ADL
const TARIEF_TECHNISCH = 35; // wondzorg, injecties complexer

const InkomenSimulator = () => {
  const [dagen, setDagen] = useState(5);
  const [patientenVm, setPatientenVm] = useState(15);
  const [patientenNm, setPatientenNm] = useState(8);
  const [mixBasis, setMixBasis] = useState(40);
  const [mixToilet, setMixToilet] = useState(30);
  const [aangesloten, setAangesloten] = useState(false);
  const [afdrachtPct, setAfdrachtPct] = useState(5);

  // mixTech = rest
  const mixTech = Math.max(0, 100 - mixBasis - mixToilet);
  const patientenPerDag = patientenVm + patientenNm;

  const result = useMemo(() => {
    const weken = 4.33;
    const totalePrestaties = dagen * weken * patientenPerDag;
    const gemTarief =
      (TARIEF_BASIS * mixBasis + TARIEF_TOILET * mixToilet + TARIEF_TECHNISCH * mixTech) / 100;

    const brutoOmzet = totalePrestaties * gemTarief;

    // Praktijkafdracht (varieert sterk per praktijk en ervaring)
    const afdracht = aangesloten ? brutoOmzet * (afdrachtPct / 100) : 0;
    const brutoNaAfdracht = brutoOmzet - afdracht;

    // Vaste maandelijkse beroepskosten (geschatte gemiddelden)
    const kostenAuto = 450; // brandstof, onderhoud, verzekering, afschrijving
    const kostenMateriaal = 120; // handschoenen, ontsmetting, klein materiaal
    const kostenSoftware = aangesloten ? 0 : 90; // patiëntdossier, tarificatie, facturatie
    const kostenVerzekering = 80; // BA, gewaarborgd inkomen (deel)
    const kostenBoekhouder = 110; // eenmanszaak indicatief
    const kostenTelecom = 35; // gsm, internet (beroepsdeel)
    const kostenOverhead = aangesloten ? 0 : 80; // tariferingsdienst, kleine uitbestedingen
    const kostenOpleiding = 25; // bijscholing maandbasis
    const vasteKosten =
      kostenAuto +
      kostenMateriaal +
      kostenSoftware +
      kostenVerzekering +
      kostenBoekhouder +
      kostenTelecom +
      kostenOverhead +
      kostenOpleiding;

    const inkomenVoorBijdragen = brutoNaAfdracht - vasteKosten;

    // Sociale bijdragen 20,5%
    const socialeBijdragen = inkomenVoorBijdragen * 0.205;

    // Belastingen progressief (vereenvoudigd, gemiddelde druk 25%)
    const belastbaar = inkomenVoorBijdragen - socialeBijdragen;
    const belastingen = Math.max(0, belastbaar * 0.25);

    const netto = belastbaar - belastingen;

    return {
      brutoOmzet: Math.round(brutoOmzet),
      afdracht: Math.round(afdracht),
      brutoNaAfdracht: Math.round(brutoNaAfdracht),
      vasteKosten: Math.round(vasteKosten),
      kostenAuto,
      kostenMateriaal,
      kostenSoftware,
      kostenVerzekering,
      kostenBoekhouder,
      kostenTelecom,
      kostenOverhead,
      kostenOpleiding,
      socialeBijdragen: Math.round(socialeBijdragen),
      belastingen: Math.round(belastingen),
      netto: Math.round(netto),
      nettoJaar: Math.round(netto * 12),
    };
  }, [dagen, patientenPerDag, mixBasis, mixToilet, mixTech, aangesloten, afdrachtPct]);

  const fmt = (n: number) => `€${n.toLocaleString("nl-BE")}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Inkomensimulator zelfstandige thuisverpleegkundige",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Bereken indicatief je netto inkomen als zelfstandige thuisverpleegkundige in België op basis van werkdagen, rondes, patiënten en zorgtype.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <>
      <SEO
        title="Inkomen zelfstandige thuisverpleegkundige berekenen | Simulator - Hezo"
        description="Hoeveel verdien je als zelfstandige thuisverpleegkundige? Bereken indicatief je netto maandinkomen op basis van werkdagen, rondes, patiënten en zorgtype."
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
                Een realistische indicatie van je netto maandinkomen op basis van je werkritme, rondes,
                patiëntenmix en of je solo werkt of via een netwerk. Geen registratie nodig.
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
                      Patiënten in de voormiddag:{" "}
                      <span className="text-secondary font-bold">{patientenVm}</span>
                    </Label>
                    <Slider
                      value={[patientenVm]}
                      onValueChange={(v) => setPatientenVm(v[0])}
                      min={0}
                      max={35}
                      step={1}
                      className="mt-3"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Patiënten in de namiddag / avond:{" "}
                      <span className="text-secondary font-bold">{patientenNm}</span>
                    </Label>
                    <Slider
                      value={[patientenNm]}
                      onValueChange={(v) => setPatientenNm(v[0])}
                      min={0}
                      max={35}
                      step={1}
                      className="mt-3"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Totaal: <span className="font-medium text-secondary">{patientenPerDag} patiënten per dag</span>
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <Label className="text-base font-medium block">Zorgmix (samen 100%)</Label>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Basiszorg / hygiëne</span>
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

                  <div className="pt-4 border-t space-y-4">
                    <div className="flex items-start gap-3">
                      <Switch
                        id="aangesloten"
                        checked={aangesloten}
                        onCheckedChange={setAangesloten}
                      />
                      <div className="flex-1">
                        <Label htmlFor="aangesloten" className="text-base font-medium cursor-pointer">
                          Aangesloten bij een praktijk of netwerk
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Patiënteninstroom, administratie en software via de praktijk, in ruil voor een
                          afdracht. Het percentage varieert sterk per praktijk en ervaring.
                        </p>
                      </div>
                    </div>

                    {aangesloten && (
                      <div>
                        <Label className="text-sm font-medium">
                          Praktijkafdracht:{" "}
                          <span className="text-secondary font-bold">{afdrachtPct}%</span>
                        </Label>
                        <Slider
                          value={[afdrachtPct]}
                          onValueChange={(v) => setAfdrachtPct(v[0])}
                          min={0}
                          max={15}
                          step={1}
                          className="mt-3"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Indicatief: percentages verschillen per praktijk, regio en anciënniteit. Vraag dit
                          steeds expliciet na bij de praktijk waar je je wil aansluiten.
                        </p>
                      </div>
                    )}
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
                    <Row label="Bruto omzet RIZIV" value={fmt(result.brutoOmzet)} />
                    {aangesloten && (
                      <Row
                        label={`Praktijkafdracht (${afdrachtPct}%)`}
                        value={`- ${fmt(result.afdracht)}`}
                      />
                    )}
                    <Row label="Vaste beroepskosten" value={`- ${fmt(result.vasteKosten)}`} />
                    <Row label="Sociale bijdragen (20,5%)" value={`- ${fmt(result.socialeBijdragen)}`} />
                    <Row label="Belastingen (gemiddeld 25%)" value={`- ${fmt(result.belastingen)}`} />
                    <div className="pt-3 border-t flex justify-between font-semibold text-primary">
                      <span>Netto / maand</span>
                      <span>{fmt(result.netto)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-3">Wat zit er in de vaste kosten?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li className="flex justify-between"><span>Auto (brandstof, onderhoud, verzekering, afschrijving)</span><span className="font-medium">{fmt(result.kostenAuto)}</span></li>
                      <li className="flex justify-between"><span>Materiaal (handschoenen, ontsmetting, klein materiaal)</span><span className="font-medium">{fmt(result.kostenMateriaal)}</span></li>
                      {result.kostenSoftware > 0 && (
                        <li className="flex justify-between"><span>Software (patiëntdossier, tarificatie, facturatie)</span><span className="font-medium">{fmt(result.kostenSoftware)}</span></li>
                      )}
                      <li className="flex justify-between"><span>Verzekeringen (BA, gewaarborgd inkomen deel)</span><span className="font-medium">{fmt(result.kostenVerzekering)}</span></li>
                      <li className="flex justify-between"><span>Boekhouder</span><span className="font-medium">{fmt(result.kostenBoekhouder)}</span></li>
                      <li className="flex justify-between"><span>Telecom (gsm, internet beroepsdeel)</span><span className="font-medium">{fmt(result.kostenTelecom)}</span></li>
                      {result.kostenOverhead > 0 && (
                        <li className="flex justify-between"><span>Tariferingsdienst en overige</span><span className="font-medium">{fmt(result.kostenOverhead)}</span></li>
                      )}
                      <li className="flex justify-between"><span>Bijscholing (gemiddeld)</span><span className="font-medium">{fmt(result.kostenOpleiding)}</span></li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3">
                      Indicatieve gemiddelden. Reële kosten variëren per regio, kilometers, materiaalgebruik
                      en gekozen verzekeringen. Niet opgenomen: VAPZ, IPT, eindejaarspremies of eenmalige
                      investeringen.
                    </p>
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
                  Een praktisch stappenplan in 7 stappen: RIZIV, sociaal statuut, verzekeringen en
                  patiënteninstroom. Gratis, in PDF, naar je mailbox.
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
