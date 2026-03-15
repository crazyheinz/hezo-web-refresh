import { motion } from "framer-motion";
import { Headphones, Rocket, Users2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const BegeleidingSection = () => {
  return (
    <section id="begeleiding" className="scroll-mt-40 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-yellow/10">
                <Headphones className="h-8 w-8 text-yellow" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Persoonlijke begeleiding
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
              Zelfstandig thuisverpleegkundige zijn betekent verantwoordelijkheid opnemen. Voor je patiënten, voor je planning, voor je praktijk.
            </motion.p>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-12">
              Bij Hezo sta je er niet alleen voor. We bieden persoonlijke begeleiding voor zelfstandige thuisverpleegkundigen: of je nu net start, al jaren zelfstandig werkt of een praktijk runt: je kan rekenen op advies, ondersteuning en een luisterend oor.
            </motion.p>

            {/* Starter block */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow/10">
                  <Rocket className="h-6 w-6 text-yellow" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Begeleiding bij de start als zelfstandige verpleegkundige
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Starten als zelfstandige brengt vragen met zich mee. Wat moet je administratief in orde brengen? Welke verzekeringen heb je nodig? Welke software gebruik je voor planning en facturatie?
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We begeleiden je stap voor stap:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 mb-4">
                <li>ondersteuning bij je administratieve opstart</li>
                <li>samenwerking met Xerius voor je zelfstandigenstatuut en verzekeringen</li>
                <li>advies bij keuze en koppeling van software</li>
                <li>praktische checklists zodat je niets over het hoofd ziet</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Zo kan je met vertrouwen starten als zelfstandige thuisverpleegkundige, zonder dat papierwerk of onzekerheid je afremt.
              </p>
            </motion.div>

            {/* Ervaren block */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow/10">
                  <Users2 className="h-6 w-6 text-yellow" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Ondersteuning voor zelfstandige verpleegkundigen alleen of in een praktijk
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We denken met je mee over:
              </p>
              <ul className="space-y-1.5 text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow mt-1.5">•</span>
                  <span>de organisatie van je zorg</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow mt-1.5">•</span>
                  <span>administratieve vragen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow mt-1.5">•</span>
                  <span>communicatie met patiënten of partners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow mt-1.5">•</span>
                  <span>hoe je je werking eenvoudiger of efficiënter kan organiseren</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Soms heb je gewoon nood aan een klankbord. Iemand die meekijkt, meedenkt en meezoekt naar oplossingen. We sluiten aan bij hoe jij werkt en respecteren je autonomie als zelfstandige verpleegkundige.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BegeleidingSection;
