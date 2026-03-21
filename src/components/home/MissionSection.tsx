import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, HeartHandshake, Building2 } from "lucide-react";

const cards = [
  {
    icon: HeartHandshake,
    title: "Zoek je extra ondersteuning?",
    description:
      "Groeien of simpelweg je werkdruk verlagen? Wij ontzorgen jou en je praktijk.",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
    href: "/onze-diensten/",
  },
  {
    icon: Sprout,
    title: "Start je net als zelfstandige thuisverpleegkundige?",
    description:
      "Er komt veel op je af bij je opstart. Wij zetten je op het juiste spoor.",
    color: "bg-green/10",
    iconColor: "text-green",
    href: "/blog/zelfstandig-thuisverpleegkundige-worden/",
  },
  {
    icon: Building2,
    title: "Start je een eigen praktijk?",
    description:
      "Een praktijk opzetten vraagt structuur. Wij bieden de juiste omkadering.",
    color: "bg-coral/10",
    iconColor: "text-coral",
    href: "/onze-diensten/#begeleiding",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
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
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center tracking-tight"
        >
          Voor wie is Hezo?
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center mb-6"
        >
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Hezo is er voor iedere zelfstandige verpleegkundige die zich elke dag
            met hart en ziel inzet voor patiënten. Maar administratie en
            facturatie nemen steeds meer tijd in beslag.
          </p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-lg sm:text-xl leading-relaxed text-center max-w-2xl mx-auto mb-4"
        >
          Hezo helpt je die druk te verminderen. Zo hou je meer tijd over voor
          wat er echt toe doet: zorgen voor patiënten.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base text-foreground/70 italic text-center max-w-xl mx-auto mb-16 border-l-2 border-secondary/40 pl-4"
        >
          Je blijft volledig zelfstandig werken: je organiseert je eigen
          praktijk, behoudt je patiëntenbestand en kiest zelf met wie je
          samenwerkt.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
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
