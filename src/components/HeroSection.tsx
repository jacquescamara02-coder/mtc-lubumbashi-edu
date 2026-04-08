import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="accueil" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-primary/80" />
    <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
      <p className="text-sm md:text-base font-semibold uppercase tracking-widest mb-4 text-primary-foreground/80">
        Centre de Formation Professionnelle
      </p>
      <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
        MAMRE TRAINING<br />
        <span className="text-red">CENTER</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90 mb-8">
        Formez-vous aux métiers d'avenir avec MTC. Une formation de qualité pour un avenir professionnel réussi à Lubumbashi et dans le Haut-Katanga.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#formations" className="inline-flex items-center justify-center gap-2 bg-red text-red-foreground px-8 py-3.5 rounded-md font-heading font-bold text-base hover:opacity-90 transition-opacity">
          Nos Formations <ArrowRight className="h-5 w-5" />
        </a>
        <a href="#contact" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 rounded-md font-heading font-bold text-base hover:bg-primary-foreground/10 transition-colors">
          Nous Contacter
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
