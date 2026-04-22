import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Megaphone, Archive, Calendar, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import logo from "@/assets/logo-mtc.jpg";
import afficheAnglais2025 from "@/assets/affiche-anglais-2025.jpg";
import afficheEsthetique2025 from "@/assets/affiche-esthetique-2025.jpg";
import afficheCuisine2025 from "@/assets/affiche-cuisine-2025.jpg";
import afficheAutoEcole2025 from "@/assets/affiche-autoecole-2025.jpg";
import afficheInformatique2024 from "@/assets/affiche-informatique-2024.jpg";
import afficheManagement2025 from "@/assets/affiche-management-2025.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Affiche = {
  id: string;
  title: string;
  date: string;
  image: string;
  description?: string;
};

const currentAffiches: Affiche[] = [
  {
    id: "a1",
    title: "Nouvelle session de formations",
    date: "Avril 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80",
    description: "Inscriptions ouvertes pour toutes nos filières.",
  },
  {
    id: "a2",
    title: "Portes ouvertes MTC",
    date: "Mai 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    description: "Venez visiter nos sites et rencontrer nos formateurs.",
  },
  {
    id: "a3",
    title: "Formation Auto-École",
    date: "Avril 2026",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
    description: "Permis de conduire toutes catégories.",
  },
];

const announcements = [
  {
    id: "n1",
    title: "Reprise des cours",
    date: "15 avril 2026",
    body: "La rentrée académique est officiellement lancée. Bienvenue à tous nos nouveaux apprenants.",
  },
  {
    id: "n2",
    title: "Nouvelle filière : Cybersécurité",
    date: "10 avril 2026",
    body: "MTC ouvre une nouvelle formation certifiante en cybersécurité dès ce trimestre.",
  },
  {
    id: "n3",
    title: "Communiqué officiel",
    date: "1 avril 2026",
    body: "Mise à jour du calendrier des examens. Consultez le secrétariat pour les détails.",
  },
];

const archiveAffiches: Affiche[] = [
  {
    id: "ar1",
    title: "Session 2025 - Anglais",
    date: "Mars 2025",
    image: afficheAnglais2025,
  },
  {
    id: "ar2",
    title: "Session 2025 - Esthétique",
    date: "Juillet 2025",
    image: afficheEsthetique2025,
  },
  {
    id: "ar3",
    title: "Session 2025 - Cuisine",
    date: "Mars 2025",
    image: afficheCuisine2025,
  },
  {
    id: "ar4",
    title: "Session 2025 - Auto-école",
    date: "Décembre 2024",
    image: afficheAutoEcole2025,
  },
  {
    id: "ar5",
    title: "Session 2024 - Informatique",
    date: "Décembre 2024",
    image: afficheInformatique2024,
  },
  {
    id: "ar6",
    title: "Session 2025 - Management",
    date: "Mars 2025",
    image: afficheManagement2025,
  },
];

const AffichesPage = () => {
  const [preview, setPreview] = useState<Affiche | null>(null);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="MTC Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover" />
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-primary text-sm leading-tight block">MAMRE TRAINING CENTER</span>
              <span className="text-xs text-muted-foreground">Affiches & Annonces</span>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Retour à l'accueil</span>
            <span className="sm:hidden">Accueil</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Actualités MTC
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Nos affiches & annonces
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl">
            Retrouvez toutes nos campagnes, communiqués officiels et campagnes
            passées du Centre de Formation Mamre.
          </p>
        </div>
      </section>

      {/* Nouvelles affiches */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-10 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Megaphone className="h-5 w-5" />
                <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">Nouveautés</span>
              </div>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
                Nouvelles affiches publicitaires
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {currentAffiches.map((a) => (
              <button
                key={a.id}
                onClick={() => setPreview(a)}
                className="group text-left bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Nouveau
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {a.date}
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Annonces officielles */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Megaphone className="h-5 w-5" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">Communiqués</span>
            </div>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Annonces officielles
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {announcements.map((n) => (
              <article
                key={n.id}
                className="bg-card rounded-xl p-5 md:p-6 border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {n.date}
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-2">
                  {n.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{n.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Archives */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Archive className="h-5 w-5" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">Archives</span>
            </div>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Anciennes affiches
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
              Revivez nos précédentes campagnes et sessions de formation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {archiveAffiches.map((a) => (
              <button
                key={a.id}
                onClick={() => setPreview(a)}
                className="group text-left bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1">
                    <Calendar className="h-3 w-3" />
                    {a.date}
                  </div>
                  <h3 className="font-heading font-semibold text-sm md:text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background">
          {preview && (
            <div>
              <img src={preview.image} alt={preview.title} className="w-full max-h-[75vh] object-contain bg-black" />
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {preview.date}
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-foreground">{preview.title}</h3>
                {preview.description && (
                  <p className="text-sm text-muted-foreground mt-2">{preview.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
};

export default AffichesPage;