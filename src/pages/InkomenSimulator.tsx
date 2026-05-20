import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowRight, Download, Info, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Aggregaat-tarieven per bezoek (gemiddelde RIZIV-vergoeding incl. verplaatsing,
// gecorrigeerd voor de typische verhouding tussen volle en kortere/niet-billable contacten).
// Vaste mix achter de schermen: 65% basiszorg / hygiëne, 35% technische zorg.
const TARIEF_BASIS = 9;
const TARIEF_TECHNISCH = 15;
const MIX_BASIS = 0.65;
const MIX_TECH = 0.35;

const InkomenSimulator = () => {
  const [dagen, setDagen] = useState(5);
  const [patientenVm, setPatientenVm] = useState(15);
  const [patientenNm, setPatientenNm] = useState(20);
  const [aangesloten, setAangesloten] = useState(false);
  const [afdrachtPct, setAfdrachtPct] = useState(8);

  const patientenPerDag = patientenVm + patientenNm;

  const result = useMemo(() => {
    const weken = 4.33;
    const totalePrestaties = dagen * weken * patientenPerDag;
    const gemTarief = TARIEF_BASIS * MIX_BASIS + TARIEF_TECHNISCH * MIX_TECH;

    const brutoOmzet = totalePrestaties * gemTarief;

    // Bijdrage aan de praktijk (verschilt sterk: software, administratie,
    // patiënteninstroom, begeleiding, opleidingen, praktijkwerking).
    const commissie = aangesloten ? brutoOmzet * (afdrachtPct / 100) : 0;
    const brutoNaCommissie = brutoOmzet - commissie;

    // Vaste maandelijkse beroepskosten (realistische gemiddelden).
    const kostenAuto = 700; // brandstof (±€500 bij niet-elektrische wagen), onderhoud, verzekering, afschrijving
    const kostenMateriaal = 120;
    const kostenSoftware = aangesloten ? 0 : 90;
    const kostenVerzekering = 80;
    const kostenBoekhouder = 110;
    const kostenTelecom = 90;
    const kostenOverhead = aangesloten ? 0 : 80;
    const kostenOpleiding = 25;
    const vasteKosten =
      kostenAuto +
      kostenMateriaal +
      kostenSoftware +
      kostenVerzekering +
      kostenBoekhouder +
      kostenTelecom +
      kostenOverhead +
      kostenOpleiding;

    // RIZIV-premies (telematica + bijscholing): ongeveer €1.200/jaar = €100/maand.
    const premies = 100;

    const inkomenVoorBijdragen = brutoNaCommissie - vasteKosten + premies;

    // Sociale bijdragen 20,5% (eenmanszaak, indicatief).
    const socialeBijdragen = inkomenVoorBijdragen * 0.205;

    // Belastingen vereenvoudigd (gemiddelde druk 25% in eenmanszaak).
    const belastbaar = inkomenVoorBijdragen - socialeBijdragen;
    const belastingen = Math.max(0, belastbaar * 0.25);

    const nettoRaw = belastbaar - belastingen;
    // Afronden op €50 om schijnprecisie te vermijden.
    const netto = Math.round(nettoRaw / 50) * 50;

    return {
      brutoOmzet: Math.round(brutoOmzet),
      commissie: Math.round(commissie),
      brutoNaCommissie: Math.round(brutoNaCommissie),
      vasteKosten: Math.round(vasteKosten),
      kostenAuto,
      kostenMateriaal,
      kostenSoftware,
      kostenVerzekering,
      kostenBoekhouder,
      kostenTelecom,
      kostenOverhead,
      kostenOpleiding,
      premies,
      socialeBijdragen: Math.round(socialeBijdragen),
      belastingen: Math.round(belastingen),
      netto,
      nettoJaar: netto * 12,
    };
  }, [dagen, patientenPerDag, aangesloten, afdrachtPct]);

  const fmt = (n: number) => `€${n.toLocaleString("nl-BE")}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Inkomensimulator zelfstandige thuisverpleegkundige",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Schat indicatief je bruto omzet en beschikbaar inkomen als zelfstandige thuisverpleegkundige in België op basis van werkdagen en patiënten.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <>
      <SEO
        title="Inkomen zelfstandige thuisverpleegkundige inschatten | Hezo"
        description="Krijg een indicatief beeld van je bruto omzet en beschikbaar inkomen als zelfstandige thuisverpleegkundige. Vereenvoudigde simulatie, geen boekhoudkundig advies."
        path="/inkomen-simulator/"
        structuredData={structuredData}
      />

      <div className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Calculator className="h-12 w-12 text-secondary mx-auto mb-4" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Inkomen inschatten als zelfstandige thuisverpleegkundige
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Een vereenvoudigde simulatie om je te helpen nadenken over je werkritme en
                inkomensverwachting. Geen exacte boekhoudkundige berekening, geen registratie nodig.
              </p>
              <div className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full bg-muted text-xs text-muted-foreground border border-border">
                <Info className="h-3.5 w-3.5" />
                Vereenvoudigde simulatie. Geen boekhoudkundig advies.
              </div>
            </div>

            {/* Hero resultaten - full width bovenaan */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <div className="text-sm uppercase tracking-wide opacity-80 mb-2">
                    Indicatieve bruto omzet RIZIV / maand
                  </div>
                  <div className="text-5xl font-bold mb-2">{fmt(result.brutoOmzet)}</div>
                  <div className="text-sm opacity-80">
                    Gemiddelde inschatting op basis van je werkritme en patiëntenaantal.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 border-2">
                <CardContent className="p-8">
                  <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                    Indicatief beschikbaar inkomen / maand
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    ± {fmt(result.netto)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ruwe schatting na vaste kosten, sociale bijdragen en belastingen.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Invoer + Opbouw naast elkaar */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="p-6 md:p-8 space-y-8">
                  <h2 className="text-xl font-semibold text-primary">Jouw werkritme</h2>
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

                  <div className="pt-4 border-t space-y-4">
                    <div className="flex items-start gap-3">
                      <Switch
                        id="aangesloten"
                        checked={aangesloten}
                        onCheckedChange={setAangesloten}
                      />
                      <div className="flex-1">
                        <Label htmlFor="aangesloten" className="text-base font-medium cursor-pointer">
                          Aangesloten bij een praktijk
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Je werkt onder een bestaande praktijk en draagt een percentage af voor
                          ondersteuning, administratie, software, patiënteninstroom, begeleiding,
                          opleidingen en praktijkwerking. Wat precies wordt aangeboden verschilt sterk
                          per praktijk.
                        </p>
                      </div>
                    </div>

                    {aangesloten && (
                      <div>
                        <Label className="text-sm font-medium">
                          Bijdrage aan de praktijk:{" "}
                          <span className="text-secondary font-bold">{afdrachtPct}%</span>
                        </Label>
                        <Slider
                          value={[afdrachtPct]}
                          onValueChange={(v) => setAfdrachtPct(v[0])}
                          min={0}
                          max={20}
                          step={1}
                          className="mt-3"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Indicatief. Percentages verschillen sterk per praktijk, regio, anciënniteit
                          en wat de praktijk aanbiedt. Dit is geen Hezo-specifiek tarief. Vraag dit
                          altijd expliciet na bij de praktijk waar je je wil aansluiten.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-primary mb-5">Opbouw van de berekening</h2>
                  <div className="space-y-3">
                    <Row label="Bruto omzet RIZIV" value={fmt(result.brutoOmzet)} />
                    {aangesloten && (
                      <Row
                        label={`Bijdrage aan de praktijk (${afdrachtPct}%)`}
                        value={`- ${fmt(result.commissie)}`}
                      />
                    )}
                    <Row label="Vaste beroepskosten" value={`- ${fmt(result.vasteKosten)}`} />
                    <Row
                      label="RIZIV-premies (telematica + bijscholing)"
                      value={`+ ${fmt(result.premies)}`}
                    />
                    <Row label="Sociale bijdragen (±20,5%)" value={`- ${fmt(result.socialeBijdragen)}`} />
                    <Row label="Belastingen (gemiddeld ±25%)" value={`- ${fmt(result.belastingen)}`} />
                    <div className="pt-3 border-t flex justify-between font-semibold text-primary">
                      <span>Indicatief beschikbaar / maand</span>
                      <span>± {fmt(result.netto)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Kosten + Eenmanszaak naast elkaar */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold text-primary mb-4">Wat zit er in de vaste kosten?</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
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
                  <p className="text-xs text-muted-foreground mt-4">
                    Indicatieve gemiddelden. Reële kosten variëren per regio, kilometers, materiaalgebruik
                    en gekozen verzekeringen. Niet opgenomen: VAPZ, IPT, eindejaarspremies of eenmalige
                    investeringen.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-muted/40 h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-3 mb-4">
                      <Building2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-primary">
                        Eenmanszaak of vennootschap?
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Deze simulatie vertrekt vanuit een eenmanszaak. Wie voltijds werkt, ziet vaak
                      dat een vennootschap fiscaal interessanter wordt: sociale bijdragen en
                      belastingen worden anders berekend. We gaan hier bewust niet in detail op in,
                      maar het kan een belangrijk verschil maken in je beschikbaar inkomen.{" "}
                      <Link to="/contact/" className="text-secondary underline">
                        Bespreek dit met ons
                      </Link>
                      .
                    </p>

                    <div className="text-xs text-muted-foreground pt-5 border-t">
                      <div className="flex items-start gap-2 mb-2">
                        <Info className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                        <strong className="text-primary">Disclaimer</strong>
                      </div>
                      <p className="mb-2">
                        Dit blijft een vereenvoudigde simulatie. Je werkelijke inkomsten verschillen
                        sterk afhankelijk van onder meer regio en patiëntenmix, verplaatsingen,
                        fiscale structuur, werkritme, anciënniteit, vaste kosten en sociale bijdragen.
                      </p>
                      <p>
                        Voor een exacte berekening van sociale bijdragen contacteer een sociaal
                        verzekeringsfonds zoals{" "}
                        <a
                          href="https://www.xerius.be"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary underline"
                        >
                          Xerius
                        </a>
                        . Voor fiscale optimalisatie raden we aan om een boekhouder te raadplegen.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA-blok */}
            <div className="mt-12 grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-8 rounded-2xl">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Vragen bij deze simulatie?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  We helpen zelfstandige thuisverpleegkundigen bij hun opstart, software, administratie
                  en patiënteninstroom. Tijdens een vrijblijvend gesprek kijken we samen wat realistisch
                  is in jouw situatie en regio.
                </p>
                <Button asChild>
                  <Link to="/contact/">
                    Plan een vrijblijvend gesprek
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-secondary/10 p-8 rounded-2xl border-2 border-secondary/30">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Startersgids voor thuisverpleegkundigen
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Een praktisch stappenplan dat je rustig door de opstart loodst: RIZIV, sociaal
                  statuut, verzekeringen en patiënteninstroom. Gratis, in PDF, naar je mailbox.
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
