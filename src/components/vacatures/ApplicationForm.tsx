import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const ApplicationForm = ({ jobId, jobTitle }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
    privacy: false,
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({
        title: "Privacy akkoord vereist",
        description: "Gelieve akkoord te gaan met het privacybeleid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("motivation", formData.motivation);
      formDataToSend.append("position", jobTitle);
      if (cvFile) formDataToSend.append("cv", cvFile);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-application`,
        { method: "POST", body: formDataToSend }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Submission error:", response.status, errorData);
        throw new Error(errorData.error || "Submission failed");
      }

      toast({
        title: "Bedankt voor je sollicitatie!",
        description: "We nemen binnenkort contact met je op.",
      });
      setFormData({ name: "", email: "", phone: "", motivation: "", privacy: false });
      setCvFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of mail naar info@hezo.be",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-muted border-none" id="sollicitatie">
      <CardHeader>
        <CardTitle className="text-2xl">Solliciteer nu</CardTitle>
        <p className="text-muted-foreground">Vul onderstaand formulier in om te solliciteren voor {jobTitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor={`name-${jobId}`} className="block text-sm font-medium mb-2">Naam *</label>
            <Input id={`name-${jobId}`} required value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Je volledige naam" />
          </div>
          <div>
            <label htmlFor={`email-${jobId}`} className="block text-sm font-medium mb-2">E-mail *</label>
            <Input id={`email-${jobId}`} type="email" required value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="je.email@voorbeeld.be" />
          </div>
          <div>
            <label htmlFor={`phone-${jobId}`} className="block text-sm font-medium mb-2">Telefoonnummer (optioneel)</label>
            <Input id={`phone-${jobId}`} type="tel" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+32 xxx xx xx xx" />
          </div>
          <div>
            <label htmlFor={`motivation-${jobId}`} className="block text-sm font-medium mb-2">Korte motivatie of bericht *</label>
            <Textarea id={`motivation-${jobId}`} required value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              placeholder="Vertel ons waarom je bij Hezo wilt werken..." rows={6} />
          </div>
          <div className="bg-background p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Upload je CV (pdf, docx)</p>
            <Input type="file" accept=".pdf,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id={`privacy-${jobId}`} checked={formData.privacy}
              onCheckedChange={(checked) => setFormData({ ...formData, privacy: checked as boolean })} />
            <label htmlFor={`privacy-${jobId}`} className="text-sm text-muted-foreground leading-relaxed">
              Ik ga akkoord met de verwerking van mijn gegevens volgens het privacybeleid van Hezo.
            </label>
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Verzenden..." : "Verstuur je sollicitatie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplicationForm;
