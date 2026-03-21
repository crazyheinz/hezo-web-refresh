import { motion } from "framer-motion";
import { Users, Handshake } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const InstroomSection = () => {
  return (
    <section id="instroom" className="scroll-mt-40 py-20 bg-coral/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-coral/10">
                <Users className="h-8 w-8 text-coral" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Instroom van patiënten
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-6">
              Als zelfstandige thuisverpleegkundige wil je kunnen rekenen op continuïteit: een stabiele instroom van patiënten en zorgvragen die bij jou passen.
            </motion.p>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
              Bij Hezo komt de zorgvraag rechtstreeks vanuit Welzijnsgroep Helan, die mensen begeleidt in hun zoektocht naar thuisverpleging. Vanuit dat netwerk brengen we patiënten in contact met zelfstandige verpleegkundigen binnen Hezo. We houden ook rekening met regio, expertise en beschikbaarheid.
            </motion.p>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-12">
              Dat zorgt voor een regelmatige instroom van nieuwe patiënten. En voor de mogelijkheid om je ronde rustig en evenwichtig uit te bouwen.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-coral/10">
                  <Handshake className="h-6 w-6 text-coral" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Samenwerking met zorgpartners
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Hezo werkt ook samen met huisartsen, ziekenhuizen en lokale welzijnsorganisaties.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Door die samenwerking vinden zorgvragen sneller hun weg naar de juiste zorgverlener. We verbinden mensen en organisaties rond één doel: toegankelijke en kwalitatieve zorg in de eigen omgeving van de patiënt.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstroomSection;
