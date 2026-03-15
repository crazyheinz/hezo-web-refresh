import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const SamenBlock = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-secondary/10 via-light-blue/5 to-coral/5 rounded-3xl p-10 sm:p-14 border border-secondary/10"
        >
          <div className="inline-flex p-3 rounded-2xl bg-secondary/10 mb-6">
            <Heart className="h-8 w-8 text-secondary" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Samen sta je sterker
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Zelfstandig werken hoeft niet alleen te betekenen dat je er alleen voor staat. Via Hezo maak je deel uit van een netwerk van collega-verpleegkundigen waar je ervaringen kan delen, vragen kan stellen en ondersteuning vindt wanneer je die nodig hebt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Zo zorgen we niet alleen voor praktische ondersteuning, maar ook voor meer rust, evenwicht en werkplezier in je dagelijkse praktijk.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SamenBlock;
