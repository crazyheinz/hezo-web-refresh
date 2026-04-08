import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Users, GraduationCap, HeartHandshake } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Administratie & facturatie",
    description: "Correcte verwerking van je prestaties, attesten en RIZIV-facturatie.",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
    href: "/onze-diensten/#administratie",
  },
  {
    icon: Users,
    title: "Instroom van patiënten",
    description: "Een stabiele instroom via het netwerk van Helan.",
    color: "bg-light-blue/10",
    iconColor: "text-light-blue",
    href: "/onze-diensten/#instroom",
  },
  {
    icon: HeartHandshake,
    title: "Begeleiding bij je start",
    description: "Persoonlijke ondersteuning, afgestemd op jouw situatie.",
    color: "bg-green/10",
    iconColor: "text-green",
    href: "/onze-diensten/#begeleiding",
  },
  {
    icon: GraduationCap,
    title: "Bijscholing & opleiding",
    description: "Praktijkgerichte opleidingen om je kennis up-to-date te houden.",
    color: "bg-coral/10",
    iconColor: "text-coral",
    href: "/onze-diensten/#opleiding",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

const USPSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center tracking-tight"
          >
            Wat Hezo voor jou kan betekenen
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
            Als zelfstandig thuisverpleegkundige wil je je in de eerste plaats kunnen focussen op zorg. In de praktijk gaat er vaak veel tijd naar administratie, facturatie en het organiseren van je werking.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
            Je merkt misschien dat dit steeds meer begint door te wegen, terwijl je net meer ruimte wil voor je patiënten.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg text-foreground font-medium leading-relaxed">
            Hezo helpt je om dat anders aan te pakken, zonder dat je je zelfstandigheid verliest.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {services.map((service, i) => (
            <Link key={i} to={service.href}>
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h3 className="text-foreground font-semibold text-base mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;
