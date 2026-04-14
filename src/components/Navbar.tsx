import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo-mtc.jpg";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Formations", href: "#formations" },
  { label: "Paiement", href: "#paiement" },
  { label: "Nos Sites", href: "#sites" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <a href="#accueil" className="flex items-center gap-3">
          <img src={logo} alt="MTC Logo" className="h-12 w-12 rounded-full object-cover" />
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-primary text-sm leading-tight block">MAMRE TRAINING CENTER</span>
            <span className="text-xs text-muted-foreground">Centre de Formation Professionnelle</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:+243816029419" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
            <Phone className="h-4 w-4" /> Appelez-nous
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t px-4 pb-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-foreground hover:text-primary border-b border-border last:border-0">
              {l.label}
            </a>
          ))}
          <a href="tel:+243816029419" className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold w-full justify-center">
            <Phone className="h-4 w-4" /> Appelez-nous
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
