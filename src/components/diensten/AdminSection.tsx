import { motion } from "framer-motion";
import { FileText, CheckCircle, Receipt, Wallet, Monitor, HeadphonesIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const usps = [
  {
    icon: CheckCircle,
    title: "Correcte verwerking van je prestaties",
    text: "We waken erover dat elke prestatie juist wordt geregistreerd en verwerkt.",
    detail: "Facturen worden tijdig bezorgd aan de mutualiteiten. Als er een weigering of correctie is, bekijken we wat nodig is en nemen we dit mee op. Je staat er niet alleen voor wanneer iets onduidelijk is.",
  },
  {
    icon: Receipt,
    title: "Zorgvuldige opvolging van remgeld en supplementen",
    text: "Ook de administratieve opvolging richting patiënten nemen we op.",
    detail: "We houden rekening met verhoogde tegemoetkoming en de maximumfactuur (MAF), zodat patiënten nooit meer betalen dan wettelijk voorzien. Jij ontvangt je vergoedingen correct en overzichtelijk via onze centrale uitbetalingen.",
  },
  {
    icon: Wallet,
    title: "Duidelijke uitbetalingen",
    text: "Je vergoedingen worden tijdig uitbetaald, met een helder overzicht van je prestaties.",
    detail: "Dat geeft rust en voorspelbaarheid. Je weet waar je aan toe bent.",
  },
  {
    icon: Monitor,
    title: "MijnHezo: veilig overzicht voor je praktijk",
    text: "Via MijnHezo krijg je toegang tot alles wat belangrijk is voor je praktijk:",
    list: [
      "prestaties en betalingen",
      "documenten en praktische sjablonen",
      "sectorinformatie en updates",
      "inschrijvingen voor opleidingen",
    ],
    detail: "Zo heb je één centrale plek die je ondersteunt in je dagelijkse werking.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ondersteuning bij software en vragen",
    text: "We werken met erkende softwarepaketten voor planning en tarificatie in de thuisverpleging.",
    detail: null,
    detailNode: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-2">Heb je vragen over facturatie, nomenclatuur of instellingen? Dan helpt onze helpdesk je verder. We nemen de tijd om mee te kijken en samen een oplossing te vinden.</p>
        <Link to="/blog/software-thuisverpleging/" className="text-secondary hover:underline font-medium">Lees meer over software in de thuisverpleging →</Link>
      </>
    ),
  },
];

const AdminSection = () => {
  return (
    <section id="administratie" className="scroll-mt-40 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-light-blue/10">
                <FileText className="h-8 w-8 text-light-blue" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Administratie & ondersteuning
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Zelfstandige thuisverpleegkundigen kunnen bij Hezo rekenen op betrouwbare administratieve ondersteuning. We volgen je prestaties op, verwerken je facturatie en zorgen voor duidelijke uitbetalingen. Zo hoef jij je niet bezig te houden met wat tijd en energie wegneemt van je zorg.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* USP Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              {usps.map((usp, idx) => {
                const Icon = usp.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-light-blue/10 shrink-0 mt-1">
                        <Icon className="h-5 w-5 text-light-blue" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{usp.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-2">{usp.text}</p>
                        {usp.list && (
                          <ul className="list-disc pl-5 text-muted-foreground space-y-1 mb-2">
                            {usp.list.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                        <p className="text-muted-foreground leading-relaxed">{usp.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Sticky sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-44"
            >
              <div className="bg-gradient-to-br from-light-blue/10 to-secondary/5 border border-light-blue/20 rounded-2xl p-8">
                <div className="w-12 h-1 bg-light-blue rounded-full mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Meer ruimte voor evenwicht
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Wanneer administratie helder en correct verloopt, ontstaat er ruimte. Ruimte om je te focussen op je patiënten. En ruimte om je werk en privé beter in balans te houden.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
