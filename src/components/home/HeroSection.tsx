import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import homeHeroIllustration from "@/assets/home-hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          <div className="relative z-10 lg:pr-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Ondersteuning voor zelfstandige thuisverpleegkundigen
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-foreground mb-6">
              Wij ontzorgen zodat jij kan zorgen
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Hezo is jouw ondersteuningsnetwerk als zelfstandig thuisverpleegkundige. Krijg ondersteuning bij administratie, facturatie, patiënteninstroom en meer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
          </div>
          <motion.div
            className="relative z-0 flex justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={homeHeroIllustration}
              alt="Illustratie van een zelfstandig thuisverpleegkundige"
              className="w-full h-auto object-contain max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
