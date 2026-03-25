import { Link } from "react-router-dom";
import { Users, GraduationCap, FileCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: FileCheck,
    title: "Administratie & ondersteuning",
    description: "Ontdek hoe wij jou ontzorgen. Betrouwbare opvolging en digitaal overzicht.",
    href: "/onze-diensten/#administratie",
    blogHref: "/blog/administratie-thuisverpleging/",
    blogLabel: "Lees meer over administratie",
  },
  {
    icon: Users,
    title: "Instroom van patiënten",
    description: "Vind sneller nieuwe patiënten via het brede netwerk van Welzijnsgroep Helan.",
    href: "/onze-diensten/#instroom",
    blogHref: "/blog/patienten-thuisverpleegkundige/",
    blogLabel: "Lees meer over patiënten vinden",
  },
  {
    icon: Headphones,
    title: "Persoonlijke begeleiding",
    description: "Krijg advies op jouw maat. Zelfstandig, maar nooit alleen.",
    href: "/onze-diensten/#begeleiding",
    blogHref: "/blog/zelfstandig-thuisverpleegkundige-worden/",
    blogLabel: "Lees het stappenplan",
  },
  {
    icon: GraduationCap,
    title: "Opleiding & groei",
    description: "Versterk je vaardigheden en netwerk. Opleidingen op jouw tempo.",
    href: "/onze-diensten/#opleiding",
    blogHref: "/blog/hbo5-graduaat-basisverpleegkunde/",
    blogLabel: "Lees meer over HBO5 → graduaat",
  },
];

const colorSchemes = [
  { iconBg: "bg-primary", iconColor: "text-primary-foreground", border: "hover:border-primary/50" },
  { iconBg: "bg-light-blue", iconColor: "text-light-blue-foreground", border: "hover:border-light-blue/50" },
  { iconBg: "bg-yellow", iconColor: "text-yellow-foreground", border: "hover:border-yellow/50" },
  { iconBg: "bg-green", iconColor: "text-green-foreground", border: "hover:border-green/50" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const USPSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
            >
              Wat Hezo voor jou kan betekenen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
              Met Hezo blijft je focus waar die hoort: bij je patiënten.
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <Link key={index} to={feature.href} className="block">
                  <motion.div variants={cardVariants} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                    <Card className={`border-2 border-transparent ${colorScheme.border} shadow-sm hover:shadow-md transition-all h-full cursor-pointer`}>
                      <CardContent className="pt-6">
                        <motion.div
                          className="mb-4"
                          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                        >
                          <div className={`inline-flex p-3 rounded-lg ${colorScheme.iconBg}`}>
                            <Icon className={`h-8 w-8 ${colorScheme.iconColor}`} strokeWidth={1.5} />
                          </div>
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          {feature.description}
                        </p>
                        <Link to={feature.blogHref} className="text-sm font-medium text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                          {feature.blogLabel} →
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;
