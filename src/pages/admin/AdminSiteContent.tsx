import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload, Image as ImageIcon, Loader2, Trash2 } from "lucide-react";

const SECTIONS: { key: string; label: string; description: string }[] = [
  { key: "hero", label: "Hero (Accueil)", description: "Bandeau principal de la page d'accueil." },
  { key: "about", label: "À propos", description: "Présentation du centre et statistiques." },
  { key: "courses", label: "Formations", description: "Section des programmes et catégories." },
  { key: "gallery", label: "Galerie", description: "Textes d'introduction de la galerie photos." },
  { key: "video", label: "Vidéo", description: "Présentation vidéo du centre." },
  { key: "testimonials", label: "Témoignages", description: "Textes et photos des témoignages." },
  { key: "payment", label: "Paiement", description: "Textes de la section paiement." },
  { key: "sites", label: "Nos Sites", description: "Textes de la section implantations." },
  { key: "faq", label: "FAQ", description: "Textes de la section questions fréquentes." },
  { key: "contact", label: "Contact", description: "Coordonnées, adresses, téléphones, mentions légales." },
  { key: "footer", label: "Pied de page", description: "Slogan et liens sociaux du footer." },
  { key: "navbar", label: "Barre de navigation", description: "Nom et bouton d'appel de la navbar." },
];

type TextRow = { id: string; key: string; section: string | null; label: string | null; kind: string; value: string; sort_order: number };
type ImageRow = { id: string; key: string; section: string; label: string; image_url: string | null; sort_order: number };

const AdminSiteContent = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [active, setActive] = useState(SECTIONS[0].key);

  const { data: texts = [], isLoading: lt } = useQuery({
    queryKey: ["admin_texts", active],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_texts").select("*").eq("section", active).order("sort_order");
      if (error) throw error;
      return data as TextRow[];
    },
  });

  const { data: images = [], isLoading: li } = useQuery({
    queryKey: ["admin_images", active],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select("*").eq("section", active).order("sort_order");
      if (error) throw error;
      return data as ImageRow[];
    },
  });

  const updateText = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { error } = await supabase.from("site_texts").update({ value }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin_texts", active] });
      qc.invalidateQueries({ queryKey: ["site_texts_all"] });
      toast({ title: "Texte enregistré" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const updateImage = useMutation({
    mutationFn: async ({ id, image_url }: { id: string; image_url: string | null }) => {
      const { error } = await supabase.from("site_images").update({ image_url }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin_images", active] });
      qc.invalidateQueries({ queryKey: ["site_images_all"] });
      toast({ title: "Image enregistrée" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const activeMeta = SECTIONS.find((s) => s.key === active)!;

  return (
    <div>
      <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Contenu du site</h2>
      <p className="text-sm text-muted-foreground mb-6">Modifiez tous les textes et toutes les images de chaque section. Les modifications sont appliquées en temps réel.</p>

      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === s.key
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border">
        <p className="text-sm text-foreground"><strong>{activeMeta.label}</strong> — {activeMeta.description}</p>
      </div>

      {/* IMAGES */}
      {images.length > 0 && (
        <div className="mb-8">
          <h3 className="font-heading font-bold text-lg text-foreground mb-3 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" /> Images de la section
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <ImageSlotCard
                key={img.id}
                row={img}
                onSave={(url) => updateImage.mutate({ id: img.id, image_url: url })}
                onReset={() => updateImage.mutate({ id: img.id, image_url: null })}
                pending={updateImage.isPending}
              />
            ))}
          </div>
        </div>
      )}

      {/* TEXTES */}
      <div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-3">Textes de la section</h3>
        {lt ? (
          <div className="text-muted-foreground text-sm py-6 text-center">Chargement…</div>
        ) : texts.length === 0 ? (
          <div className="text-muted-foreground text-sm py-6 text-center bg-muted/30 rounded-xl">Aucun texte pour cette section.</div>
        ) : (
          <div className="space-y-3">
            {texts.map((t) => (
              <TextSlotCard
                key={t.id}
                row={t}
                onSave={(v) => updateText.mutate({ id: t.id, value: v })}
                pending={updateText.isPending}
              />
            ))}
          </div>
        )}
      </div>

      {(li || lt) && (images.length === 0 && texts.length === 0) && (
        <div className="text-center text-muted-foreground py-10">Chargement…</div>
      )}
    </div>
  );
};

const TextSlotCard = ({ row, onSave, pending }: { row: TextRow; onSave: (v: string) => void; pending: boolean }) => {
  const [value, setValue] = useState(row.value);
  const isRich = row.kind === "richtext";
  const dirty = value !== row.value;
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <label className="block mb-2">
        <span className="text-sm font-semibold text-foreground">{row.label || row.key}</span>
        <span className="text-xs text-muted-foreground ml-2">{row.key}</span>
      </label>
      {isRich ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
      <div className="flex justify-end mt-2 gap-2">
        {dirty && (
          <button onClick={() => setValue(row.value)} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5">
            Annuler
          </button>
        )}
        <button
          onClick={() => onSave(value)}
          disabled={!dirty || pending}
          className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
        >
          <Save className="h-3 w-3" /> Enregistrer
        </button>
      </div>
    </div>
  );
};

const ImageSlotCard = ({ row, onSave, onReset, pending }: { row: ImageRow; onSave: (url: string) => void; onReset: () => void; pending: boolean }) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const isVideo = row.key.startsWith("video.");

  const handleFile = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `site/${row.section}/${row.key.replace(/\./g, "_")}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("uploads").upload(path, file, { upsert: false });
    if (upErr) {
      toast({ title: "Erreur upload", description: upErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: pub } = supabase.storage.from("uploads").getPublicUrl(path);
    onSave(pub.publicUrl);
    setUploading(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-3 flex flex-col">
      <p className="text-sm font-semibold text-foreground mb-1">{row.label}</p>
      <p className="text-xs text-muted-foreground mb-2 truncate">{row.key}</p>
      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3 flex items-center justify-center">
        {row.image_url ? (
          isVideo ? (
            <video src={row.image_url} className="w-full h-full object-cover" />
          ) : (
            <img src={row.image_url} alt={row.label} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="text-center text-muted-foreground text-xs px-2">
            <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-50" />
            Utilise l'image par défaut du site
          </div>
        )}
      </div>
      <label className="cursor-pointer">
        <div className="inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40">
          {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
          {uploading ? "Envoi…" : row.image_url ? "Remplacer" : "Téléverser"}
        </div>
        <input
          type="file"
          accept={isVideo ? "video/*" : "image/*"}
          className="hidden"
          disabled={uploading || pending}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </label>
      {row.image_url && (
        <button
          onClick={onReset}
          disabled={pending}
          className="mt-2 inline-flex items-center justify-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg"
        >
          <Trash2 className="h-3 w-3" /> Rétablir l'image d'origine
        </button>
      )}
    </div>
  );
};

export default AdminSiteContent;