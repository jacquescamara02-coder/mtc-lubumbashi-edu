import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const AdminArticles = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", is_published: false });

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const saveMutation = useMutation({
    mutationFn: async (a: typeof form & { id?: string }) => {
      const payload = {
        ...a,
        author_id: user?.id,
        published_at: a.is_published ? new Date().toISOString() : null,
      };
      if (a.id) {
        const { error } = await supabase.from("articles").update(payload).eq("id", a.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("articles").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-articles"] });
      setShowForm(false);
      setEditing(null);
      setForm({ title: "", slug: "", content: "", excerpt: "", is_published: false });
      toast({ title: "Article sauvegardé" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-articles"] });
      toast({ title: "Article supprimé" });
    },
  });

  const startEdit = (a: any) => {
    setEditing(a);
    setForm({ title: a.title, slug: a.slug, content: a.content, excerpt: a.excerpt || "", is_published: a.is_published });
    setShowForm(true);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">Articles</h2>
        <button onClick={() => { setEditing(null); setForm({ title: "", slug: "", content: "", excerpt: "", is_published: false }); setShowForm(true); }} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">{editing ? "Modifier" : "Nouvel article"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(editing ? { ...form, id: editing.id } : form); }} className="space-y-4">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
              required placeholder="Titre de l'article" className={inputClass}
            />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required placeholder="slug-de-l-article" className={inputClass} />
            <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Résumé court (optionnel)" className={inputClass} />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required placeholder="Contenu de l'article..." rows={8} className={inputClass} />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="rounded" />
              Publier immédiatement
            </label>
            <button type="submit" disabled={saveMutation.isPending} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4" /> Sauvegarder
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Chargement...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Aucun article.</div>
      ) : (
        <div className="space-y-3">
          {articles.map((a) => (
            <div key={a.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{a.title}</p>
                {a.excerpt && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{a.excerpt}</p>}
                <p className="text-xs text-muted-foreground mt-1">/{a.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${a.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {a.is_published ? <><Eye className="h-3 w-3" /> Publié</> : <><EyeOff className="h-3 w-3" /> Brouillon</>}
                </span>
                <button onClick={() => startEdit(a)} className="p-2 text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => deleteMutation.mutate(a.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
