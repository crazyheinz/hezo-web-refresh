import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";

import { supabase } from "@/integrations/supabase/client";

const Vacatures = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
    privacy: false,
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({
        title: "Privacy akkoord vereist",
        description: "Gelieve akkoord te gaan met het privacybeleid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const jobTitle = jobs.find((j) => j.id === selectedJob)?.title || selectedJob;
      
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("motivation", formData.motivation);
      formDataToSend.append("position", jobTitle || "");
      if (cvFile) {
        formDataToSend.append("cv", cvFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-application`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Submission error:", response.status, errorData);
        throw new Error(errorData.error || "Submission failed");
      }

      toast({
        title: "Bedankt voor je sollicitatie!",
        description: "We nemen binnenkort contact met je op.",
      });
      setFormData({ name: "", email: "", phone: "", motivation: "", privacy: false });
      setCvFile(null);
      setSelectedJob(null);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of mail naar info@hezo.be",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobs = [
    {
      id: "praktijkcoach",
      title: "Praktijkcoach",
      tagline: "Word jij de motor achter sterke zelfstandige verpleegkundigen?",
      description:
        "Hezo, het netwerk van zelfstandige verpleegkundigen met ondersteuning van Helan - Welzijnsgroep, groeit snel. Daarom zoeken we een praktijkcoach die onze praktijkcoördinatoren en startende zelfstandigen begeleidt, inspireert en ondersteunt.",
      responsibilities: [
        "Je bent het eerste en vaste aanspreekpunt voor onze aangesloten verpleegkundigen en bouwt een vertrouwensrelatie op",
        "Met jouw ervaring en coachende stijl help je hen groeien - persoonlijk, professioneel en strategisch",
        "Je luistert, adviseert en brengt mensen samen",
        "Je volgt de evoluties in de zorgsector op de voet en vertaalt ze naar concrete tips en oplossingen",
        "Je capteert signalen uit het werkveld en vertaalt die naar suggesties voor de organisatie",
        "Je werkt actief mee aan interne projecten rond opleiding, kwaliteit en innovatie",
      ],
      profile: [
        "Je hebt een diploma verpleegkunde en ervaring als zelfstandige thuisverpleegkundige",
        "Je bent nieuwsgierig, communicatief en oplossingsgericht",
        "Je kent de regelgeving (nomenclatuur, kwaliteitswet, boekhouding) of wil die snel leren",
        "Je werkt zelfstandig, maar voelt je thuis in een team dat samen vooruit wil",
        "Je houdt van coachen en verbinden - mensen voelen zich op hun gemak bij jou",
      ],
      offer: [
        "Een betekenisvolle rol in een vernieuwend project binnen Helan – Welzijnsgroep",
        "Veel autonomie en ruimte om mee te bouwen aan de toekomst van Hezo",
        "Vorming en groeikansen - ook voor jezelf",
        "Een warm, mensgericht team waar samenwerking centraal staat",
        "Marktconforme verloning en voordelen via Helan",
      ],
    },
    {
      id: "regiomanager",
      title: "Zelfstandig Regiomanager Thuisverpleging - Gent",
      tagline: "Wil jij mee een nieuw netwerk voor zelfstandige thuisverpleging uitbouwen én regiomanager worden van jouw eigen zorgregio?",
      description:
        "Bij Hezo bouw je als zelfstandig regiomanager aan een sterk lokaal netwerk van verpleegkundigen en zorgpartners. Je combineert organisatie en inhoudelijke zorgexpertise: je ondersteunt zelfstandige thuisverpleegkundigen, bewaakt de kwaliteit van zorg én helpt Hezo groeien in jouw regio. Hier ben je niet alleen een planner, maar ook een vertrouwenspersoon voor je team én een strategische partner in de verdere uitbouw van het Hezo-netwerk.",
      responsibilities: [
        "Je bewaakt de continuïteit en kwaliteit van de zorg in jouw regio",
        "Je organiseert de planning en opvolging van zorgvragen binnen je team",
        "Je zorgt voor overleg tussen teamleden en andere betrokkenen",
        "Je bouwt het team verder uit: je zoekt en selecteert nieuwe collega's die passen binnen het Hezo-verhaal en begeleidt starters in hun eerste stappen als zelfstandige",
        "Je blijft dicht bij de patiënt staan, voert waar nodig de noodzakelijke zorgen uit en maakt afspraken met hen over de zorg",
        "Je bouwt mee aan de zorg van de toekomst door mee te innoveren en kritisch te kijken naar de huidige processen",
        "Je bouwt een sterk regionaal netwerk uit met andere zorgverstrekkers en zorgt ervoor dat het team een betrouwbare zorgpartner wordt in jouw regio",
        "Je capteert signalen uit het werkveld en vertaalt die naar concrete verbetervoorstellen",
        "Je koppelt terug aan het bestuursteam van Hezo, deelt je visie en helpt mee de strategische koers en groei te bepalen",
        "Je denkt mee over nieuwe diensten, samenwerkingen en digitale oplossingen die de organisatie sterker maken",
        "Je bouwt mee aan een cultuur van samenwerking, vertrouwen en open communicatie",
      ],
      profile: [
        "Je beschikt over een diploma Verpleegkunde (HBO5, Bachelor of Master)",
        "Je bent woonachtig in of rond Gent of Antwerpen",
        "Je beschikt over een rijbewijs en eigen vervoer, zodat je je flexibel binnen de regio kan verplaatsen",
        "Je hebt ervaring in de thuisverpleging",
        "Je benadert elke patiënt met authenticiteit en vertrouwen, en weet menselijke nabijheid te combineren met professionele zorg",
        "Je bent leergierig en volgt regelmatig bijscholingen",
        "Je communiceert vlot, bent inspirerend en oplossingsgericht",
        "Je werkt zelfstandig en gestructureerd en durft beslissingen nemen",
        "Je verbindt graag collega's en bewaakt kwaliteit binnen je team",
        "Je wil het verschil maken voor zowel patiënten als zorgverleners en wil de zorg van de toekomst mee vorm geven",
      ],
      offer: [
        "Een uitdagende, veelzijdige functie met impact op zorg en organisatie",
        "Een rol met autonomie en impact",
        "Een hecht, betrokken team en ondersteuning in administratie en operationele opvolging",
        "Begeleiding bij het uitbouwen van rondes en patiëntenbestand",
        "Ondersteuning bij het aantrekken van nieuwe teamleden en het opzetten van een duurzaam regiomodel",
        "Coaching en opleiding op maat om te groeien op persoonlijk en professioneel vlak",
        "Transparante en correcte uitbetaling",
        "Een aantrekkelijk ereloon op basis van prestaties + een managementvergoeding",
      ],
    },
    {
      id: "administratief-coordinator",
      title: "Zorgondersteunend Administratief Coördinator",
      tagline: "Wil jij meebouwen aan een vernieuwend netwerk voor zelfstandige thuisverpleging?",
      description:
        "Bij Hezo krijg je als administratief zorgcoördinator een centrale rol. Je combineert administratieve taken met het ontwikkelen en optimaliseren van processen, en zet jouw (verpleegkundige) expertise in om het Hezo team én aangesloten verpleegkundigen te ondersteunen bij hun vragen. In deze rol ben je een onmisbare schakel binnen een startende organisatie in volle groei. Naarmate de organisatie groeit zal ook jouw rol evolueren in functie van jouw talenten en kwaliteiten.",
      responsibilities: [
        "Je beheert de facturatieflow en controleert binnenkomende prestatiegegevens van de aangesloten verpleegkundigen",
        "Je volgt betalingen op, signaleert fouten en bewaakt deadlines",
        "Je zorgt voor een correcte uitbetaling van de geleverde prestaties",
        "Je bent het aanspreekpunt voor administratieve vragen van collega's en zelfstandige verpleegkundigen",
        "Je ondersteunt in documentenbeheer, afsprakenbeheer en interne communicatie",
        "Je beheert en actualiseert het klanten-systeem en bewaakt dat data volledig en correct is",
        "Je verzamelt kwaliteitsdata en zet die om in heldere, bruikbare rapporten",
        "Je signaleert kwaliteitsafwijkingen en ondersteunt verbeteracties",
        "Je analyseert bestaande processen en brengt verbeterpunten in kaart",
        "Je zet bestaande processen om in duidelijke werkinstructies en handleidingen die efficiëntie en uniformiteit garanderen",
      ],
      profile: [
        "Je hebt kennis van en bent vertrouwd met alle aspecten van (thuis)verpleging",
        "Je hebt aantoonbare ervaring in officemanagement en/of kwaliteitsopvolging",
        "Je bent communicatief sterk en bent vlot in de omgang",
        "Je werkt gestructureerd en nauwkeurig",
        "Je haalt energie uit efficiëntie, duidelijkheid en gestroomlijnde processen en begrijpt dat sterke administratie een fundament is voor goede ondersteuning van zorgverstrekkers",
        "Je bent digitaal vaardig en vindt snel je weg in nieuwe systemen, Excel en rapporteringstools",
      ],
      offer: [
        "Flexibiliteit in je takenpakket op basis van je expertise",
        "Werknemersvorm, verloning en tewerkstellingsgraad zijn te bespreken - deze functie kan uitgevoerd worden als loontrekkende of zelfstandige",
        "Een functie met betekenis in een groeiend zorgplatform",
        "Een rol met veel autonomie en impact",
        "Een warm en gedreven team dat inzet op samenwerking, groei en innovatie",
        "Hybride werken: 3 dagen thuiswerk per week en 2 dagen op het kantoor in Gent",
        "Coaching en opleiding op maat om te groeien op persoonlijk en professioneel vlak",
        "Opleidings- en groeikansen, inclusief sectorgerichte kennisontwikkeling",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO 
        title="Vacatures | Hezo - Werken in de Thuisverpleging"
        description="Bekijk openstaande vacatures bij Hezo. Werk als praktijkcoach of regiomanager en maak het verschil in de zorg."
        path="/vacatures"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "name": "Vacatures bij Hezo",
              "description": "Bekijk openstaande vacatures bij Hezo",
              "url": "https://www.hezo.be/vacatures"
            },
            ...jobs.map(job => ({
              "@type": "JobPosting",
              "title": job.title,
              "description": job.description,
              "datePosted": "2025-01-15",
              "employmentType": "FULL_TIME",
              "hiringOrganization": {
                "@type": "Organization",
                "name": "Hezo",
                "sameAs": "https://www.hezo.be"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": job.id === "regiomanager" ? "Gent" : "België",
                  "addressCountry": "BE"
                }
              }
            }))
          ]
        }}
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

          <div className="space-y-6 mb-16">
            {jobs.map((job) => (
              <Card key={job.id} className="border-secondary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <p className="text-lg text-muted-foreground mt-2">{job.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mt-4">{job.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="responsibilities">
                      <AccordionTrigger className="text-lg font-semibold">
                        Wat doe je als {job.title.toLowerCase()}?
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, idx) => (
                            <li key={idx} className="flex items-start text-muted-foreground">
                              <CheckCircle2 className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="profile">
                      <AccordionTrigger className="text-lg font-semibold">
                        Wie ben jij?
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {job.profile.map((item, idx) => (
                            <li key={idx} className="flex items-start text-muted-foreground">
                              <CheckCircle2 className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="offer">
                      <AccordionTrigger className="text-lg font-semibold">
                        Wat mag je verwachten?
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {job.offer.map((item, idx) => (
                            <li key={idx} className="flex items-start text-muted-foreground">
                              <CheckCircle2 className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button
                    size="lg"
                    onClick={() => {
                      setSelectedJob(job.id);
                      setTimeout(() => {
                        document.getElementById('sollicitatie')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className="w-full sm:w-auto mt-4"
                  >
                    Solliciteer voor deze functie
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Form */}
          {selectedJob && (
            <Card className="bg-muted border-none" id="sollicitatie">
              <CardHeader>
                <CardTitle className="text-2xl">Solliciteer nu</CardTitle>
                <p className="text-muted-foreground">
                  Vul onderstaand formulier in om te solliciteren voor{" "}
                  {jobs.find((j) => j.id === selectedJob)?.title}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Naam *
                    </label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Je volledige naam"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="je.email@voorbeeld.be"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefoonnummer (optioneel)
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+32 xxx xx xx xx"
                    />
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium mb-2">
                      Korte motivatie of bericht *
                    </label>
                    <Textarea
                      id="motivation"
                      required
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Vertel ons waarom je bij Hezo wilt werken..."
                      rows={6}
                    />
                  </div>

                  <div className="bg-background p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Upload je CV (pdf, docx)</p>
                    <Input 
                      type="file" 
                      accept=".pdf,.docx" 
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacy}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, privacy: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      Ik ga akkoord met de verwerking van mijn gegevens volgens het privacybeleid
                      van Hezo.
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Verzenden..." : "Verstuur je sollicitatie"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setSelectedJob(null)}
                    >
                      Annuleren
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vacatures;
