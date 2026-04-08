import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const benefits = [
  "Minder tijd kwijt aan administratie en facturatie",
  "Correcte verwerking van je prestaties en attesten",
  "Een stabiele instroom van patiënten via het netwerk van Helan",
  "Meer overzicht en rust in je dagelijkse werking",
  "Persoonlijke ondersteuning, afgestemd op jouw situatie",
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

const USPSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto"
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

          <motion.p variants={fadeUp} className="text-lg text-foreground font-medium leading-relaxed mb-10">
            Hezo helpt je om dat anders aan te pakken, zonder dat je je zelfstandigheid verliest.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-10">
            <h3 className="text-xl font-semibold text-foreground mb-5">
              Met Hezo kan je rekenen op:
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                    <Check className="w-3 h-3 text-secondary-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/contact/">Plan een kennismakingsgesprek</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;
