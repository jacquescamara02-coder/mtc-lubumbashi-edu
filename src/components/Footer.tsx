import logo from "@/assets/logo-mtc.jpg";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="MTC Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-heading font-bold">MTC</span>
          </div>
          <p className="text-sm text-primary-foreground/70 mb-3">Centre de Formation Professionnelle Mamre Training Center. Former pour transformer.</p>
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
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} Mamre Training Center. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
