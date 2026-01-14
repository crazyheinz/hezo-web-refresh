import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Users,
  Calendar,
  GraduationCap,
  Briefcase,
  FileText,
  Building2,
  Rocket,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const ZelfstandigWorden = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Zelfstandig thuisverpleegkundige worden",
    description: "Stappenplan om als zelfstandig thuisverpleegkundige te starten in België met ondersteuning van Hezo.",
    step: [
      {
        "@type": "HowToStep",
        name: "Check of je aan de voorwaarden voldoet",
        text: "Zorg dat je een erkend verpleegkundig diploma hebt, erkenning door FOD Volksgezondheid, een RIZIV-nummer, en registratie bij ondernemingsloket en sociaal verzekeringsfonds.",
      },
      {
        "@type": "HowToStep",
        name: "Kies je ondernemingsvorm",
        text: "Kies tussen een eenmanszaak of vennootschap, afhankelijk van je situatie en toekomstplannen.",
      },
      {
        "@type": "HowToStep",
        name: "Regel je opstart als zelfstandige",
        text: "Start je eenmanszaak via een erkend ondernemingsloket en zorg dat je dossier volledig is.",
      },
      {
        "@type": "HowToStep",
        name: "Bouw je praktijk duurzaam uit met Hezo",
        text: "Ontvang ondersteuning bij patiënteninstroom, planning, facturatie, opleiding en praktische begeleiding.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Zelfstandig thuisverpleegkundige worden | Hezo"
        description="Ontdek hoe je zelfstandig thuisverpleegkundige wordt in België. Stappenplan, voorwaarden, RIZIV-nummer en ondersteuning van Hezo bij elke stap."
        path="/zelfstandig-worden/"
        type="article"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              Zelfstandig thuisverpleegkundige worden: stappenplan & ondersteuning
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Als zelfstandig thuisverpleegkundige combineer je zorg met ondernemerschap. Je bepaalt zelf je agenda en patiënten, maar krijgt ook te maken met administratie, regelgeving en instroom. Hezo ondersteunt je bij elke stap, van oriëntatie tot een duurzaam uitgebouwde praktijk.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
              Waarom kiezen voor zelfstandig werken als thuisverpleegkundige?
            </h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Meer autonomie over je agenda, regio en werkritme</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Directe relatie met je patiënten</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Hogere vergoeding per prestatie binnen de RIZIV-kaders</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Flexibiliteit om werk en privé beter te combineren</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Ruimte voor professionele en persoonlijke groei</span>
              </li>
            </ul>
            <p className="text-muted-foreground italic">
              Zelfstandig werken biedt veel vrijheid, mits je goed voorbereid start.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-12">
              Zelfstandig thuisverpleegkundige worden in 4 duidelijke stappen
            </h2>

            {/* Step 1 */}
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary">
                    Stap 1: Check of je aan de voorwaarden voldoet
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  Om als zelfstandig thuisverpleegkundige te starten in België heb je nodig:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Een erkend verpleegkundig diploma</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Erkenning door de FOD Volksgezondheid</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Een RIZIV-nummer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Inschrijving bij een ondernemingsloket</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Aansluiting bij een sociaal verzekeringsfonds</span>
                  </li>
                </ul>

                {/* Hezo helpt infobox */}
                <div className="bg-light-blue/10 border border-light-blue/20 rounded-lg p-4 mb-6">
                  <p className="text-foreground">
                    <strong>Hezo helpt:</strong> Heb je vragen over erkenning, RIZIV of formaliteiten? Hezo helpt je begrijpen wat voor jou van toepassing is, nog vóór je effectief start.
                  </p>
                </div>

                {/* Collapsible RIZIV info */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="riziv" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <span className="text-left font-medium">Wat is een RIZIV-nummer en hoe vraag je dit aan?</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4 text-muted-foreground">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Het belang van je RIZIV-nummer</h4>
                          <p>Om te werken als zelfstandig thuisverpleegkundige heb je een RIZIV-nummer nodig. Dit nummer laat je toe om verpleegkundige prestaties correct aan te rekenen binnen de ziekteverzekering.</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Stap 1 – Erkenning door de FOD Volksgezondheid (visum)</h4>
                          <p className="mb-2">Voor je een RIZIV-nummer kan aanvragen, moet je erkend zijn als verpleegkundige door de FOD Volksgezondheid. Dit gebeurt via een zogenaamd visum. Dit is geen reisvisum, maar een officiële erkenning van je diploma.</p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Ben je afgestudeerd aan een erkende Belgische of Europese opleiding? Dan wordt dit vaak automatisch toegekend.</li>
                            <li>In andere gevallen moet je dit zelf aanvragen.</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Stap 2 – Inschrijving bij het RIZIV</h4>
                          <p>Na erkenning schrijf je je in bij het RIZIV via het officiële inschrijvingsformulier. Je dossier wordt beoordeeld door het RIZIV.</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Stap 3 – Ontvang je RIZIV-nummer</h4>
                          <p>Na goedkeuring ontvang je je persoonlijke RIZIV-nummer en kan je prestaties aanrekenen.</p>
                        </div>
                        
                        <div className="bg-green/10 border border-green/20 rounded-lg p-3 mt-4">
                          <p><strong>Hezo helpt:</strong> Twijfel je over je situatie? Hezo helpt je inschatten wanneer je dit best aanvraagt en wat de juiste volgorde is.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary">
                    Stap 2: Kies je ondernemingsvorm
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  Voor je effectief start, kies je een ondernemingsvorm. Dit bepaalt je aansprakelijkheid, fiscaliteit en administratie.
                </p>
                <p className="text-foreground mb-4">Meest voorkomende opties voor thuisverpleegkundigen:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground"><strong>Eenmanszaak</strong> – meest gekozen bij opstart</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground"><strong>Vennootschap</strong> – interessant bij samenwerking of hogere omzet</span>
                  </li>
                </ul>

                {/* Collapsible ondernemingsvorm */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ondernemingsvorm" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <span className="text-left font-medium">Welke ondernemingsvorm past bij mij?</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Een eenmanszaak is vaak eenvoudiger en sneller bij opstart</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Een vennootschap kan fiscaal interessanter worden bij groei</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>De juiste keuze hangt af van omzet, samenwerking en toekomstplannen</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-muted-foreground">Hezo helpt je deze keuze begrijpen vóór je officieel start.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Step 3 - CTA with Xerius */}
            <Card className="mb-8 border-secondary/30">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary">
                    Stap 3: Regel je opstart als zelfstandige
                  </h3>
                </div>
                
                <p className="text-foreground mb-6">
                  Ben je klaar om effectief te starten als zelfstandige thuisverpleegkundige? Dan kan je je administratieve opstart officieel regelen.
                </p>

                <div className="bg-coral/10 border border-coral/30 rounded-lg p-6 mb-6">
                  <p className="text-foreground mb-4 font-medium">
                    Start je eenmanszaak via onze partner Xerius
                  </p>
                  <a
                    href="https://www.xerius.be/viaxerius/nl/Opstart%20Eenmanszaak?utm_source=hezo&utm_medium=referral&utm_campaign=2026_hezo_helan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-coral text-coral-foreground px-6 py-3 rounded-lg font-medium hover:bg-coral/90 transition-colors"
                  >
                    Start je eenmanszaak bij Xerius
                  </a>
                </div>

                <p className="text-foreground mb-2">Zo weet je zeker dat:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">je inschrijving correct verloopt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">je dossier volledig is</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Hezo je verder kan ondersteunen vanaf dag één</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary">
                    Stap 4: Bouw je praktijk duurzaam uit
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Na de administratieve opstart begint het echte werk: je praktijk uitbouwen en duurzaam draaiende houden. Dat vraagt tijd, organisatie en continuïteit. Als zelfstandig thuisverpleegkundige sta je dagelijks voor keuzes rond planning, administratie, zorgopvolging en professionele ontwikkeling.
                </p>

                <p className="text-muted-foreground mb-6">
                  Bij Hezo kies je zelf hoeveel ondersteuning je daarbij wenst. Je behoudt je zelfstandigheid, terwijl je kan rekenen op gerichte ondersteuning waar dat voor jou het verschil maakt.
                </p>

                <h4 className="text-lg font-semibold text-foreground mb-4">Waarmee ondersteunen we zelfstandige verpleegkundigen?</h4>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-light-blue/10 border-l-4 border-light-blue rounded-r-lg">
                    <h5 className="font-semibold text-foreground mb-1">Patiënteninstroom</h5>
                    <p className="text-muted-foreground text-sm">We zorgen voor een voldoende en gespreide instroom van patiënten, afgestemd op jouw beschikbaarheid, regio en werkschema. Zo kan je je praktijk stap voor stap uitbouwen zonder overbelasting en met behoud van werk-privébalans.</p>
                  </div>
                  
                  <div className="p-4 bg-coral/10 border-l-4 border-coral rounded-r-lg">
                    <h5 className="font-semibold text-foreground mb-1">Planning, software en facturatie</h5>
                    <p className="text-muted-foreground text-sm">We ondersteunen je bij agendabeheer, administratie en facturatie. Door processen te stroomlijnen en digitale tools slim in te zetten, beperken we tijdsverlies en vermijd je onnodige administratieve druk.</p>
                  </div>
                  
                  <div className="p-4 bg-yellow/10 border-l-4 border-yellow rounded-r-lg">
                    <h5 className="font-semibold text-foreground mb-1">Opleiding en professionele ontwikkeling</h5>
                    <p className="text-muted-foreground text-sm">Via Hezo krijg je toegang tot opleidingen, bijscholing en een netwerk van collega-verpleegkundigen. Zo blijf je professioneel groeien, deel je kennis en blijf je mee met evoluties in de zorg.</p>
                  </div>
                  
                  <div className="p-4 bg-green/10 border-l-4 border-green rounded-r-lg">
                    <h5 className="font-semibold text-foreground mb-1">Praktische ondersteuning</h5>
                    <p className="text-muted-foreground text-sm">We geven advies over materialen, organisatie en praktische vragen uit het werkveld. Waar nodig verwijzen we door naar betrouwbare partners en leveranciers, steeds zonder commerciële verplichtingen.</p>
                  </div>
                </div>

                <div className="p-5 bg-muted/50 rounded-lg">
                  <h5 className="font-semibold text-foreground mb-2">Ondernemen hoef je niet alleen te doen</h5>
                  <p className="text-muted-foreground mb-4">
                    Als zelfstandig verpleegkundige behoud je je vrijheid en autonomie. Tegelijk sta je er bij Hezo nooit alleen voor. Van de eerste stappen tot het dagelijkse beheer van je praktijk ondersteunen en adviseren we waar mogelijk, en nemen we werk uit handen waar dat zinvol is.
                  </p>
                  <Link 
                    to="/wat-we-doen" 
                    className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
                  >
                    Ontdek alles wat we doen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <HelpCircle className="h-8 w-8 text-secondary" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Veelgestelde vragen
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="faq-0" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left font-medium">Heb ik altijd een RIZIV-nummer nodig?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">
                  Ja, als je prestaties wil aanrekenen in de thuisverpleging is een RIZIV-nummer verplicht.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-1" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left font-medium">Heb ik een boekhouder nodig?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">
                  Niet verplicht, maar sterk aangeraden voor fiscale en administratieve opvolging.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-2" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left font-medium">Wat als ik ziek word als zelfstandige?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">
                  Je hebt recht op een uitkering vanaf een bepaald moment. Je kan je aanvullend verzekeren voor extra bescherming.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Conclusie: zelfstandig ondernemen hoeft niet alleen
            </h2>
            <p className="text-lg mb-4 opacity-90">
              Als zelfstandig thuisverpleegkundige behoud je vrijheid en autonomie.
            </p>
            <p className="text-lg mb-8 opacity-90">
              Met Hezo sta je er niet alleen voor: wij ondersteunen je bij administratie, instroom en verdere uitbouw, zodat jij je kan focussen op wat echt telt: zorg voor je patiënten.
            </p>
            <p className="text-lg mb-8">
              Heb je vragen of wil je starten?
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact/">Neem contact op met Hezo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZelfstandigWorden;
