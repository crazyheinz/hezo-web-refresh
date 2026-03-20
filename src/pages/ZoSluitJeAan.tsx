import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stepsData = [
  {
    number: "1",
    title: "Laat je gegevens achter",
    description:
      "Vul het contactformulier in. We nemen snel contact met je op om kennis te maken en jouw situatie te bespreken.",
    icon: MessageCircle,
    color: "bg-light-blue/10 text-light-blue border-light-blue/20",
  },
  {
    number: "2",
    title: "Kennismakingsgesprek",
    description:
      "Tijdens een persoonlijk gesprek bekijken we hoe Hezo jou het best kan ondersteunen en beantwoorden we al je vragen.",
    icon: Users,
    color: "bg-coral/10 text-coral border-coral/20",
  },
  {
    number: "3",
    title: "Aansluiten bij Hezo",
    description:
      "Beslis je om aan te sluiten? Dan begeleiden we je bij de administratieve stappen en zorgen we dat de aansluiting vlot verloopt.",
    icon: CheckCircle,
    color: "bg-green/10 text-green border-green/20",
  },
];

const faqData = [
  {
    question: "Kan ik mijn autonomie als zelfstandige behouden?",
    answer:
      "Ja. Bij Hezo blijf je volledig zelfstandig. Je behoudt de regie over je planning, je patiënten en je manier van werken.",
  },
  {
    question: "Moet ik zelf patiënten aanbrengen om aan te sluiten?",
    answer:
      "Nee. Je hoeft geen patiënten aan te brengen om aan te sluiten bij Hezo. Hezo helpt om zorgvragen te koppelen aan verpleegkundigen in hun regio. Afhankelijk van jouw beschikbaarheid en werkgebied kunnen nieuwe patiënten aan jou worden voorgesteld.",
  },
  {
    question: "Hoe werkt de patiënteninstroom?",
    answer:
      "Hezo helpt zorgvragen te koppelen aan zelfstandige verpleegkundigen in hun regio. Daarbij wordt rekening gehouden met jouw werkgebied, beschikbaarheid en manier van werken.",
  },
  {
    question: "Kan ik aansluiten als startende zelfstandige verpleegkundige?",
    answer:
      "Ja. Ook startende zelfstandigen kunnen aansluiten. We bekijken samen hoe Hezo je kan ondersteunen bij de opstart van je activiteit.",
  },
  {
    question: "Ik werk al langer als zelfstandige. Heeft aansluiten dan nog zin?",
    answer:
      "Ja. Veel ervaren verpleegkundigen sluiten aan om administratieve ondersteuning te krijgen, hun patiëntenbestand aan te vullen of deel uit te maken van een netwerk van collega's.",
  },
  {
    question: "Ik werk al samen met andere verpleegkundigen. Kan dat blijven?",
    answer:
      "Ja. Samenwerkingen met andere verpleegkundigen kunnen gewoon blijven bestaan. We bekijken samen hoe Hezo het best kan aansluiten bij jouw huidige manier van werken.",
  },
  {
    question: "Kunnen ook praktijken aansluiten bij Hezo?",
    answer:
      "Ja. Ook praktijken met meerdere zelfstandige verpleegkundigen kunnen aansluiten bij Hezo. Tijdens het kennismakingsgesprek bekijken we samen hoe de samenwerking het best kan worden georganiseerd voor jullie praktijk.",
  },
  {
    question: "Welke ondersteuning kan ik van Hezo verwachten?",
    answer:
      'Hezo ondersteunt zelfstandige verpleegkundigen onder andere met patiënteninstroom, administratieve ondersteuning, opleidingen en een netwerk van collega\'s. Meer info vind je op onze pagina "Ons aanbod".',
    link: { text: "Bekijk ons aanbod", href: "/onze-diensten/" },
  },
  {
    question: "Hoe snel kan ik aansluiten bij Hezo?",
    answer:
      "Na je aanvraag nemen we contact met je op voor een kennismakingsgesprek. Daarna bekijken we samen welke stappen nodig zijn om de aansluiting in orde te brengen en begeleiden we je bij de administratieve stappen.",
  },
  {
    question: "Wat kost aansluiten bij Hezo?",
    answer:
      "Tijdens het kennismakingsgesprek leggen we transparant uit hoe de samenwerking werkt en welke abonnementformules er zijn. Zo weet je vooraf precies waar je aan toe bent.",
  },
  {
    question: "Hoe verloopt de samenwerking concreet?",
    answer:
      "Tijdens het kennismakingsgesprek leggen we duidelijk uit hoe de samenwerking verloopt en welke ondersteuning je kan verwachten. Zo weet je precies waar je aan toe bent.",
  },
];

const ZoSluitJeAan = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Aansluiten bij Hezo | In 4 stappen van start"
        description="Sluit je aan bij Hezo en ontvang direct patiënten, administratieve ondersteuning en persoonlijke begeleiding. Vraag vandaag nog een gesprek aan →"
        path="/zo-sluit-je-aan"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Sluit aan bij Hezo",
          description:
            "Sluit je aan bij Hezo en werk als zelfstandige thuisverpleegkundige met meer ondersteuning en overzicht.",
          url: "https://www.hezo.be/zo-sluit-je-aan/",
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Sluit eenvoudig aan bij Hezo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-xl sm:text-2xl text-secondary font-medium mb-8"
            >
              Maak deel uit van ons netwerk voor zelfstandige thuisverpleegkundigen
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 space-y-4"
            >
              <p>
                Sluit je aan bij Hezo en werk als zelfstandige thuisverpleegkundige met meer
                ondersteuning en overzicht.
              </p>
              <p>
                Wij zorgen voor een gerichte patiënteninstroom en praktische ondersteuning achter de
                schermen, terwijl jij de volledige autonomie behoudt over je werk en je patiënten.
              </p>
              <p>
                Of je nu start als zelfstandige, je patiëntenbestand wil uitbreiden of al langer
                actief bent: het aansluitproces is eenvoudig en afgestemd op jouw situatie.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <Link to="/contact/">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Vraag een kennismakingsgesprek aan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4"
            >
              Interesse? Zo gaan we te werk
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
            >
              Aansluiten bij Hezo is eenvoudig en vrijblijvend. Na je aanvraag nemen we contact met
              je op om samen te bekijken of Hezo bij jouw situatie past.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {stepsData.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    custom={i + 2}
                    variants={fadeUp}
                    className="relative group"
                  >
                    {/* Connector line */}
                    {i < stepsData.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-border" />
                    )}
                    <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl ${step.color} border flex items-center justify-center mx-auto mb-6`}
                      >
                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                      <div className="text-sm font-semibold text-secondary mb-2">
                        Stap {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kosten */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
            >
              Kosten en lidmaatschap
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg text-muted-foreground mb-8"
            >
              Bij Hezo werken we met duidelijke en transparante afspraken.
            </motion.p>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-border p-8 sm:p-10 text-left"
            >
              <p className="text-muted-foreground mb-6">
                Tijdens het kennismakingsgesprek leggen we helder uit:
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "hoe de samenwerking praktisch verloopt",
                  "welke ondersteuning je kan verwachten",
                  "welke abonnementformules en fees er zijn",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-medium">
                Zo weet je vooraf precies waar je aan toe bent.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
            >
              Veelgestelde vragen
            </motion.h2>

            <motion.div custom={1} variants={fadeUp}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqData.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                      {faq.link && (
                        <Link
                          to={faq.link.href}
                          className="inline-flex items-center gap-1 text-secondary font-medium hover:underline mt-2"
                        >
                          {faq.link.text}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
            >
              Klaar om aan te sluiten?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg text-muted-foreground mb-8"
            >
              Neem contact op voor een vrijblijvend kennismakingsgesprek en ontdek hoe Hezo jou kan
              ondersteunen.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <Link to="/contact/">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Vraag een kennismakingsgesprek aan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ZoSluitJeAan;
