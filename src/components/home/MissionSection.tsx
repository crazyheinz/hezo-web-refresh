import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Clock, Sprout, Building2 } from "lucide-react";

const autonomyItems = [
  "Je behoudt je eigen identiteit",
  "Je behoudt je patiëntenbestand",
  "Je organiseert je eigen werking",
  "Je kiest zelf met wie je samenwerkt",
];

const cards = [
  {
    icon: Stethoscope,
    title: "Werk je als zelfstandig thuisverpleegkundige?",
    description:
      "Je combineert dagelijks zorg met administratie, planning en facturatie. Dat vraagt veel energie. Hezo neemt een deel van die last weg zodat jij je kan concentreren op wat je het beste doet: zorgen voor je patiënten.",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
    href: "/onze-diensten/",
  },
  {
    icon: Clock,
    title: "Werk je in bijberoep?",
    description:
      "Als je verpleegkunde combineert met een andere job, heb je nog minder tijd voor opvolging en organisatie. Hezo helpt je om je activiteit overzichtelijk en haalbaar te houden.",
    color: "bg-light-blue/10",
    iconColor: "text-light-blue",
    href: "/onze-diensten/",
  },
  {
    icon: Sprout,
    title: "Start je als zelfstandig thuisverpleegkundige?",
    description:
      "Er komt veel op je af bij de opstart. Wij helpen je stap voor stap zodat je een duidelijke basis hebt en niets over het hoofd ziet.",
    color: "bg-green/10",
    iconColor: "text-green",
    href: "/blog/zelfstandig-thuisverpleegkundige-worden/",
  },
  {
    icon: Building2,
    title: "Heb je al een praktijk of wil je uitbreiden?",
    description:
      "Dan wil je vooral structuur, efficiëntie en stabiliteit. Hezo helpt je om je praktijk verder te optimaliseren en gericht te laten groeien.",
    color: "bg-coral/10",
    iconColor: "text-coral",
    href: "/zo-sluit-je-aan/",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const MissionSection = () => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="container mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Je blijft volledig zelfstandig */}
        <motion.div
          variants={fadeUp}
          className="max-w-2xl mx-auto mb-20 bg-gradient-to-br from-secondary/5 via-light-blue/5 to-transparent border border-secondary/15 rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-foreground text-center mb-5">
            Je blijft volledig zelfstandig
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {autonomyItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-card/60 rounded-xl px-4 py-3"
              >
                <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                <span className="text-sm sm:text-base text-foreground/80">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Voor wie is Hezo? */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center tracking-tight"
        >
          Voor wie is Hezo?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-lg sm:text-xl leading-relaxed text-center max-w-2xl mx-auto mb-12"
        >
          Hezo is er voor zelfstandige thuisverpleegkundigen die hun werk goed willen organiseren en hun praktijk verder willen uitbouwen.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          {cards.map((card, i) => (
            <Link key={i} to={card.href}>
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl border border-border/60 bg-card p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.color} mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MissionSection;
