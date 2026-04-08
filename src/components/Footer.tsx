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
          <p className="text-sm text-primary-foreground/70">Centre de Formation Professionnelle Mamre Training Center. Former pour transformer.</p>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Formations</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>Informatique & Bureautique</li>
            <li>Langues</li>
            <li>Électricité & Plomberie</li>
            <li>Gestion & Entrepreneuriat</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>Av. Lomami coin des Usines, Lubumbashi</li>
            <li>+243 816 029 419</li>
            <li>Haut-Katanga, RDC</li>
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
