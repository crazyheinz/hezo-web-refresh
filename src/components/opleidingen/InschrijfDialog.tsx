import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InschrijfDialogProps {
  opleidingNaam: string;
  opleidingDatum: string;
  children: React.ReactNode;
}

const InschrijfDialog = ({ opleidingNaam, opleidingDatum, children }: InschrijfDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    voornaam: "",
    achternaam: "",
    email: "",
    phone: "",
    opmerking: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact", {
        body: {
          name: `${formData.voornaam} ${formData.achternaam}`,
          email: formData.email,
          phone: formData.phone,
          message: `Inschrijving voor opleiding: ${opleidingNaam}\nDatum: ${opleidingDatum}\n\n${formData.opmerking ? `Opmerking: ${formData.opmerking}` : "Geen opmerking"}`,
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
      setFormData({ voornaam: "", achternaam: "", email: "", phone: "", opmerking: "" });
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inschrijven: {opleidingNaam}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="space-y-2">
            <Label htmlFor="opmerking">Opmerking</Label>
            <Textarea
              id="opmerking"
              value={formData.opmerking}
              onChange={(e) => setFormData({ ...formData, opmerking: e.target.value })}
              placeholder="Optioneel"
              rows={3}
            />
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
