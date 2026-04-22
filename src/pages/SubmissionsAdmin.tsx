import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw, AlertCircle, CheckCircle2, Mail, GraduationCap, Briefcase, FileText, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface Submission {
  id: string;
  type: "contact" | "opleiding";
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  opleiding_naam: string | null;
  opleiding_datum: string | null;
  email_sent: boolean;
  email_error: string | null;
  created_at: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  position: string;
  motivation: string;
  cv_url: string | null;
  email_sent: boolean;
  email_error: string | null;
  created_at: string;
}

const SubmissionsAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "contact" | "opleiding" | "sollicitatie" | "failed">("all");
  const [viewItem, setViewItem] = useState<{ title: string; subtitle?: string; body: string } | null>(null);
  const { toast } = useToast();

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-admin-password": password,
  });

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [subRes, appRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/functions/v1/submissions-admin`, { headers: getHeaders() }),
        fetch(`${SUPABASE_URL}/functions/v1/submissions-admin/applications`, { headers: getHeaders() }),
      ]);
      if (!subRes.ok || !appRes.ok) throw new Error("Failed");
      setSubmissions(await subRes.json());
      setApplications(await appRes.json());
    } catch {
      toast({ title: "Fout bij ophalen", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submissions-admin`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        await fetchAll();
      } else {
        toast({ title: "Onjuist wachtwoord", variant: "destructive" });
      }
    } catch {
      toast({ title: "Fout bij inloggen", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const deleteItem = async (id: string, isApplication: boolean) => {
    if (!confirm("Verwijderen?")) return;
    try {
      const path = isApplication
        ? `submissions-admin/applications/${id}`
        : `submissions-admin/${id}`;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/${path}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Verwijderd" });
      fetchAll();
    } catch {
      toast({ title: "Fout bij verwijderen", variant: "destructive" });
    }
  };

  const formatDate = (s: string) => new Date(s).toLocaleString("nl-BE");

  const showApplications = filter === "sollicitatie";

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === "all") return true;
    if (filter === "failed") return !s.email_sent;
    if (filter === "sollicitatie") return false;
    return s.type === filter;
  });

  const filteredApplications = applications.filter((a) => {
    if (filter === "all" || filter === "sollicitatie") return true;
    if (filter === "failed") return !a.email_sent;
    return false;
  });

  const failedCount =
    submissions.filter((s) => !s.email_sent).length +
    applications.filter((a) => !a.email_sent).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Inzendingen Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Voer admin wachtwoord in"
              />
            </div>
            <Button onClick={handleLogin} disabled={isLoading} className="w-full">
              {isLoading ? "Bezig..." : "Inloggen"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Inzendingen Beheer</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Contactberichten en opleidingen (90 dagen) — sollicitaties (60 dagen)
            </p>
          </div>
          <Button onClick={fetchAll} disabled={isLoading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Vernieuwen
          </Button>
        </div>

        {failedCount > 0 && (
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="pt-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-sm">
                <strong>{failedCount}</strong> inzending(en) waarvoor de notificatie-mail niet
                verstuurd kon worden. Filter op "Mail mislukt" om ze te bekijken.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2 flex-wrap">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Alle ({submissions.length + applications.length})
          </Button>
          <Button variant={filter === "contact" ? "default" : "outline"} size="sm" onClick={() => setFilter("contact")}>
            <Mail className="w-3 h-3 mr-1" />
            Contact ({submissions.filter((s) => s.type === "contact").length})
          </Button>
          <Button variant={filter === "opleiding" ? "default" : "outline"} size="sm" onClick={() => setFilter("opleiding")}>
            <GraduationCap className="w-3 h-3 mr-1" />
            Opleidingen ({submissions.filter((s) => s.type === "opleiding").length})
          </Button>
          <Button variant={filter === "sollicitatie" ? "default" : "outline"} size="sm" onClick={() => setFilter("sollicitatie")}>
            <Briefcase className="w-3 h-3 mr-1" />
            Sollicitaties ({applications.length})
          </Button>
          <Button variant={filter === "failed" ? "destructive" : "outline"} size="sm" onClick={() => setFilter("failed")}>
            <AlertCircle className="w-3 h-3 mr-1" />
            Mail mislukt ({failedCount})
          </Button>
        </div>

        {/* Submissions table (contact + opleiding) */}
        {!showApplications && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact &amp; Opleidingen</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSubmissions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Geen inzendingen</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Datum</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Naam</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Bericht / Opleiding</TableHead>
                        <TableHead>Mail</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="text-xs whitespace-nowrap">{formatDate(s.created_at)}</TableCell>
                          <TableCell>
                            <Badge variant={s.type === "opleiding" ? "default" : "secondary"}>
                              {s.type === "opleiding" ? "Opleiding" : "Contact"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{s.name}</TableCell>
                          <TableCell className="text-sm">
                            <a href={`mailto:${s.email}`} className="text-primary hover:underline block">{s.email}</a>
                            {s.phone && <span className="text-muted-foreground text-xs">{s.phone}</span>}
                          </TableCell>
                          <TableCell className="max-w-md">
                            {s.opleiding_naam && (
                              <div className="text-sm font-medium mb-1">
                                {s.opleiding_naam}
                                {s.opleiding_datum && <span className="text-muted-foreground"> — {s.opleiding_datum}</span>}
                              </div>
                            )}
                            {s.message && (
                              <div className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-3">{s.message}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            {s.email_sent ? (
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            ) : (
                              <div title={s.email_error || "Mail niet verstuurd"}>
                                <AlertCircle className="w-4 h-4 text-destructive" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => deleteItem(s.id, false)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Applications table */}
        {(filter === "all" || filter === "sollicitatie" || filter === "failed") && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Sollicitaties
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredApplications.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Geen sollicitaties</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Datum</TableHead>
                        <TableHead>Functie</TableHead>
                        <TableHead>Naam</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Motivatie</TableHead>
                        <TableHead>CV</TableHead>
                        <TableHead>Mail</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell className="text-xs whitespace-nowrap">{formatDate(a.created_at)}</TableCell>
                          <TableCell><Badge variant="outline">{a.position}</Badge></TableCell>
                          <TableCell className="font-medium">{a.name}</TableCell>
                          <TableCell className="text-sm">
                            <a href={`mailto:${a.email}`} className="text-primary hover:underline block">{a.email}</a>
                            {a.phone && <span className="text-muted-foreground text-xs">{a.phone}</span>}
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-3">{a.motivation}</div>
                          </TableCell>
                          <TableCell>
                            {a.cv_url ? (
                              <a href={a.cv_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-xs">
                                <FileText className="w-3 h-3" /> Open
                              </a>
                            ) : (
                              <span className="text-muted-foreground text-xs">Geen</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {a.email_sent ? (
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            ) : (
                              <div title={a.email_error || "Mail niet verstuurd"}>
                                <AlertCircle className="w-4 h-4 text-destructive" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => deleteItem(a.id, true)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SubmissionsAdmin;
