import { useState } from "react";
import {
  Monitor, Scissors, Palette, ChefHat, Flame, Wrench, Languages,
  Plane, Building2, ShieldCheck, FileText, Truck, Car, Cpu,
  Camera, Video, Music, Briefcase, CakeSlice, Factory, Droplets,
  TreePine, BarChart3, Users, BookOpen, GraduationCap
} from "lucide-react";

interface Formation {
  title: string;
  details: string;
  duration: string;
  icon: React.ElementType;
}

interface Category {
  name: string;
  icon: React.ElementType;
  color: string;
  formations: Formation[];
}

const categories: Category[] = [
  {
    name: "Informatique & Multimédia",
    icon: Monitor,
    color: "bg-primary",
    formations: [
      { title: "Informatique Générale", details: "Formation complète en informatique avec brevet", duration: "3 mois", icon: Monitor },
      { title: "Bureautique", details: "Word, Excel, PowerPoint et outils de bureau avec brevet", duration: "2 mois", icon: Cpu },
      { title: "Système et Réseau Informatique", details: "Administration système, configuration réseau et brevet", duration: "3 mois", icon: Monitor },
      { title: "Informatique de Gestion", details: "Gestion informatisée des entreprises", duration: "2 mois", icon: Briefcase },
      { title: "Photographie", details: "Formation photo, logiciels de retouche et brevet", duration: "2 mois", icon: Camera },
      { title: "Vidéaste", details: "Tournage, montage vidéo professionnel et brevet", duration: "2 mois", icon: Video },
      { title: "Montage de Son", details: "Production audio, mixage et brevet", duration: "2 mois", icon: Music },
    ],
  },
  {
    name: "Mode & Beauté",
    icon: Scissors,
    color: "bg-red",
    formations: [
      { title: "Coupe et Couture", details: "Formation complète avec matériel et brevet", duration: "6 mois", icon: Scissors },
      { title: "Mode et Stylisme", details: "Création de mode, design et brevet", duration: "6 mois", icon: Palette },
      { title: "Esthétique et Coiffure", details: "Soins esthétiques, coiffure avec matériel et brevet", duration: "6 mois", icon: Palette },
    ],
  },
  {
    name: "Hôtellerie & Restauration",
    icon: ChefHat,
    color: "bg-primary",
    formations: [
      { title: "Cuisine et Restauration", details: "Formation théorique et pratique, stage et brevet", duration: "4 mois", icon: ChefHat },
      { title: "Pâtisserie et Boulangerie", details: "Formation théorique et pratique, stage et brevet", duration: "3 mois", icon: CakeSlice },
      { title: "Hôtesse de l'Air", details: "Formation théorique, stage, licence A320 et brevet", duration: "6 mois", icon: Plane },
      { title: "Hôtesse d'Accueil", details: "Formation théorique, stage et brevet", duration: "5 mois", icon: Users },
    ],
  },
  {
    name: "Métiers Techniques",
    icon: Wrench,
    color: "bg-red",
    formations: [
      { title: "Électricité Industrielle", details: "Formation spécialisée en électricité industrielle avec brevet", duration: "4 mois", icon: Factory },
      { title: "Électricité de Bâtiment", details: "Installation électrique résidentielle et brevet", duration: "4 mois", icon: Building2 },
      { title: "Plomberie", details: "Formation théorique et pratique avec brevet", duration: "3 mois", icon: Droplets },
      { title: "Soudure et Ajustage", details: "Formation théorique et pratique avec brevet", duration: "4 mois", icon: Flame },
      { title: "Menuiserie", details: "Formation théorique et pratique avec brevet", duration: "3 mois", icon: TreePine },
      { title: "Savonnerie", details: "Fabrication de savon, théorie et pratique avec brevet", duration: "3 mois", icon: Droplets },
    ],
  },
  {
    name: "Management & Gestion",
    icon: Briefcase,
    color: "bg-primary",
    formations: [
      { title: "Management des Finances", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: BarChart3 },
      { title: "Management des Projets", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: Briefcase },
      { title: "Management de la Logistique", details: "Logistique des entreprises, stage et brevet", duration: "4 mois", icon: Truck },
      { title: "Management de Gestion", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: Briefcase },
      { title: "Management du SI", details: "Système d'information, stage et brevet", duration: "4 mois", icon: Monitor },
      { title: "Management des RH", details: "Ressources humaines, stage et brevet", duration: "4 mois", icon: Users },
      { title: "Secrétariat de Direction", details: "Administration et secrétariat professionnel", duration: "2 mois", icon: FileText },
    ],
  },
  {
    name: "Entrepreneuriat & Commerce",
    icon: GraduationCap,
    color: "bg-red",
    formations: [
      { title: "Gestion des Entreprises", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: Building2 },
      { title: "Gestion de Projet", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: Briefcase },
      { title: "Gestion Marketing", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: BarChart3 },
      { title: "Gestion des RH", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: Users },
      { title: "Gestion Douanière", details: "Formation théorique, stage et brevet", duration: "4 mois", icon: FileText },
      { title: "Gestion Commerciale", details: "Administration commerciale, stage et brevet", duration: "4 mois", icon: Briefcase },
      { title: "Analyse Financière", details: "Formation théorique, stage et brevet", duration: "3 mois", icon: BarChart3 },
      { title: "Marketing", details: "Formation théorique et pratique avec brevet", duration: "3 mois", icon: BarChart3 },
    ],
  },
  {
    name: "Langues & Communication",
    icon: Languages,
    color: "bg-primary",
    formations: [
      { title: "Anglais", details: "Anglais professionnel pour le monde du travail", duration: "6 mois", icon: Languages },
      { title: "Français", details: "Perfectionnement en langue française", duration: "6 mois", icon: Languages },
    ],
  },
  {
    name: "Sécurité & Réglementation",
    icon: ShieldCheck,
    color: "bg-red",
    formations: [
      { title: "Hygiène et Sécurité au Travail", details: "Safety First — Formation certifiante en HSE", duration: "2 mois", icon: ShieldCheck },
      { title: "Douane et Fiscalité", details: "Formation théorique, stage et brevet", duration: "3 mois", icon: FileText },
      { title: "Logistique", details: "Formation théorique, stage et brevet", duration: "3 mois", icon: Truck },
      { title: "Agro-Alimentaire", details: "Transformation et conservation alimentaire", duration: "3 mois", icon: ChefHat },
    ],
  },
  {
    name: "Auto-École & Engins Lourds",
    icon: Car,
    color: "bg-primary",
    formations: [
      { title: "Petit Véhicule", details: "Formation théorique et pratique, permis de conduire et brevet", duration: "45 jours", icon: Car },
      { title: "Camion Benne Articulé", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Camion Benne Manuel", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Bulldozer", details: "Conduite d'engins lourds, permis et brevet", duration: "45 jours", icon: Truck },
      { title: "Chargeuse", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Pelle Hydraulique", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Tracteur Agricole", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Élévateur", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Tractopelle", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Camion-Citerne", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
      { title: "Compacteur", details: "Formation complète, permis de conduire et brevet", duration: "45 jours", icon: Truck },
    ],
  },
];

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const total = categories.reduce((sum, c) => sum + c.formations.length, 0);

  return (
    <section id="formations" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Nos programmes</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            Plus de {total} Formations Professionnelles
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Des formations pratiques et certifiantes dans {categories.length} domaines d'expertise. Chaque parcours inclut une formation théorique, une pratique encadrée et un brevet reconnu.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === i
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <cat.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{cat.name}</span>
              <span className="sm:hidden">{cat.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-6">
            {(() => {
              const Cat = categories[activeCategory];
              return (
                <>
                  <div className={`h-10 w-10 rounded-lg ${Cat.color} flex items-center justify-center`}>
                    <Cat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">{Cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{Cat.formations.length} formation{Cat.formations.length > 1 ? "s" : ""} disponible{Cat.formations.length > 1 ? "s" : ""}</p>
                  </div>
                </>
              );
            })()}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories[activeCategory].formations.map((f) => (
              <div
                key={f.title}
                className="group bg-background border rounded-xl p-5 hover:shadow-lg hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-sm text-foreground leading-tight mb-1">{f.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{f.details}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <BookOpen className="h-3 w-3" />
                      {f.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 bg-section-light rounded-2xl p-8 border">
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">Intéressé par une formation ?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Contactez-nous pour obtenir plus d'informations sur les inscriptions, les horaires et les modalités de paiement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/243816029419"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red text-red-foreground font-heading font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              Nous contacter
            </a>
            <a
              href="#contact"
              className="border border-primary text-primary font-heading font-bold px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
            >
              Demander une inscription
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
