import { Link } from "react-router-dom";
import { ArrowRight, Users, Heart, GraduationCap, FileCheck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import homeNursingImage from "@/assets/home-nursing.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Toestroom van patiënten",
      description: "Een vlotte instroom, met zorg voor de juiste match via het Helan-netwerk.",
    },
    {
      icon: Heart,
      title: "Welzijn & werkplezier",
      description: "Minder administratie, meer ademruimte. Zorg voor anderen begint bij zorg voor jezelf.",
    },
    {
      icon: Headphones,
      title: "Persoonlijke begeleiding",
      description: "Zelfstandig, maar nooit alleen. Begeleiding die aansluit bij wat jij nodig hebt.",
    },
    {
      icon: GraduationCap,
      title: "Opleiding & groei",
      description: "Blijven groeien is de beste vorm van zorg. Opleidingen op jouw tempo.",
    },
    {
      icon: FileCheck,
      title: "Administratie & ondersteuning",
      description: "Betrouwbare opvolging en digitaal overzicht. We nemen het papierwerk over.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Hezo ondersteunt zelfstandige thuisverpleegkundigen van opstart tot groei.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We helpen met administratie, facturatie, patiënteninstroom en begeleiding, in één betrouwbaar netwerk.
              </p>
              <p className="text-base text-foreground mb-12 font-medium">
                Minder administratie. Meer zorg. Meer mens.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base bg-yellow text-yellow-foreground hover:bg-yellow/90">
                  <Link to="/wat-we-doen">
                    Ontdek wat we doen <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contact">
                    Neem contact op <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Features Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const sectionMap: { [key: string]: string } = {
                  "Toestroom van patiënten": "toestroom",
                  "Welzijn & werkplezier": "welzijn",
                  "Persoonlijke begeleiding": "begeleiding",
                  "Opleiding & groei": "opleiding",
                  "Administratie & ondersteuning": "administratie",
                };
                
                // Define color schemes for each card based on brand guidelines
                const colorSchemes = [
                  { iconBg: "bg-light-blue", iconColor: "text-light-blue-foreground", border: "hover:border-light-blue/50" },
                  { iconBg: "bg-coral", iconColor: "text-coral-foreground", border: "hover:border-coral/50" },
                  { iconBg: "bg-yellow", iconColor: "text-yellow-foreground", border: "hover:border-yellow/50" },
                  { iconBg: "bg-green", iconColor: "text-green-foreground", border: "hover:border-green/50" },
                  { iconBg: "bg-primary", iconColor: "text-primary-foreground", border: "hover:border-primary/50" },
                ];
                
                const colorScheme = colorSchemes[index % colorSchemes.length];
                
                return (
                  <Link 
                    key={index} 
                    to={`/wat-we-doen#${sectionMap[feature.title]}`}
                    className="block"
                  >
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

    </div>
  );
};

export default Home;
