import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Power, Trash2, Lock } from "lucide-react";

interface Training {
  id: string;
  titel: string;
  datum: string;
  tijd: string;
  locatie: string | null;
  max_deelnemers: number;
  beschrijving: string;
  lesgever: string;
  type: "webinar" | "fysiek";
  opname_beschikbaar: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.functions.supabase.co/trainings-admin`;

const emptyForm = {
  titel: "",
  datum: "",
  tijd: "",
  locatie: "",
  max_deelnemers: 50,
  beschrijving: "",
  lesgever: "",
  type: "webinar" as "webinar" | "fysiek",
  opname_beschikbaar: false,
  is_active: true,
};

const OpleidingenAdmin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const callApi = useCallback(async (action: string, payload?: Record<string, unknown>) => {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, action, payload }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Request failed" }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
  }, [password]);

  const loadTrainings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callApi("list_all");
      setTrainings(data);
    } catch (err) {
      toast({ title: "Fout bij laden", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [callApi, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "list_all" }),
      });
      if (res.status === 401) {
        toast({ title: "Onjuist wachtwoord", variant: "destructive" });
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTrainings(data);
      setAuthed(true);
    } catch (err) {
      toast({ title: "Fout", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) loadTrainings();
  }, [authed, loadTrainings]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (t: Training) => {
    setEditingId(t.id);
    setForm({
      titel: t.titel,
      datum: t.datum,
      tijd: t.tijd,
      locatie: t.locatie || "",
      max_deelnemers: t.max_deelnemers,
      beschrijving: t.beschrijving,
      lesgever: t.lesgever,
      type: t.type,
      opname_beschikbaar: t.opname_beschikbaar,
      is_active: t.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        locatie: form.locatie.trim() || null,
        max_deelnemers: Number(form.max_deelnemers),
      };
      if (editingId) {
        await callApi("update", { id: editingId, ...payload });
        toast({ title: "Opleiding bijgewerkt" });
      } else {
        await callApi("create", payload);
        toast({ title: "Opleiding toegevoegd" });
      }
      setDialogOpen(false);
      await loadTrainings();
    } catch (err) {
      toast({ title: "Fout bij opslaan", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (t: Training) => {
    try {
      await callApi("toggle_active", { id: t.id, is_active: !t.is_active });
      toast({ title: t.is_active ? "Gedeactiveerd" : "Geactiveerd" });
      await loadTrainings();
    } catch (err) {
      toast({ title: "Fout", description: (err as Error).message, variant: "destructive" });
    }
  };

  const handleDelete = async (t: Training) => {
    if (!confirm(`"${t.titel}" definitief verwijderen?`)) return;
    try {
      await callApi("delete", { id: t.id });
      toast({ title: "Verwijderd" });
      await loadTrainings();
    } catch (err) {
      toast({ title: "Fout", description: (err as Error).message, variant: "destructive" });
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" /> Opleidingen Admin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Wachtwoord</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Inloggen
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Opleidingen beheren</h1>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" /> Nieuwe opleiding
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <div className="space-y-3">
            {trainings.map((t) => (
              <Card key={t.id} className={!t.is_active ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge variant={t.type === "webinar" ? "default" : "secondary"}>{t.type}</Badge>
                        {!t.is_active && <Badge variant="outline">Inactief</Badge>}
                        {t.opname_beschikbaar && <Badge variant="outline">Opname</Badge>}
                      </div>
                      <h3 className="font-semibold truncate">{t.titel}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t.datum} · {t.tijd} · {t.lesgever}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => openEdit(t)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleToggle(t)}>
                        <Power className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(t)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {trainings.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Geen opleidingen.</p>
            )}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Opleiding bewerken" : "Nieuwe opleiding"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Titel</Label>
                <Input value={form.titel} onChange={(e) => setForm({ ...form, titel: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Datum</Label>
                  <Input type="date" value={form.datum} onChange={(e) => setForm({ ...form, datum: e.target.value })} />
                </div>
                <div>
                  <Label>Tijd</Label>
                  <Input
                    placeholder="13:30 – 15:30 (2u00)"
                    value={form.tijd}
                    onChange={(e) => setForm({ ...form, tijd: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "webinar" | "fysiek" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="fysiek">Fysiek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max. deelnemers</Label>
                  <Input
                    type="number"
                    min={1}
                    value={form.max_deelnemers}
                    onChange={(e) => setForm({ ...form, max_deelnemers: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>Locatie (optioneel)</Label>
                <Input value={form.locatie} onChange={(e) => setForm({ ...form, locatie: e.target.value })} />
              </div>
              <div>
                <Label>Lesgever</Label>
                <Input value={form.lesgever} onChange={(e) => setForm({ ...form, lesgever: e.target.value })} />
              </div>
              <div>
                <Label>Beschrijving</Label>
                <Textarea
                  rows={5}
                  value={form.beschrijving}
                  onChange={(e) => setForm({ ...form, beschrijving: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="opname">Opname beschikbaar</Label>
                <Switch
                  id="opname"
                  checked={form.opname_beschikbaar}
                  onCheckedChange={(c) => setForm({ ...form, opname_beschikbaar: c })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Actief (zichtbaar op website)</Label>
                <Switch
                  id="active"
                  checked={form.is_active}
                  onCheckedChange={(c) => setForm({ ...form, is_active: c })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuleren</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Opslaan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OpleidingenAdmin;
