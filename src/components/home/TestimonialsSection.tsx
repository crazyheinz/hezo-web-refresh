import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Dankzij Hezo kan ik me focussen op mijn patiënten. De administratie wordt voor mij opgepakt, dat scheelt enorm.",
    name: "Verpleegkundige",
    role: "Zelfstandig thuisverpleegkundige",
  },
  {
    quote: "Toen ik mijn eigen praktijk startte, kwam er veel op me af. Hezo hielp me om alles snel op de rails te krijgen.",
    name: "Starter",
    role: "Zelfstandig thuisverpleegkundige",
  },
  {
    quote: "Via het netwerk krijg ik patiënten uit mijn regio. Dat geeft rust en helpt om mijn praktijk stabiel uit te bouwen.",
    name: "Ervaren verpleegkundige",
    role: "Zelfstandig thuisverpleegkundige",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
            >
              Wat verpleegkundigen zeggen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
              Echte ervaringen van zelfstandige thuisverpleegkundigen in het Hezo-netwerk.
            </motion.p>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.25 } }}>
                <Card className="border shadow-sm h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: -10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Quote className="h-8 w-8 text-light-blue mb-4" strokeWidth={1.5} />
                    </motion.div>
                    <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
