import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Users, CheckCircle, Calculator } from "lucide-react";
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
    title: "Plan een vrijblijvend gesprek",
    description:
      "Vul het contactformulier in. We nemen snel contact met je op om een persoonlijk gesprek in te plannen op een moment dat jou past.",
    icon: MessageCircle,
    color: "bg-light-blue/10 text-light-blue border-light-blue/20",
  },
  {
    number: "2",
    title: "Kennismakingsgesprek",
    description:
      "We lichten de samenwerking toe, beantwoorden je vragen en maken een simulatie op maat. Zo zie je meteen de concrete impact voor jouw praktijk.",
    icon: Users,
    color: "bg-coral/10 text-coral border-coral/20",
  },
  {
    number: "3",
    title: "Starten met Hezo",
    description:
      "Beslis je om te starten? Dan begeleiden we je bij de administratieve stappen en zorgen we dat de aansluiting vlot verloopt. Geen druk, geen verplichtingen.",
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
      "Nee. Je hoeft geen patiënten aan te brengen om aan te sluiten bij Hezo. Hezo helpt om zorgvragen te koppelen aan verpleegkundigen in hun regio. Afhankelijk van jouw beschikbaarheid en werkgebied worden nieuwe patiënten aan jou voorgesteld.",
  },
  {
    question: "Hoe werkt de patiënteninstroom?",
    answer:
      "Hezo koppelt zorgvragen aan zelfstandige verpleegkundigen in hun regio. Daarbij houden we rekening met jouw werkgebied, beschikbaarheid en manier van werken.",
  },
  {
    question: "Kan ik aansluiten als startende zelfstandige verpleegkundige?",
    answer:
      "Ja. Ook startende zelfstandigen sluiten aan. We bekijken samen hoe Hezo je ondersteunt bij de opstart van je activiteit.",
  },
  {
    question: "Ik werk al langer als zelfstandige. Heeft aansluiten dan nog zin?",
    answer:
      "Ja. Veel ervaren verpleegkundigen sluiten aan voor administratieve ondersteuning, om hun patiëntenbestand aan te vullen of om deel uit te maken van een netwerk van collega's.",
  },
  {
    question: "Ik werk al samen met andere verpleegkundigen. Kan dat blijven?",
    answer:
      "Ja. Bestaande samenwerkingen blijven behouden. We bekijken samen hoe Hezo aansluit bij jouw huidige manier van werken.",
  },
  {
    question: "Kunnen ook praktijken aansluiten bij Hezo?",
    answer:
      "Ja. Ook praktijken met meerdere zelfstandige verpleegkundigen sluiten aan bij Hezo. Tijdens het kennismakingsgesprek bekijken we samen hoe de samenwerking het best wordt georganiseerd voor jullie praktijk.",
  },
  {
    question: "Welke ondersteuning krijg ik van Hezo?",
    answer:
      'Hezo ondersteunt zelfstandige verpleegkundigen met patiënteninstroom, administratieve ondersteuning, opleidingen en een netwerk van collega\'s. Meer info vind je op onze pagina "Ons aanbod".',
    link: { text: "Bekijk ons aanbod", href: "/wat-we-doen/" },
  },
  {
    question: "Hoe snel kan ik aansluiten bij Hezo?",
    answer:
      "Na je aanvraag plannen we een vrijblijvend kennismakingsgesprek. Daarna bekijken we welke stappen nodig zijn en begeleiden we je bij de administratie.",
  },
  {
    question: "Wat kost aansluiten bij Hezo?",
    answer:
      "Tijdens het vrijblijvend kennismakingsgesprek leggen we transparant uit hoe de samenwerking werkt en welke abonnementsformules er zijn. We maken ook een simulatie op maat, gebaseerd op jouw omzet en situatie. Zo weet je vooraf precies wat de financiële impact is, in duidelijke cijfers en zonder verrassingen achteraf.",
  },
  {
    question: "Wat verdien en betaal ik bij Hezo?",
    answer:
      "Je betaalt een transparante fee, afgestemd op de grootte van je praktijk. Daarbovenop krijg je gratis software voor je verpleegkundige activiteiten (de kosten nemen wij voor onze rekening), behoud je al je premies (waaronder de volledige telematicapremie van € 800 per verpleegkundige en opleidingspremies), en groeit je praktijk elke maand met extra patiënten zonder extra inspanning.",
  },
  {
    question: "Hoe verloopt de samenwerking concreet?",
    answer:
      "Tijdens het vrijblijvend kennismakingsgesprek leggen we duidelijk uit hoe de samenwerking verloopt en welke ondersteuning je krijgt. Zo weet je precies waar je aan toe bent.",
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
                Of je nu start als zelfstandige of al langer actief bent: het
                aansluitproces is eenvoudig en afgestemd op jouw situatie. Elk gesprek is volledig vrijblijvend.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link to="/contact/">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Plan je vrijblijvend gesprek
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact/">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  Vraag je simulatie aan
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wat betekent samenwerken met Hezo voor jou? */}
      <section className="py-20 bg-muted/30">
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
              Wat betekent samenwerken met Hezo voor jou?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
            >
              Duidelijke afspraken, directe meerwaarde voor jouw praktijk.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-border p-8 sm:p-10 mb-8"
            >
              <ul className="space-y-5">
                {[
                  {
                    title: "Transparante fee",
                    desc: "een vaste, duidelijke vergoeding afgestemd op de grootte van je praktijk. Geen verborgen kosten.",
                  },
                  {
                    title: "Software inbegrepen",
                    desc: "alle software die je nodig hebt voor je verpleegkundige activiteiten zit in het pakket. Wij dragen de kosten.",
                  },
                  {
                    title: "Je premies blijven volledig van jou",
                    desc: "je behoudt de volledige telematicapremie van € 800 per verpleegkundige en alle andere premies waar je recht op hebt, zoals opleidingspremies.",
                  },
                  {
                    title: "Patiënten via Hezo",
                    desc: "je praktijk groeit elke maand met nieuwe patiënten uit jouw regio, zonder dat je daar zelf moeite voor moet doen.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green mt-1 shrink-0" />
                    <span className="text-foreground">
                      <span className="font-semibold">{item.title}:</span>{" "}
                      <span className="text-muted-foreground">{item.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Subblok: investering met directe waarde */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="bg-secondary/5 border border-secondary/15 rounded-2xl p-8 sm:p-10 mb-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Een duidelijke investering, met directe waarde
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                De fee die je bij Hezo betaalt, is rechtstreeks gekoppeld aan wat je terugkrijgt:
                persoonlijke ondersteuning, alle benodigde software en een continue instroom van
                nieuwe patiënten in jouw regio.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Je staat er bovendien niet alleen voor: we ondersteunen je persoonlijk en helpen je
                met administratie en opleiding.
              </p>
            </motion.div>

            {/* Simulatieblok */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="bg-card rounded-2xl border-2 border-secondary/20 p-8 sm:p-10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-5">
                <Calculator className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Wil je weten wat dit voor jouw praktijk betekent?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                Tijdens het vrijblijvend kennismakingsgesprek maken we een simulatie op maat,
                gebaseerd op jouw omzet en situatie. Zo krijg je vooraf een duidelijk beeld van de
                financiële impact, in concrete cijfers en zonder verrassingen achteraf.
              </p>
              <Link to="/contact/">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Vraag een simulatie op maat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
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
              Interesse? Zo eenvoudig start je
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
            >
              Aansluiten bij Hezo is eenvoudig en vrijblijvend. Na je aanvraag nemen we contact met
              je op om te bekijken wat Hezo concreet voor jouw praktijk kan betekenen.
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
                    {i < stepsData.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-border" />
                    )}
                    <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow relative z-10 h-full">
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

            {/* Trust line */}
            <motion.p
              custom={5}
              variants={fadeUp}
              className="text-center text-muted-foreground mt-12 italic"
            >
              Praktijken die met Hezo werken, winnen tijd en krijgen meer structuur.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
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
              Klaar om te starten?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-lg text-muted-foreground mb-8"
            >
              Neem contact op voor een vrijblijvend kennismakingsgesprek en ontdek hoe Hezo jou
              ondersteunt.
            </motion.p>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link to="/contact/">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Plan je vrijblijvend gesprek
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact/">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  Vraag je simulatie aan
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
