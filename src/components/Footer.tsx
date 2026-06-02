import { Facebook } from "lucide-react";
import logo from "@/assets/logo-mtc.jpg";
import { useSiteText } from "@/hooks/useSiteContent";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52V6.94a4.85 4.85 0 0 1-1.84-.25z" />
  </svg>
);

const Footer = () => {
  const tagline = useSiteText("footer.tagline", "Centre de Formation Professionnelle Mamre Training Center. Former pour transformer.");
  const facebookUrl = useSiteText("footer.facebook_url", "https://www.facebook.com/share/p/1EVc8mDhaw/");
  const tiktokUrl = useSiteText("footer.tiktok_url", "https://www.tiktok.com/@mamretrainingcenter");

  return (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="MTC Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-heading font-bold">MTC</span>
          </div>
          <p className="text-sm text-primary-foreground/70 mb-3">{tagline}</p>
          <div className="text-xs text-primary-foreground/50 space-y-0.5">
            <p>RCCM : CD/L'SHI/24-B-01324</p>
            <p>ID NAT : 05-P8501-N55251L</p>
            <p>N° Impôt : A2425544S</p>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Nos Domaines</h4>
          <ul className="space-y-1.5 text-sm text-primary-foreground/70">
            <li>Informatique & Multimédia</li>
            <li>Mode, Beauté & Couture</li>
            <li>Hôtellerie & Restauration</li>
            <li>Métiers Techniques</li>
            <li>Management & Gestion</li>
            <li>Auto-École & Engins Lourds</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Contact</h4>
          <ul className="space-y-1.5 text-sm text-primary-foreground/70">
            <li>Q. Makomeno, Av. Lomami coin des Usines, N°04</li>
            <li>Commune de Lubumbashi, Haut-Katanga</li>
            <li>+243 816 029 419</li>
            <li>+243 993 132 628</li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
            >
              <Facebook className="h-5 w-5" />
              Suivez-nous
            </a>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
            >
              <TikTokIcon className="h-5 w-5" />
              TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} Mamre Training Center. Tous droits réservés.
      </div>
    </div>
  </footer>
  );
};

export default Footer;
