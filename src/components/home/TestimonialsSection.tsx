import { Quote } from "lucide-react";
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

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Wat verpleegkundigen zeggen
          </h2>
          <p className="text-lg text-muted-foreground">
            Echte ervaringen van zelfstandige thuisverpleegkundigen in het Hezo-netwerk.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm h-full">
              <CardContent className="pt-6 flex flex-col h-full">
                <Quote className="h-8 w-8 text-light-blue mb-4" strokeWidth={1.5} />
                <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow italic">
                  "{testimonial.quote}"
                </blockquote>
                {/* <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
