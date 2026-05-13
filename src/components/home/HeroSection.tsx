import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import homeHeroIllustration from "@/assets/home-hero-illustration.png";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const HeroSection = () => {
  return (
    <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            className="relative z-10 lg:pr-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              Ondersteuning voor zelfstandige thuisverpleegkundigen
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl font-semibold text-foreground mb-6"
            >
              Wij ontzorgen zodat jij kan zorgen
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Hezo is jouw ondersteuningsnetwerk als zelfstandig thuisverpleegkundige. Krijg ondersteuning bij administratie, facturatie, patiënteninstroom en meer.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base bg-light-blue text-light-blue-foreground hover:bg-light-blue/90">
                <Link to="/onze-diensten/">
                  Meer over Hezo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/contact/">
                  Plan een kennismakingsgesprek
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative z-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.img
              src={homeHeroIllustration}
              alt="Illustratie van een zelfstandig thuisverpleegkundige"
              width={512}
              height={512}
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-contain max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
