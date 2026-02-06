import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, FileText, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Recipient {
  name: string | null;
  email: string | null;
}

interface BulkInviteFormProps {
  webinarId: string;
  password: string;
  onSuccess: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const BulkInviteForm = ({ webinarId, password, onSuccess }: BulkInviteFormProps) => {
  const [textInput, setTextInput] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleName, setSingleName] = useState("");
  const [sendEmails, setSendEmails] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedRecipients, setParsedRecipients] = useState<Recipient[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseRecipients = (text: string): Recipient[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const recipients: Recipient[] = [];

    for (const line of lines) {
      // Skip header line if it looks like CSV headers
      if (line.toLowerCase().includes('name') && line.toLowerCase().includes('email')) {
        continue;
      }

      // Try to parse as "name, email" or "email, name" or just "email"
      const parts = line.split(/[,;|\t]/).map(p => p.trim().replace(/^["']|["']$/g, ''));
      
      if (parts.length >= 2) {
        // Check which part is the email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(parts[0])) {
          recipients.push({ email: parts[0], name: parts[1] || null });
        } else if (emailRegex.test(parts[1])) {
          recipients.push({ name: parts[0], email: parts[1] });
        } else {
          // No valid email found, just use the parts as name
          recipients.push({ name: parts[0], email: null });
        }
      } else if (parts.length === 1) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(parts[0])) {
          recipients.push({ email: parts[0], name: null });
        } else {
          recipients.push({ name: parts[0], email: null });
        }
      }
    }

    return recipients;
  };

  const handleTextChange = (text: string) => {
    setTextInput(text);
    const recipients = parseRecipients(text);
    setParsedRecipients(recipients);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setTextInput(text);
      const recipients = parseRecipients(text);
      setParsedRecipients(recipients);
      toast({
        title: `${recipients.length} ontvangers gevonden`,
        description: `Bestand "${file.name}" geladen`,
      });
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const createBulkInvites = async () => {
    if (parsedRecipients.length === 0) {
      toast({ title: "Geen ontvangers gevonden", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          webinar_id: webinarId,
          recipients: parsedRecipients,
          send_email: sendEmails,
        }),
      });

      if (!res.ok) throw new Error("Failed to create invites");
      
      const data = await res.json();
      const emailCount = data.emails_sent || 0;
      const inviteCount = data.invites?.length || parsedRecipients.length;

      toast({ 
        title: `${inviteCount} uitnodigingen aangemaakt!`,
        description: sendEmails && emailCount > 0 
          ? `${emailCount} email(s) verstuurd` 
          : undefined
      });

      if (data.email_errors?.length > 0) {
        console.error('Email errors:', data.email_errors);
        toast({
          title: `${data.email_errors.length} email(s) niet verstuurd`,
          description: "Controleer de console voor details",
          variant: "destructive"
        });
      }

      setTextInput("");
      setParsedRecipients([]);
      onSuccess();
    } catch {
      toast({ title: "Fout bij aanmaken uitnodigingen", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const createSingleInvite = async () => {
    if (!singleEmail && !singleName) {
      toast({ title: "Vul een naam of email in", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          webinar_id: webinarId,
          email: singleEmail || null,
          name: singleName || null,
          send_email: sendEmails && !!singleEmail,
        }),
      });

      if (!res.ok) throw new Error("Failed to create invite");
      
      const data = await res.json();
      
      if (data.email_sent) {
        toast({ title: "Uitnodiging aangemaakt en email verstuurd!" });
      } else if (data.email_error) {
        toast({ 
          title: "Uitnodiging aangemaakt",
          description: `Email kon niet verstuurd worden: ${data.email_error}`,
          variant: "destructive"
        });
      } else {
        toast({ title: "Uitnodiging aangemaakt!" });
      }

      setSingleEmail("");
      setSingleName("");
      onSuccess();
    } catch {
      toast({ title: "Fout bij aanmaken uitnodiging", variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="single">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Enkele uitnodiging
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Bulk import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <Label>Email (optioneel)</Label>
              <Input
                value={singleEmail}
                onChange={(e) => setSingleEmail(e.target.value)}
                placeholder="email@voorbeeld.be"
              />
            </div>
            <div>
              <Label>Naam (optioneel)</Label>
              <Input
                value={singleName}
                onChange={(e) => setSingleName(e.target.value)}
                placeholder="Naam ontvanger"
              />
            </div>
            <div className="flex flex-col justify-end gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="sendEmailSingle"
                  checked={sendEmails}
                  onCheckedChange={(checked) => setSendEmails(!!checked)}
                />
                <Label htmlFor="sendEmailSingle" className="text-sm cursor-pointer">
                  Stuur email
                </Label>
              </div>
              <Button onClick={createSingleInvite} disabled={isLoading}>
                <Plus className="w-4 h-4 mr-1" />
                Maak Link
              </Button>
            </div>
          </div>
          {singleEmail && sendEmails && (
            <p className="text-sm text-muted-foreground mt-2">
              ✉️ Er wordt automatisch een email gestuurd naar {singleEmail}
            </p>
          )}
        </TabsContent>

        <TabsContent value="bulk" className="mt-4 space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-4">
            {/* CSV Upload */}
            <div>
              <Label>CSV bestand uploaden</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Selecteer CSV bestand
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Formaat: naam, email (één per regel)
              </p>
            </div>

            {/* Text Input */}
            <div>
              <Label className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Of plak een lijst
              </Label>
              <Textarea
                value={textInput}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Jan Janssen, jan@bedrijf.be\nPiet Pieters, piet@example.com\nMarie, marie@test.be`}
                className="mt-1 font-mono text-sm min-h-[120px]"
              />
            </div>

            {/* Preview */}
            {parsedRecipients.length > 0 && (
              <div className="border rounded-lg p-3 bg-background">
                <p className="text-sm font-medium mb-2">
                  {parsedRecipients.length} ontvanger(s) gevonden:
                </p>
                <div className="max-h-[150px] overflow-y-auto space-y-1">
                  {parsedRecipients.slice(0, 10).map((r, i) => (
                    <div key={i} className="text-sm flex gap-2">
                      <span className="text-muted-foreground">{i + 1}.</span>
                      <span>{r.name || <span className="text-muted-foreground italic">Geen naam</span>}</span>
                      {r.email && (
                        <span className="text-primary">({r.email})</span>
                      )}
                    </div>
                  ))}
                  {parsedRecipients.length > 10 && (
                    <p className="text-sm text-muted-foreground">
                      ... en {parsedRecipients.length - 10} meer
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Send email option */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="sendEmailBulk"
                checked={sendEmails}
                onCheckedChange={(checked) => setSendEmails(!!checked)}
              />
              <Label htmlFor="sendEmailBulk" className="cursor-pointer">
                Stuur automatisch email naar ontvangers met emailadres
              </Label>
            </div>

            <Button 
              onClick={createBulkInvites} 
              disabled={isLoading || parsedRecipients.length === 0}
              className="w-full"
            >
              <Users className="w-4 h-4 mr-2" />
              {isLoading ? "Bezig..." : `Maak ${parsedRecipients.length} Link(s)`}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
