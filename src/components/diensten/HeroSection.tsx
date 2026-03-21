import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight"
          >
            Ons aanbod voor zelfstandige thuisverpleegkundigen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Een duurzame praktijk uitbouwen vraagt structuur, ondersteuning en een betrouwbaar netwerk.
            Hezo helpt zelfstandige thuisverpleegkundigen met patiënteninstroom, administratie, begeleiding en opleidingen. Zo kan je efficiënter kunnen werken en je praktijk verder kunnen uitbouwen.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
