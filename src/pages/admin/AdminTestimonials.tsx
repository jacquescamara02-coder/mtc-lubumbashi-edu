import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Save, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTestimonials = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", content: "", rating: 5, is_active: true });

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (t: typeof form & { id?: string }) => {
      if (t.id) {
        const { error } = await supabase.from("testimonials").update(t).eq("id", t.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(t);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      setShowForm(false);
      setEditing(null);
      setForm({ name: "", role: "", content: "", rating: 5, is_active: true });
      toast({ title: "Témoignage sauvegardé" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Supprimé" });
    },
  });

  const startEdit = (t: any) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role || "", content: t.content, rating: t.rating, is_active: t.is_active });
    setShowForm(true);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">Témoignages</h2>
        <button onClick={() => { setEditing(null); setForm({ name: "", role: "", content: "", rating: 5, is_active: true }); setShowForm(true); }} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">{editing ? "Modifier" : "Nouveau témoignage"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(editing ? { ...form, id: editing.id } : form); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Nom" className={inputClass} />
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Rôle / Formation" className={inputClass} />
            </div>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required placeholder="Témoignage" rows={3} className={inputClass} />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })}>
                    <Star className={`h-5 w-5 ${s <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
                Actif
              </label>
            </div>
            <button type="submit" disabled={saveMutation.isPending} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4" /> Sauvegarder
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Chargement...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Aucun témoignage.</div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  {t.role && <span className="text-xs text-muted-foreground">— {t.role}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.content}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3 w-3 ${s <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => startEdit(t)} className="p-2 text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => deleteMutation.mutate(t.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
