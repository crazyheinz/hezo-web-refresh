import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, ShieldCheck } from "lucide-react";
import AdminGate from "@/components/admin/AdminGate";
import type { Session } from "@supabase/supabase-js";

interface AdminUser {
  user_id: string;
  email: string | null;
  created_at: string;
}

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.functions.supabase.co/users-admin`;

const UsersView = ({ session }: { session: Session }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const callApi = useCallback(async (payload: Record<string, unknown>) => {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Request failed" }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
  }, [session.access_token]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callApi({ action: "list" });
      setAdmins(data);
    } catch (err) {
      toast({ title: "Fout bij laden", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [callApi, toast]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    setSaving(true);
    try {
      await callApi({ action: "create", email, password: password || undefined });
      toast({ title: "Admin toegevoegd", description: `${email} heeft nu admin-rechten.` });
      setDialogOpen(false);
      setEmail("");
      setPassword("");
      await load();
    } catch (err) {
      toast({ title: "Fout", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (admin: AdminUser) => {
    if (!confirm(`Admin-rechten van ${admin.email || admin.user_id} verwijderen?`)) return;
    try {
      await callApi({ action: "remove", user_id: admin.user_id });
      toast({ title: "Admin verwijderd" });
      await load();
    } catch (err) {
      toast({ title: "Fout", description: (err as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7" /> Admins beheren
          </h1>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Nieuwe admin
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <div className="space-y-3">
            {admins.map((a) => (
              <Card key={a.user_id}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{a.email || "(onbekend e-mailadres)"}</p>
                    <p className="text-xs text-muted-foreground">
                      Toegevoegd op {new Date(a.created_at).toLocaleDateString("nl-BE")}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemove(a)}
                    disabled={a.user_id === session.user.id}
                    title={a.user_id === session.user.id ? "Je kan jezelf niet verwijderen" : ""}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {admins.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Geen admins gevonden.</p>
            )}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe admin toevoegen</DialogTitle>
              <DialogDescription>
                Maakt een account aan met admin-rechten. Bestaat het e-mailadres al, dan krijgt die gebruiker de admin-rol erbij.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>E-mailadres</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@hezo.be"
                />
              </div>
              <div>
                <Label>Wachtwoord (minstens 12 tekens)</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sterk wachtwoord"
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Geef dit wachtwoord door aan de nieuwe admin. Die kan het achteraf zelf wijzigen.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuleren</Button>
              <Button onClick={handleCreate} disabled={saving || !email || !password}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Toevoegen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const GebruikersAdmin = () => (
  <AdminGate title="Admins beheren">
    {(session) => <UsersView session={session} />}
  </AdminGate>
);

export default GebruikersAdmin;
