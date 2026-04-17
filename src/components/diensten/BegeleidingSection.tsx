import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Headphones, Rocket, Users2, Building2 } from "lucide-react";
import begeleidingImg from "@/assets/diensten-begeleiding.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const BegeleidingSection = () => {
  return (
    <section id="begeleiding" className="scroll-mt-40 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Two-column: illustration left, text right (alternating from Instroom) */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
              <motion.div
                variants={fadeUp}
                className="flex justify-center order-2 lg:order-1"
              >
                <motion.img
                  src={begeleidingImg}
                  alt="Ervaren verpleegkundige begeleidt collega"
                  className="w-full max-w-md rounded-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div className="order-1 lg:order-2">
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-yellow/10">
                    <Headphones className="h-8 w-8 text-yellow" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Begeleiding bij je start als zelfstandig verpleegkundige
                  </h2>
                </motion.div>

                <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Zelfstandig thuisverpleegkundige zijn betekent verantwoordelijkheid opnemen. Voor je patiënten, voor je planning, voor je praktijk.
                </motion.p>

                <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                  Bij Hezo sta je er niet alleen voor. We bieden persoonlijke begeleiding voor zelfstandige thuisverpleegkundigen: of je nu net start, al jaren zelfstandig werkt of een praktijk runt: je kan rekenen op advies, ondersteuning en een luisterend oor.
                </motion.p>
              </div>
            </div>

            {/* Cards in a two-column grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Ondersteuning block */}
              <motion.div
                variants={fadeUp}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-yellow/10">
                    <Users2 className="h-6 w-6 text-yellow" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Ondersteuning voor zelfstandige verpleegkundigen
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
                    <span>hoe je je werking efficiënter kan organiseren</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Soms heb je gewoon nood aan een klankbord. Iemand die meekijkt, meedenkt en meezoekt naar oplossingen.
                </p>
              </motion.div>

              {/* Starter block */}
              <motion.div
                variants={fadeUp}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-yellow/10">
                    <Rocket className="h-6 w-6 text-yellow" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Praktische opstart als zelfstandige
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Starten als zelfstandige brengt vragen met zich mee. We begeleiden je stap voor stap:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 mb-4">
                  <li>ondersteuning bij je administratieve opstart</li>
                  <li>samenwerking met Xerius voor je statuut en verzekeringen</li>
                  <li>advies bij keuze en koppeling van software</li>
                  <li>praktische checklists zodat je niets over het hoofd ziet</li>
                </ul>
                <Link to="/blog/zelfstandig-thuisverpleegkundige-worden/" className="inline-flex items-center text-yellow hover:underline font-medium">
                  Lees ons stappenplan →
                </Link>
              </motion.div>
            </div>

            {/* Praktijk block — full width */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow/10">
                  <Building2 className="h-6 w-6 text-yellow" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Begeleiding bij het opstarten of uitbouwen van een praktijk
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Een eigen praktijk opstarten of uitbreiden brengt andere vragen met zich mee. Hezo ondersteunt verpleegkundigen die een praktijk willen opbouwen of verder laten groeien.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1.5">
                <li>structuur en organisatie van je praktijk</li>
                <li>administratie en facturatieprocessen</li>
                <li>ondersteuning bij patiënteninstroom</li>
                <li>samenwerking met andere verpleegkundigen</li>
                <li>praktische vragen rond planning, software en werking</li>
              </ul>
              <Link to="/blog/werk-privebalans-thuisverpleegkundige/" className="inline-flex items-center text-yellow hover:underline font-medium mt-4">
                Ontdek hoe je meer werk-privébalans creëert →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BegeleidingSection;
