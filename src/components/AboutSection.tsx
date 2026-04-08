import { Award, Users, BookOpen, Target } from "lucide-react";
import logo from "@/assets/logo-mtc.jpg";

const stats = [
  { icon: Users, label: "Étudiants formés", value: "500+" },
  { icon: BookOpen, label: "Formations", value: "10+" },
  { icon: Award, label: "Certifications", value: "100%" },
  { icon: Target, label: "Taux d'insertion", value: "85%" },
];

const AboutSection = () => (
  <section id="apropos" className="section-padding bg-section-light">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Qui sommes-nous ?</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            Un centre d'excellence pour votre formation professionnelle
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Le <strong className="text-foreground">Centre de Formation Professionnelle Mamre Training Center (MTC)</strong> est un établissement de formation dédié à l'acquisition de compétences pratiques et professionnelles. Situé au cœur de Lubumbashi, MTC offre des formations de qualité adaptées aux besoins du marché de l'emploi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Notre mission est de former des professionnels compétents, capables de répondre aux exigences du monde du travail en République Démocratique du Congo et au-delà.
          </p>
        </div>
        <div className="flex justify-center">
          <img src={logo} alt="MTC Logo" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-primary/20" />
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

export default AboutSection;
