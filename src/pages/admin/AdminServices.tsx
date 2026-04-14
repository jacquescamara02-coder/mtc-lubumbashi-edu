import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

const AdminServices = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "", sort_order: 0, is_active: true });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data as Service[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (s: typeof form & { id?: string }) => {
      if (s.id) {
        const { error } = await supabase.from("services").update(s).eq("id", s.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(s);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-services"] });
      setShowForm(false);
      setEditing(null);
      resetForm();
      toast({ title: "Service sauvegardé" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-services"] });
      toast({ title: "Service supprimé" });
    },
  });

  const resetForm = () => setForm({ title: "", description: "", icon: "", sort_order: 0, is_active: true });

  const startEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description || "", icon: s.icon || "", sort_order: s.sort_order, is_active: s.is_active });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(editing ? { ...form, id: editing.id } : form);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">Services</h2>
        <button
          onClick={() => { resetForm(); setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">{editing ? "Modifier" : "Nouveau service"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Titre" className={inputClass} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className={inputClass} />
            <div className="grid grid-cols-2 gap-4">
              <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Icône (optionnel)" className={inputClass} />
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} placeholder="Ordre" className={inputClass} />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
              Actif
            </label>
            <button type="submit" disabled={saveMutation.isPending} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4" /> Sauvegarder
            </button>
          </form>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Chargement...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Aucun service. Ajoutez-en un !</div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{s.title}</p>
                {s.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${s.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {s.is_active ? "Actif" : "Inactif"}
                </span>
                <button onClick={() => startEdit(s)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => deleteMutation.mutate(s.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
