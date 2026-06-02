import { MapPin } from "lucide-react";
import { useSiteText } from "@/hooks/useSiteContent";

const sites = [
  {
    city: "Lubumbashi",
    address: "Centre ville, Avenue Lomami coin des Usines, 1er niveau",
    quartier: "Quartier Makutano, Commune de Lubumbashi",
    province: "Haut-Katanga",
    main: true,
  },
  {
    city: "Kolwezi",
    address: "Kolwezi, Province du Lualaba",
    quartier: "",
    province: "Lualaba",
  },
  {
    city: "Likasi",
    address: "Likasi, Haut-Katanga",
    quartier: "",
    province: "Haut-Katanga",
  },
];

const SitesSection = () => {
  const eyebrow = useSiteText("sites.eyebrow", "Nos implantations");
  const title = useSiteText("sites.title", "Nos Sites");
  const subtitle = useSiteText("sites.subtitle", "Présents dans les principales villes du Haut-Katanga pour vous former au plus près.");

  return (
  <section id="sites" className="section-padding bg-section-light">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">{eyebrow}</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sites.map((s) => (
          <div key={s.city} className={`rounded-xl p-8 border transition-all ${s.main ? "bg-primary text-primary-foreground border-primary shadow-xl scale-[1.02]" : "bg-background hover:shadow-lg"}`}>
            <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${s.main ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
              <MapPin className={`h-6 w-6 ${s.main ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">{s.city}</h3>
            {s.main && <span className="inline-block bg-red text-red-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">Siège Principal</span>}
            <p className={`text-sm ${s.main ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.address}</p>
            {s.quartier && <p className={`text-sm mt-1 ${s.main ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.quartier}</p>}
            <p className={`text-xs mt-2 font-medium ${s.main ? "text-primary-foreground/60" : "text-muted-foreground"}`}>Province: {s.province}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default SitesSection;
