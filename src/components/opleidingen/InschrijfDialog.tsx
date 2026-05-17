import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InschrijfDialogProps {
  opleidingNaam: string;
  opleidingDatum: string;
  children: React.ReactNode;
}

const SITUATIE_OPTIES = [
  "Zelfstandig thuisverpleegkundige",
  "Verpleegkundige in loondienst",
  "Student verpleegkunde",
  "Zorgkundige",
  "Ik wil starten als zelfstandige",
  "Andere",
];

const InschrijfDialog = ({ opleidingNaam, opleidingDatum, children }: InschrijfDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    voornaam: "",
    achternaam: "",
    email: "",
    phone: "",
    situatie: "",
    riziv: "",
    regio: "",
    samenwerking: false,
    opmerking: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.situatie) {
      toast({
        title: "Vul je professionele situatie in",
        description: "Dit veld is verplicht zodat we je inschrijving correct kunnen verwerken.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    try {
      const messageLines = [
        `Inschrijving voor opleiding: ${opleidingNaam}`,
        `Datum: ${opleidingDatum}`,
        ``,
        `Professionele situatie: ${formData.situatie}`,
        `RIZIV-nummer: ${formData.riziv || "Niet opgegeven"}`,
        `Werkregio: ${formData.regio || "Niet opgegeven"}`,
        `Interesse in samenwerking met Hezo: ${formData.samenwerking ? "Ja" : "Nee"}`,
        ``,
        `Opmerking: ${formData.opmerking || "Geen opmerking"}`,
      ];

      const { error } = await supabase.functions.invoke("send-contact", {
        body: {
          name: `${formData.voornaam} ${formData.achternaam}`,
          email: formData.email,
          phone: formData.phone,
          message: messageLines.join("\n"),
          type: "opleiding",
          opleidingNaam,
          opleidingDatum,
        },
      });

      if (error) throw error;

      toast({
        title: "Aanvraag ontvangen!",
        description: "Je ontvangt een bevestigingsmail. Let op: dit is nog geen definitieve inschrijving. Wij bezorgen je binnenkort een bevestiging van inschrijving.",
      });
      setFormData({
        voornaam: "",
        achternaam: "",
        email: "",
        phone: "",
        situatie: "",
        riziv: "",
        regio: "",
        samenwerking: false,
        opmerking: "",
      });
      setOpen(false);
    } catch (err) {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of contacteer ons via info@hezo.be.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inschrijven: {opleidingNaam}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voornaam">Voornaam *</Label>
              <Input
                id="voornaam"
                required
                value={formData.voornaam}
                onChange={(e) => setFormData({ ...formData, voornaam: e.target.value })}
                placeholder="Je voornaam"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="achternaam">Achternaam *</Label>
              <Input
                id="achternaam"
                required
                value={formData.achternaam}
                onChange={(e) => setFormData({ ...formData, achternaam: e.target.value })}
                placeholder="Je achternaam"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="je@email.be"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefoonnummer</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Optioneel"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="situatie">Professionele situatie *</Label>
            <Select
              value={formData.situatie}
              onValueChange={(v) => setFormData({ ...formData, situatie: v })}
            >
              <SelectTrigger id="situatie">
                <SelectValue placeholder="Kies een optie" />
              </SelectTrigger>
              <SelectContent>
                {SITUATIE_OPTIES.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="riziv">RIZIV-nummer</Label>
              <Input
                id="riziv"
                value={formData.riziv}
                onChange={(e) => setFormData({ ...formData, riziv: e.target.value })}
                placeholder="Optioneel"
              />
              <p className="text-xs text-muted-foreground">Ben je nog in opleiding? Laat dit veld dan leeg.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regio">Waar ben je actief of wil je actief zijn?</Label>
              <Input
                id="regio"
                value={formData.regio}
                onChange={(e) => setFormData({ ...formData, regio: e.target.value })}
                placeholder="Bijvoorbeeld Gent, Antwerpen, Brugge…"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="opmerking">Opmerking</Label>
            <Textarea
              id="opmerking"
              value={formData.opmerking}
              onChange={(e) => setFormData({ ...formData, opmerking: e.target.value })}
              placeholder="Optioneel"
              rows={2}
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Checkbox
              id="samenwerking"
              checked={formData.samenwerking}
              onCheckedChange={(checked) => setFormData({ ...formData, samenwerking: checked === true })}
              className="mt-0.5"
            />
            <Label htmlFor="samenwerking" className="font-normal leading-snug cursor-pointer">
              Ik ontvang graag meer informatie over samenwerken met Hezo
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Bezig met verzenden..." : "Inschrijven"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InschrijfDialog;
