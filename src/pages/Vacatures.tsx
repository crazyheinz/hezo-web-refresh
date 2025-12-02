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
      title: "Zelfstandig Regiomanager - Gent",
      tagline: "Bouw mee aan sterke zorg in jouw regio",
      description:
        "Hezo is een netwerk van zelfstandige verpleegkundigen met ondersteuning van Helan - Welzijnsgroep. Voor de regio Gent zoeken we een zelfstandig regiomanager: een gedreven verpleegkundige met ambitie om impact te maken op zorgkwaliteit, collega's en patiënten.",
      responsibilities: [
        "Je bewaakt de continuïteit en kwaliteit van de zorg in jouw regio",
        "Je organiseert de planning en opvolging van zorgvragen binnen je team",
        "Je zorgt voor overleg tussen teamleden en andere betrokkenen",
        "Je werkt mee op beleidsniveau en denkt strategisch mee over groei en innovatie",
        "Je capteert signalen uit het werkveld en doet voorstellen ter verbetering",
        "Je zoekt nieuwe collega's die passen binnen het Hezo-verhaal",
        "Je ondersteunt startende zelfstandige verpleegkundigen in jouw regio",
      ],
      profile: [
        "Je beschikt over een diploma Verpleegkunde (HBO5, Bachelor of Master)",
        "Je bent woonachtig in of rond Gent en kan je gemakkelijk verplaatsen",
        "Je hebt ervaring in de thuisverpleging",
        "Je communiceert vlot, bent inspirerend en oplossingsgericht",
        "Je werkt zelfstandig, maar verbindt graag collega's en bewaakt kwaliteit",
      ],
      offer: [
        "Een uitdagende, veelzijdige functie met impact op zorg en organisatie",
        "Een hecht, betrokken team en ondersteuning door Hezo",
        "Begeleiding bij het uitbouwen van rondes en patiëntenbestand",
        "Ondersteuning bij het aantrekken van nieuwe teamleden",
        "Coaching en opleiding op maat van jouw ontwikkeling",
        "Transparante, correcte en tijdige uitbetaling",
        "Een aantrekkelijk en fair loonpakket",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO 
        title="Vacatures | Hezo - Werken in de Thuisverpleging"
        description="Bekijk openstaande vacatures bij Hezo. Werk als praktijkcoach of regiomanager en maak het verschil in de zorg."
        path="/vacatures"
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
