import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Layers, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const OpleidingSection = () => {
  return (
    <section id="opleiding" className="scroll-mt-40 py-20 bg-green/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green/10">
                <GraduationCap className="h-8 w-8 text-green" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Opleiding en groei
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
              De thuisverpleging staat niet stil. Richtlijnen veranderen, nieuwe technieken worden geïntroduceerd en de verwachtingen binnen de zorgsector evolueren.
            </motion.p>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-12">
              Bij Hezo ondersteunen we zelfstandige verpleegkundigen met gerichte opleidingen en bijscholing, zodat je mee bent met wat belangrijk is in je dagelijkse praktijk.
            </motion.p>

            {/* Bijscholing */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green/10">
                  <BookOpen className="h-6 w-6 text-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Bijscholing op jouw tempo
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Elke praktijk is anders. Daarom bieden we opleidingen aan die aansluiten bij jouw ritme en noden.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Via het Hezo-platform kan je kiezen uit:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 mb-4">
                <li>korte online modules</li>
                <li>praktijkgerichte sessies in kleine groepen</li>
                <li>workshops rond actuele thema's in de thuisverpleging</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                De focus ligt op toepasbare kennis. Wat je leert, kan je meteen gebruiken in je zorgverlening.
              </p>
            </motion.div>

            {/* Vakkennis */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green/10">
                  <Layers className="h-6 w-6 text-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Van vakkennis tot praktijkorganisatie
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Onze opleidingen voor zelfstandige verpleegkundigen gaan verder dan louter technische thema's.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Je kan bij ons terecht voor bijscholing rond:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 mb-4">
                <li>wondzorg, hygiëne en nomenclatuur</li>
                <li>communicatie met patiënten en zorgpartners</li>
                <li>samenwerking binnen een praktijk</li>
                <li>praktijkorganisatie en efficiënt werken</li>
                <li>zelfzorg en duurzaam ondernemen in de zorg</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Zo versterken we niet alleen je klinische expertise, maar ook de manier waarop je je praktijk organiseert.
              </p>
            </motion.div>

            {/* Leren in verbinding */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green/10">
                  <Users className="h-6 w-6 text-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Leren in verbinding
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Bijleren doe je niet alleen.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Binnen het netwerk van Hezo ontmoet je andere zelfstandige thuisverpleegkundigen. Je wisselt ervaringen uit, bespreekt praktijksituaties en leert van elkaar.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Dat zorgt voor gedeelde kennis en voor een sterker professioneel netwerk.
              </p>
              <Link to="/blog/hbo5-graduaat-basisverpleegkunde/" className="inline-flex items-center text-green hover:underline font-medium">
                Lees meer over de hervorming van HBO5 naar graduaat Basisverpleegkunde →
              </Link>
            </motion.div>

            {/* CTA naar opleidingen */}
            <motion.div variants={fadeUp} className="mt-8 text-center">
              <Link to="/opleidingen/">
                <Button size="lg" className="bg-green text-green-foreground hover:bg-green/90">
                  Bekijk ons opleidingsaanbod <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OpleidingSection;
