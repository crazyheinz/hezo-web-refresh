import { Link } from "react-router-dom";
import { Users, Heart, GraduationCap, FileCheck, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Toestroom van patiënten",
    description: "Vind sneller nieuwe patiënten via het brede netwerk van Welzijnsgroep Helan.",
    section: "toestroom",
  },
  {
    icon: Heart,
    title: "Welzijn & werkplezier",
    description: "Minder administratie, meer ademruimte. Zorg voor anderen begint bij zorg voor jezelf.",
    section: "welzijn",
  },
  {
    icon: Headphones,
    title: "Persoonlijke begeleiding",
    description: "Krijg advies op jouw maat. Zelfstandig, maar nooit alleen.",
    section: "begeleiding",
  },
  {
    icon: GraduationCap,
    title: "Opleiding & groei",
    description: "Versterk je vaardigheden en netwerk. Opleidingen op jouw tempo.",
    section: "opleiding",
  },
  {
    icon: FileCheck,
    title: "Administratie & ondersteuning",
    description: "Ontdek hoe wij jou ontzorgen. Betrouwbare opvolging en digitaal overzicht.",
    section: "administratie",
  },
];

const colorSchemes = [
  { iconBg: "bg-light-blue", iconColor: "text-light-blue-foreground", border: "hover:border-light-blue/50" },
  { iconBg: "bg-coral", iconColor: "text-coral-foreground", border: "hover:border-coral/50" },
  { iconBg: "bg-yellow", iconColor: "text-yellow-foreground", border: "hover:border-yellow/50" },
  { iconBg: "bg-green", iconColor: "text-green-foreground", border: "hover:border-green/50" },
  { iconBg: "bg-primary", iconColor: "text-primary-foreground", border: "hover:border-primary/50" },
];

const USPSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Wat Hezo voor jou kan betekenen
            </h2>
            <p className="text-lg text-muted-foreground">
              Met Hezo blijft je focus waar die hoort: bij je patiënten.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <Link key={index} to={`/wat-we-doen/#${feature.section}`} className="block">
                  <Card className={`border-2 border-transparent ${colorScheme.border} shadow-sm hover:shadow-md transition-all h-full cursor-pointer hover:scale-105`}>
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <div className={`inline-flex p-3 rounded-lg ${colorScheme.iconBg}`}>
                          <Icon className={`h-8 w-8 ${colorScheme.iconColor}`} strokeWidth={1.5} />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
