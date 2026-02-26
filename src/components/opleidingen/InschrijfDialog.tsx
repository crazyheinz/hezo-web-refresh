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
    name: "",
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Inschrijving voor opleiding: ${opleidingNaam}\nDatum: ${opleidingDatum}\n\n${formData.opmerking ? `Opmerking: ${formData.opmerking}` : "Geen opmerking"}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Inschrijving verzonden!",
        description: "We nemen zo snel mogelijk contact met je op.",
      });
      setFormData({ name: "", email: "", phone: "", opmerking: "" });
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
            <Label htmlFor="name">Naam *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Je volledige naam"
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
