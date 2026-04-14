import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, X, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { key: "ceremonie", label: "Cérémonies" },
  { key: "coiffure", label: "Coiffure" },
  { key: "maquillage", label: "Maquillage" },
  { key: "autoecole", label: "Auto-École" },
  { key: "centre", label: "Le Centre" },
];

const AdminGallery = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "centre", sort_order: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("uploads").upload(path, file);

    if (uploadError) {
      toast({ title: "Erreur upload", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(path);

    const { error } = await supabase.from("gallery_images").insert({
      title: form.title,
      image_url: urlData.publicUrl,
      category: form.category,
      sort_order: form.sort_order,
    });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      setShowForm(false);
      setForm({ title: "", category: "centre", sort_order: 0 });
      setFile(null);
      toast({ title: "Image ajoutée" });
    }
    setUploading(false);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast({ title: "Image supprimée" });
    },
  });

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">Galerie</h2>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">Nouvelle image</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleUpload} className="space-y-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Titre de l'image" className={inputClass} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required className="text-sm" />
            </div>
            <button type="submit" disabled={uploading} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4" /> {uploading ? "Upload..." : "Sauvegarder"}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Chargement...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Aucune image.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
              <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => deleteMutation.mutate(img.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-destructive text-destructive-foreground rounded-full transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                <p className="text-white text-xs truncate">{img.title}</p>
                <p className="text-white/70 text-xs">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
