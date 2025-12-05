import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Users, Heart, Headphones, GraduationCap, FileText } from "lucide-react";
import SEO from "@/components/SEO";

const WatWeDoen = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          const navHeight = 100; // Account for fixed navigation
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash]);
  const sections = [
    {
      id: "toestroom",
      icon: Users,
      title: "Toestroom van patiënten",
      subtitle: "Een vlotte instroom, met zorg voor de juiste match.",
      content: [
        "Bij Hezo komt de zorgvraag rechtstreeks vanuit Helan, het ziekenfonds en welzijnsnetwerk dat duizenden klanten ondersteunt in hun zoektocht naar thuisverpleging.",
        "Vanuit dat netwerk koppelen we zorgvragen zorgvuldig aan zelfstandige verpleegkundigen binnen Hezo.",
        "Zo krijgen verpleegkundigen een regelmatige instroom van nieuwe patiënten en kunnen ze hun ronde geleidelijk uitbreiden.",
      ],
      extra: {
        title: "Samenwerking met zorgpartners",
        content:
          "Naast Helan werken we samen met huisartsen, ziekenhuizen en lokale welzijnsorganisaties. Door die samenwerking ontstaat een sterk netwerk waarin zorgvragen snel hun weg vinden naar de juiste zorgverlener. Hezo bouwt bruggen tussen professionals, zodat patiënten verzekerd zijn van kwalitatieve zorg in hun eigen omgeving. Bij Hezo verbinden we de zorgvragen van Helan met de mensen die willen zorgen. Zo creëren we stabiliteit voor verpleegkundigen én zekerheid voor patiënten.",
      },
    },
    {
      id: "welzijn",
      icon: Heart,
      title: "Welzijn & werkplezier",
      subtitle: "Zorg voor anderen begint bij zorg voor jezelf.",
      content: [
        "Bij Hezo geloven we dat duurzame zorg alleen mogelijk is als ook de zorgverlener zich goed voelt. Daarom bouwen we niet zomaar een netwerk, maar een vangnet met slimme processen, ondersteunende teams en ruimte voor evenwicht.",
      ],
      subsections: [
        {
          title: "Minder administratie, meer ademruimte",
          content:
            "We automatiseren de stappen die jouw zorgverlening vertragen, zodat jij minder tijd verliest aan administratie en meer tijd overhoudt voor patiënten.",
        },
        {
          title: "Een netwerk dat elkaar versterkt",
          content:
            "Hezo gelooft niet in soloritten, maar in verbinding. Door verpleegkundigen en praktijken met elkaar in contact te brengen, ontstaat er een netwerk waarop je kan terugvallen wanneer het even te veel wordt. Zo blijft er ruimte voor rust, overleg en wederzijds begrip zonder dat je zelfstandigheid verdwijnt.",
        },
        {
          title: "Een netwerk dat elkaar versterkt",
          content:
            "Hezo brengt zelfstandige verpleegkundigen samen in een veilige, vertrouwde omgeving waar je ervaringen kan delen, vragen kan stellen en ondersteuning vindt wanneer je die nodig hebt.",
        },
        {
          title: "Verbonden met welzijnsdiensten",
          content:
            "Hezo is geen eiland. Dankzij onze samenwerking met partners in huishoudhulp en thuiszorg creëren we een breder welzijnsnetwerk dat jouw werk verlicht. Zo kunnen jouw patiënten ook terecht voor bijkomende ondersteuning, terwijl jij meer evenwicht bewaart tussen werk en herstel.",
        },
      ],
      extra: {
        title: "Bij Hezo is welzijn geen slogan, maar een systeem.",
        content: "We bouwen een omgeving waarin verpleegkundigen kunnen groeien, ontwikkelen en floreren.",
      },
    },
    {
      id: "begeleiding",
      icon: Headphones,
      title: "Persoonlijke begeleiding & ondersteuning",
      subtitle: "Zelfstandig, maar nooit alleen.",
      content: [
        "Thuisverpleging is mensenwerk, ook voor wie de zorg verleent. Bij Hezo voorzien we begeleiding die aansluit bij wat jij nodig hebt. Of je nu pas start, al jaren zelfstandig werkt of een volledige praktijk runt: je staat er niet alleen voor.",
      ],
      subsections: [
        {
          title: "Voor starters",
          content:
            "De stap naar zelfstandigheid brengt veel vragen met zich mee. Daarom begeleiden we je van bij het begin: van de administratieve opstart tot de eerste zorgaanvragen. We werken samen met Xerius voor alles wat te maken heeft met het zelfstandigenstatuut en verzekeringen, en helpen bij de keuze en koppeling van software en facturatie. Met duidelijke checklists en praktische ondersteuning zorgen we dat je vlot aan de slag kan, zonder dat papierwerk of onzekerheid je tegenhoudt.",
        },
        {
          title: "Voor wie zelfstandig werkt",
          content:
            "Ook als je al zelfstandig werkt, kan je bij Hezo terecht voor een klankbord. Of je nu alleen werkt of in een kleine praktijk, wij denken met je mee over je dagelijkse werking, administratie, communicatie en de organisatie van je zorg. Wanneer je even perspectief nodig hebt, iemand wil raadplegen of samen wil bekijken hoe iets eenvoudiger of efficiënter kan, kan je altijd bij ons terecht. We denken mee op jouw tempo en in functie van hoe jij je werk organiseert, zonder jouw autonomie uit het oog te verliezen.",
        },
        {
          title: "Juridische ondersteuning",
          content:
            "Soms duiken er vragen op rond afspraken, contracten of samenwerking. In die situaties kan je rekenen op advies en begeleiding. We helpen je de juiste stappen te zetten en werken samen met juridische partners die vertrouwd zijn met de zorgsector. Zo blijf je zeker van een correcte en professionele aanpak, ook wanneer het even complex wordt.",
        },
      ],
      extra: {
        title: "Hezo biedt ondersteuning die meegroeit met jouw werk als zelfstandige verpleegkundige",
        content: "Zodat jij kan blijven zorgen, met zekerheid en vertrouwen.",
      },
    },
    {
      id: "opleiding",
      icon: GraduationCap,
      title: "Opleiding & groei",
      subtitle: "Blijven groeien is de beste vorm van zorg.",
      content: [
        "De zorg verandert snel: nieuwe technieken, richtlijnen en verwachtingen. Bij Hezo zorgen we ervoor dat je mee bent met wat telt. Leren zien we niet als verplichting, maar als een manier om sterker, efficiënter en zelfzekerder te worden in je werk.",
      ],
      subsections: [
        {
          title: "Leren op jouw tempo",
          content:
            "Op het Hezo-platform volg je opleidingen die aansluiten bij je ritme en noden: korte online modules, praktijkgerichte sessies in kleine groepen en inspirerende workshops. Geen eindeloze theorie, maar kennis die je meteen kan gebruiken in je werking.",
        },
        {
          title: "Van kennis naar kwaliteit",
          content:
            "Onze opleidingen helpen je groeien als zorgverlener, collega én ondernemer. Naast technische thema's zoals wondzorg, hygiëne en nomenclatuur besteden we aandacht aan communicatie, samenwerking, zelfzorg en praktijkorganisatie, alles wat je helpt om kwalitatief én duurzaam te werken.",
        },
        {
          title: "Samen slimmer",
          content:
            "Leren doe je niet alleen. In de Hezo-community deel je ervaringen met andere verpleegkundigen, bespreek je cases en leer je wat écht werkt op het terrein. Zo ontstaat een cultuur waarin kennis vlot doorstroomt, van praktijk tot praktijk, van mens tot mens.",
        },
      ],
      extra: {
        title: "Bij Hezo ondersteunen we je om mee te blijven met wat verandert in de zorg.",
        content: "Praktisch, toepasbaar en afgestemd op jouw werk.",
      },
    },
    {
      id: "administratie",
      icon: FileText,
      title: "Administratie & digitale ondersteuning",
      subtitle: "Betrouwbare opvolging, digitaal overzicht.",
      content: [
        "Hezo zorgt voor een vlotte en correcte administratieve afhandeling van alle zorgprestaties. We nemen de complexe opvolging van tarificatie, facturatie en betalingen over, zodat jij met een gerust hart kan focussen op je patiënten.",
      ],
      features: [
        {
          title: "Tarificatie en opvolging",
          content: "We waken erover dat elke prestatie correct wordt verwerkt. Hezo zorgt ervoor dat facturen tijdig en foutloos naar de mutualiteiten worden verstuurd, en volgt eventuele weigeringen of correcties op. Wanneer iets niet juist loopt, zoeken we mee naar de oplossing.",
        },
        {
          title: "Remgeld en supplementen",
          content:
            "Voor remgeld of eventuele supplementen die buiten de nomenclatuur vallen, zorgt Hezo voor het volledige proces: van het opstellen en verzenden van de patiëntfactuur tot de opvolging van de betaling. We houden rekening met verhoogde tegemoetkoming en met de maximumfactuur (MAF), zodat patiënten nooit meer betalen dan wettelijk voorzien. Verpleegkundigen ontvangen de juiste bedragen tijdig en overzichtelijk via onze centrale uitbetalingen.",
        },
        {
          title: "Uitbetalingen aan verpleegkundigen",
          content:
            "Hezo zorgt voor duidelijke en correcte uitbetalingen aan alle aangesloten verpleegkundigen. Je ontvangt je vergoedingen tijdig, volledig en met overzicht van de bijhorende prestaties.",
        },
        {
          title: "HeNurse: jouw digitale omgeving",
          content:
            "Via HeNurse krijg je een volledig overzicht van jouw praktijk. Je vindt er: prestaties, betalingen en documenten, nieuws en updates over belangrijke wijzigingen of sectorinformatie, inschrijvingen voor opleidingen en advies over bijscholing, sjablonen, handleidingen en andere praktische documenten. Zo heb je in één veilige omgeving alles bij de hand om efficiënt te werken.",
        },
        {
          title: "Softwarekoppeling en ondersteuning",
          content:
            "Voor planning en tarificatie werken we met gehomologeerde softwarepakketten uit de sector. Hezo zorgt voor een vlotte koppeling met deze systemen en biedt ondersteuning bij het gebruik ervan. Onze helpdesk kent de werking van deze software door en door en helpt bij vragen over facturatie, nomenclatuur of technische instellingen.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO 
        title="Wat We Doen | Hezo - Ondersteuning Thuisverpleging"
        description="Ontdek hoe Hezo zelfstandige thuisverpleegkundigen ondersteunt met patiënteninstroom, welzijn, begeleiding, opleiding en administratie."
        path="/wat-we-doen"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Wat We Doen - Hezo",
          "description": "Ontdek hoe Hezo zelfstandige thuisverpleegkundigen ondersteunt met patiënteninstroom, welzijn, begeleiding, opleiding en administratie.",
          "url": "https://www.hezo.be/wat-we-doen",
          "mainEntity": {
            "@type": "Service",
            "name": "Ondersteuning voor Thuisverpleegkundigen",
            "provider": {
              "@type": "Organization",
              "name": "Hezo"
            },
            "serviceType": "Healthcare Support Services"
          }
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-center">
            Wat we doen
          </h1>
          <p className="text-xl text-muted-foreground mb-16 text-center">
            Ontdek hoe Hezo zelfstandige verpleegkundigen ondersteunt in elke fase van hun traject
          </p>

          <div className="space-y-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <div className="mb-4">
                        <Icon className="h-14 w-14 text-secondary" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-3xl">{section.title}</CardTitle>
                      <p className="text-lg text-muted-foreground mt-2">{section.subtitle}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {section.content.map((paragraph, idx) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}

                      {section.subsections && (
                        <div className="space-y-6 mt-8">
                          {section.subsections.map((sub, idx) => (
                            <div key={idx}>
                              <h3 className="text-xl font-semibold text-foreground mb-3">
                                {sub.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed">{sub.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.features && (
                        <Accordion type="single" collapsible className="mt-8">
                          {section.features.map((feature, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`}>
                              <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
                                {feature.title}
                              </AccordionTrigger>
                              <AccordionContent>
                                {feature.title === "HeNurse: jouw digitale omgeving" ? (
                                  <div className="text-muted-foreground leading-relaxed space-y-3">
                                    <p>Via HeNurse krijg je een volledig overzicht van jouw praktijk. Je vindt er:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                      <li>prestaties, betalingen en documenten,</li>
                                      <li>nieuws en updates over belangrijke wijzigingen of sectorinformatie,</li>
                                      <li>inschrijvingen voor opleidingen en advies over bijscholing,</li>
                                      <li>sjablonen, handleidingen en andere praktische documenten.</li>
                                    </ul>
                                    <p>Zo heb je in één veilige omgeving alles bij de hand om efficiënt te werken.</p>
                                  </div>
                                ) : (
                                  <p className="text-muted-foreground leading-relaxed">
                                    {feature.content}
                                  </p>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}

                      {section.extra && (
                        <div className="bg-muted p-6 rounded-lg mt-8">
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {section.extra.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {section.extra.content}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatWeDoen;
