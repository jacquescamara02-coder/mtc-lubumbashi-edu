import { Monitor, Wrench, Languages, Briefcase, Cpu, PenTool, Calculator, Truck } from "lucide-react";

const courses = [
  { icon: Monitor, title: "Informatique & Bureautique", desc: "Word, Excel, PowerPoint, Internet et maintenance informatique." },
  { icon: Languages, title: "Langues", desc: "Anglais, Français et Swahili professionnel pour le monde du travail." },
  { icon: Wrench, title: "Électricité & Plomberie", desc: "Installation, maintenance et dépannage électrique et plomberie." },
  { icon: Briefcase, title: "Gestion & Entrepreneuriat", desc: "Comptabilité, gestion d'entreprise et création de projets." },
  { icon: Cpu, title: "Électronique", desc: "Réparation de téléphones, laptops et appareils électroniques." },
  { icon: PenTool, title: "Coupe & Couture", desc: "Stylisme, modélisme et confection de vêtements professionnels." },
  { icon: Calculator, title: "Comptabilité", desc: "Tenue de livres, fiscalité et logiciels comptables." },
  { icon: Truck, title: "Logistique", desc: "Gestion de stock, approvisionnement et chaîne logistique." },
];

const CoursesSection = () => (
  <section id="formations" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Nos programmes</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Nos Formations</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Des formations pratiques et certifiantes pour booster votre carrière professionnelle.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c) => (
          <div key={c.title} className="group bg-background border rounded-xl p-6 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <c.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-foreground mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CoursesSection;
