import { Award, Users, BookOpen, Target } from "lucide-react";
import logo from "@/assets/logo-mtc.jpg";
import { useSiteText, useSiteImage } from "@/hooks/useSiteContent";

const AboutSection = () => {
  const photo = useSiteImage("about.photo", logo);
  const eyebrow = useSiteText("about.eyebrow", "Qui sommes-nous ?");
  const title = useSiteText("about.title", "Un centre d'excellence pour votre formation professionnelle");
  const p1 = useSiteText("about.paragraph_1", "Le Centre de Formation Professionnelle Mamre Training Center (MTC) est un établissement agréé dédié à l'acquisition de compétences pratiques et professionnelles. Situé au cœur de Lubumbashi avec des antennes à Kolwezi et Likasi, MTC offre plus de 50 formations certifiantes adaptées aux besoins du marché.");
  const p2 = useSiteText("about.paragraph_2", "Nos formations couvrent 9 domaines d'expertise : informatique et multimédia, mode et beauté, hôtellerie, métiers techniques, management, entrepreneuriat, langues, sécurité au travail, et conduite d'engins lourds.");
  const p3 = useSiteText("about.paragraph_3", "Chaque parcours combine formation théorique, pratique encadrée, stage professionnel et délivrance d'un brevet reconnu.");
  const stats = [
    { icon: Users, value: useSiteText("about.stat_1_value", "1000+"), label: useSiteText("about.stat_1_label", "Étudiants formés") },
    { icon: BookOpen, value: useSiteText("about.stat_2_value", "50+"), label: useSiteText("about.stat_2_label", "Formations") },
    { icon: Award, value: useSiteText("about.stat_3_value", "100%"), label: useSiteText("about.stat_3_label", "Brevets délivrés") },
    { icon: Target, value: useSiteText("about.stat_4_value", "85%"), label: useSiteText("about.stat_4_label", "Taux d'insertion") },
  ];

  return (
  <section id="apropos" className="section-padding bg-section-light">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">{eyebrow}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">{title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{p2}</p>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{p3}</p>
        </div>
        <div className="flex justify-center">
          <img src={photo} alt="MTC" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-primary/20" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {stats.map((s) => (
          <div key={s.label} className="bg-background rounded-xl p-6 text-center shadow-md border">
            <s.icon className="h-8 w-8 mx-auto text-primary mb-3" />
            <p className="font-heading font-bold text-2xl md:text-3xl text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default AboutSection;
