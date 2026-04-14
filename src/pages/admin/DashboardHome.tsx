import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Settings, Image, MessageSquare, Newspaper, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const statCards = [
  { label: "Services", table: "services", icon: Settings, href: "/admin/services", color: "bg-blue-500/10 text-blue-600" },
  { label: "Images galerie", table: "gallery_images", icon: Image, href: "/admin/gallery", color: "bg-green-500/10 text-green-600" },
  { label: "Témoignages", table: "testimonials", icon: MessageSquare, href: "/admin/testimonials", color: "bg-purple-500/10 text-purple-600" },
  { label: "Articles", table: "articles", icon: Newspaper, href: "/admin/articles", color: "bg-orange-500/10 text-orange-600" },
  { label: "Textes", table: "site_texts", icon: FileText, href: "/admin/texts", color: "bg-pink-500/10 text-pink-600" },
] as const;

const DashboardHome = () => {
  const counts = statCards.map((card) => {
    const { data } = useQuery({
      queryKey: ["count", card.table],
      queryFn: async () => {
        const { count } = await supabase
          .from(card.table)
          .select("*", { count: "exact", head: true });
        return count ?? 0;
      },
    });
    return data ?? 0;
  });

  return (
    <div>
      <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Bienvenue sur le tableau de bord</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <Link
            key={card.table}
            to={card.href}
            className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="h-6 w-6" />
              </div>
              <span className="text-3xl font-bold text-foreground">{counts[i]}</span>
            </div>
            <p className="font-heading font-semibold text-foreground">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-1">Cliquez pour gérer →</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
