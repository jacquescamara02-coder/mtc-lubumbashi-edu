import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminTexts = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: texts = [], isLoading } = useQuery({
    queryKey: ["admin-texts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_texts").select("*").order("section");
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { error } = await supabase.from("site_texts").update({ value }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-texts"] });
      setEditingId(null);
      toast({ title: "Texte mis à jour" });
    },
  });

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div>
      <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Textes du site</h2>
      <p className="text-sm text-muted-foreground mb-6">Modifiez les textes affichés sur le site web. Les modifications sont appliquées en temps réel.</p>

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Chargement...</div>
      ) : texts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Aucun texte configuré. Les textes seront ajoutés au fur et à mesure.</div>
      ) : (
        <div className="space-y-3">
          {texts.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{t.section || "Général"}</span>
                  <p className="font-semibold text-foreground mt-1 text-sm">{t.key}</p>
                </div>
                {editingId !== t.id && (
                  <button onClick={() => { setEditingId(t.id); setEditValue(t.value); }} className="p-2 text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
              {editingId === t.id ? (
                <div className="space-y-2">
                  <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={3} className={inputClass} />
                  <div className="flex gap-2">
                    <button onClick={() => updateMutation.mutate({ id: t.id, value: editValue })} disabled={updateMutation.isPending} className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50">
                      <Save className="h-3 w-3" /> Sauvegarder
                    </button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground border border-border">
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t.value}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTexts;
