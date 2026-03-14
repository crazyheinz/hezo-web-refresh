import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import homeNursingImage from "@/assets/home-nursing.jpg";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-2 gap-8 xl:gap-10 items-start max-w-7xl mx-auto">
          <div className="xl:pr-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Ondersteuning voor zelfstandige thuisverpleegkundigen
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-foreground mb-6">
              Wij ontzorgen zodat jij kan zorgen
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Hezo is jouw serviceplatform als zelfstandig thuisverpleegkundige. Krijg ondersteuning bij administratie, facturatie, patiënteninstroom en meer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base bg-light-blue text-light-blue-foreground hover:bg-light-blue/90">
                <Link to="/wat-we-doen/">
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
          <div className="relative">
            <img
              src={homeNursingImage}
              alt="Thuisverpleging - professionele zorg aan huis"
              className="rounded-lg shadow-2xl w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
