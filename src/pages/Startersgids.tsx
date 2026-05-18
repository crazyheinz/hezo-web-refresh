import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Download, CheckCircle2, FileText } from "lucide-react";

const Startersgids = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    region: "",
    isActiveFreelancer: false,
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy) {
      toast({
        title: "Privacy akkoord vereist",
        description: "Gelieve akkoord te gaan met de verwerking van je gegevens.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/request-lead-magnet`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            region: form.region,
            isActiveFreelancer: form.isActiveFreelancer,
          }),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Mislukt");
      }
      setDone(true);
      toast({
        title: "Bedankt!",
        description: "De startersgids is naar je mailbox verstuurd.",
      });
    } catch (e) {
      toast({
        title: "Er ging iets mis",
        description: "Probeer opnieuw of mail info@hezo.be",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Startersgids zelfstandig thuisverpleegkundige",
    description:
      "Gratis PDF-gids voor wie zelfstandig thuisverpleegkundige wil worden in België. Stappenplan in 7 stappen.",
    url: "https://www.hezo.be/startersgids/",
  };

  return (
    <>
      <SEO
        title="Gratis startersgids zelfstandig thuisverpleegkundige | Hezo"
        description="Download gratis de Hezo startersgids: stappenplan in 7 stappen om zelfstandig thuisverpleegkundige te worden in België. RIZIV, statuut, verzekeringen."
        path="/startersgids/"
        structuredData={structuredData}
      />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_minmax(0,420px)] gap-10 items-start">
            {/* Linkerblok: pitch */}
            <div>
              <FileText className="h-12 w-12 text-secondary mb-4" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Startersgids zelfstandig thuisverpleegkundige
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Wil je zelfstandig thuisverpleegkundige worden in België, maar weet je niet waar te beginnen?
                Onze gratis PDF-gids brengt het volledige traject in 7 concrete stappen, met realistische
                doorlooptijden en kostenramingen.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Diploma, visum en RIZIV-nummer aanvragen",
                  "Sociaal verzekeringsfonds en bijdragen",
                  "Ondernemingsnummer en btw-vrijstelling (artikel 44)",
                  "Verzekeringen (beroepsaansprakelijkheid, VAPZ)",
                  "Software, materiaal en wagen",
                  "Patiënteninstroom opbouwen via huisartsen en netwerken",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                Liever eerst lezen?{" "}
                <Link
                  to="/blog/zelfstandig-thuisverpleegkundige-worden/"
                  className="text-secondary underline"
                >
                  Lees ook ons uitgebreide blogartikel
                </Link>
                .
              </p>
            </div>

            {/* Rechterblok: formulier */}
            <Card className="border-secondary/30 shadow-lg sticky top-32">
              <CardContent className="p-6 md:p-8">
                {done ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="h-14 w-14 text-secondary mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-primary mb-2">Check je mailbox</h2>
                    <p className="text-muted-foreground mb-6">
                      We hebben de startersgids verstuurd naar <strong>{form.email}</strong>.
                    </p>
                    <Button asChild variant="outline">
                      <a
                        href="/downloads/startersgids-thuisverpleegkundige.pdf"
                        target="_blank"
                        rel="noopener"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Of download direct
                      </a>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary mb-1">
                      Vraag de gids gratis aan
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Je ontvangt de PDF direct in je mailbox.
                    </p>

                    <div>
                      <Label htmlFor="name">Voornaam *</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="region">Regio (optioneel)</Label>
                      <Input
                        id="region"
                        placeholder="Bijv. Antwerpen, Gent..."
                        value={form.region}
                        onChange={(e) => setForm({ ...form, region: e.target.value })}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="freelance"
                        checked={form.isActiveFreelancer}
                        onCheckedChange={(c) =>
                          setForm({ ...form, isActiveFreelancer: c as boolean })
                        }
                      />
                      <Label
                        htmlFor="freelance"
                        className="text-sm font-normal cursor-pointer leading-tight"
                      >
                        Ik werk al als zelfstandige
                      </Label>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="privacy"
                        checked={form.privacy}
                        onCheckedChange={(c) => setForm({ ...form, privacy: c as boolean })}
                      />
                      <Label
                        htmlFor="privacy"
                        className="text-sm font-normal cursor-pointer leading-tight text-muted-foreground"
                      >
                        Ik ga akkoord met de verwerking van mijn gegevens conform het{" "}
                        <Link to="/privacy/" className="text-secondary underline">
                          privacybeleid
                        </Link>
                        .
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                      {submitting ? (
                        "Versturen..."
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Verstuur de gids
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Startersgids;
