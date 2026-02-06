import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Copy, Eye, Link2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BulkInviteForm } from "@/components/webinar/BulkInviteForm";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface Webinar {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface Invite {
  id: string;
  webinar_id: string;
  token: string;
  email: string | null;
  name: string | null;
  viewed_at: string | null;
  view_count: number;
  expires_at: string | null;
  created_at: string;
  webinars?: { title: string };
}

const WebinarAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [selectedWebinar, setSelectedWebinar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // New webinar form
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newThumbnailUrl, setNewThumbnailUrl] = useState("");

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-admin-password": password,
  });

  const fetchWebinars = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/webinars`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch webinars");
      const data = await res.json();
      setWebinars(data);
    } catch {
      toast({ title: "Fout bij ophalen webinars", variant: "destructive" });
    }
  };

  const fetchInvites = async (webinarId?: string) => {
    try {
      const url = webinarId 
        ? `${SUPABASE_URL}/functions/v1/webinar-admin/invites?webinar_id=${webinarId}`
        : `${SUPABASE_URL}/functions/v1/webinar-admin/invites`;
      const res = await fetch(url, { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch invites");
      const data = await res.json();
      setInvites(data);
    } catch {
      toast({ title: "Fout bij ophalen uitnodigingen", variant: "destructive" });
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/webinars`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        const data = await res.json();
        setWebinars(data);
        fetchInvites();
      } else {
        toast({ title: "Onjuist wachtwoord", variant: "destructive" });
      }
    } catch {
      toast({ title: "Fout bij inloggen", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const createWebinar = async () => {
    if (!newTitle || !newVideoUrl) {
      toast({ title: "Titel en video URL zijn verplicht", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/webinars`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: newTitle,
          description: newDescription || null,
          video_url: newVideoUrl,
          thumbnail_url: newThumbnailUrl || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to create webinar");
      
      toast({ title: "Webinar aangemaakt!" });
      setNewTitle("");
      setNewDescription("");
      setNewVideoUrl("");
      setNewThumbnailUrl("");
      fetchWebinars();
    } catch {
      toast({ title: "Fout bij aanmaken webinar", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const deleteWebinar = async (id: string) => {
    if (!confirm("Weet je zeker dat je deze webinar wilt verwijderen?")) return;

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete webinar");
      
      toast({ title: "Webinar verwijderd" });
      fetchWebinars();
      fetchInvites();
    } catch {
      toast({ title: "Fout bij verwijderen webinar", variant: "destructive" });
    }
  };


  const deleteInvite = async (id: string) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/webinar-admin/invites/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete invite");
      
      toast({ title: "Uitnodiging verwijderd" });
      fetchInvites(selectedWebinar || undefined);
    } catch {
      toast({ title: "Fout bij verwijderen uitnodiging", variant: "destructive" });
    }
  };

  const copyMagicLink = (token: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/webinar/${token}`;
    navigator.clipboard.writeText(link);
    toast({ title: "Link gekopieerd!" });
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("nl-BE");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Webinar Admin</CardTitle>
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
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Webinar Beheer</h1>

        {/* Create Webinar */}
        <Card>
          <CardHeader>
            <CardTitle>Nieuwe Webinar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Webinar titel"
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">Video URL *</Label>
                <Input
                  id="videoUrl"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://vimeo.com/... of YouTube URL"
                />
              </div>
              <div>
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                  id="thumbnailUrl"
                  value={newThumbnailUrl}
                  onChange={(e) => setNewThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="description">Beschrijving</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Optionele beschrijving"
                />
              </div>
            </div>
            <Button onClick={createWebinar} disabled={isLoading}>
              <Plus className="w-4 h-4 mr-2" />
              Webinar Toevoegen
            </Button>
          </CardContent>
        </Card>

        {/* Webinars List */}
        <Card>
          <CardHeader>
            <CardTitle>Webinars</CardTitle>
          </CardHeader>
          <CardContent>
            {webinars.length === 0 ? (
              <p className="text-muted-foreground">Nog geen webinars aangemaakt.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titel</TableHead>
                    <TableHead>Video URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aangemaakt</TableHead>
                    <TableHead>Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webinars.map((webinar) => (
                    <TableRow key={webinar.id}>
                      <TableCell className="font-medium">{webinar.title}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <a href={webinar.video_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {webinar.video_url}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${webinar.is_active ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                          {webinar.is_active ? "Actief" : "Inactief"}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(webinar.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedWebinar(webinar.id);
                                  fetchInvites(webinar.id);
                                }}
                              >
                                <Link2 className="w-4 h-4 mr-1" />
                                Links
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Uitnodigingen voor: {webinar.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {/* Create Invite Form */}
                                <BulkInviteForm
                                  webinarId={webinar.id}
                                  password={password}
                                  onSuccess={() => fetchInvites(webinar.id)}
                                />

                                {/* Invites Table */}
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Ontvanger</TableHead>
                                      <TableHead>Bekeken</TableHead>
                                      <TableHead>Aantal views</TableHead>
                                      <TableHead>Aangemaakt</TableHead>
                                      <TableHead>Acties</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {invites
                                      .filter((i) => i.webinar_id === webinar.id)
                                      .map((invite) => (
                                        <TableRow key={invite.id}>
                                          <TableCell>
                                            {invite.name || invite.email || <span className="text-muted-foreground">Anoniem</span>}
                                          </TableCell>
                                          <TableCell>
                                            {invite.viewed_at ? (
                                              <span className="text-primary">{formatDate(invite.viewed_at)}</span>
                                            ) : (
                                              <span className="text-muted-foreground">Nog niet</span>
                                            )}
                                          </TableCell>
                                          <TableCell>{invite.view_count}</TableCell>
                                          <TableCell>{formatDate(invite.created_at)}</TableCell>
                                          <TableCell>
                                            <div className="flex gap-1">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyMagicLink(invite.token)}
                                              >
                                                <Copy className="w-4 h-4" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => window.open(`/webinar/${invite.token}`, '_blank')}
                                              >
                                                <Eye className="w-4 h-4" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteInvite(invite.id)}
                                              >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                              </Button>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteWebinar(webinar.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebinarAdmin;
