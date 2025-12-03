import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Send } from "lucide-react";
import SEO from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Privacy akkoord vereist",
        description: "Gelieve akkoord te gaan met het privacybeleid.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://kbntzeqmbigjycnatlhz.supabase.co/functions/v1/send-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Bericht verzonden!",
          description: "We nemen zo snel mogelijk contact met je op."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          privacy: false
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of mail naar info@hezo.be",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO 
        title="Contact | Hezo - Neem Contact Op"
        description="Neem contact op met Hezo voor vragen over ons netwerk voor zelfstandige thuisverpleegkundigen. Bel of mail ons."
        path="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Hezo",
          "description": "Neem contact op met Hezo",
          "url": "https://www.hezo.be/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Hezo",
            "telephone": "+32 9 265 17 20",
            "email": "info@hezo.be"
          }
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Send className="h-16 w-16 text-secondary mx-auto mb-6" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Neem contact op
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Heb je interesse om deel uit te maken van het Hezo-netwerk of heb je een vraag over
              onze werking? Laat hieronder je gegevens achter. We nemen zo snel mogelijk contact met
              je op.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                    <a href="mailto:info@Hezo.be" className="text-muted-foreground hover:text-secondary transition-colors">info@hezo.be</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefoon</h3>
                    <a href="tel:+3292651720" className="text-muted-foreground hover:text-secondary transition-colors">
                      +32 9 265 17 20
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-foreground mb-2">Hezo</h3>
                  <p className="text-muted-foreground">
                    Samen sterk in zelfstandige thuisverpleging.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-muted border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Stuur ons een bericht</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Naam *
                    </label>
                    <Input 
                      id="name" 
                      name="name"
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      placeholder="Je volledige naam" 
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-mail *
                    </label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      placeholder="je.email@voorbeeld.be" 
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefoonnummer (optioneel)
                    </label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      placeholder="+32 xxx xx xx xx" 
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Bericht *
                    </label>
                    <Textarea 
                      id="message" 
                      name="message"
                      required 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      placeholder="Vertel ons wat er op je hart ligt..." 
                      rows={6} 
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="privacy" 
                      checked={formData.privacy} 
                      onCheckedChange={checked => setFormData({...formData, privacy: checked as boolean})} 
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                      Ik ga akkoord met de verwerking van mijn gegevens volgens het privacybeleid
                      van Hezo.
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Verzenden..." : "Verstuur bericht"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
