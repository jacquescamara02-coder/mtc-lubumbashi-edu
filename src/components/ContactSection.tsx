import { useState } from "react";
import { Phone, MapPin, MessageCircle, FileText, Send } from "lucide-react";

const formationOptions = [
  "Informatique & Multimédia",
  "Coupe et Couture",
  "Mode et Stylisme",
  "Esthétique et Coiffure",
  "Cuisine et Restauration",
  "Pâtisserie et Boulangerie",
  "Électricité Industrielle",
  "Électricité de Bâtiment",
  "Plomberie",
  "Soudure et Ajustage",
  "Menuiserie",
  "Management & Gestion",
  "Entrepreneuriat & Commerce",
  "Anglais",
  "Français",
  "Hôtesse de l'Air",
  "Hôtesse d'Accueil",
  "Hygiène et Sécurité au Travail",
  "Douane et Fiscalité",
  "Logistique",
  "Auto-École & Engins Lourds",
];

const ContactSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formation, setFormation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `📋 *DEMANDE D'INSCRIPTION — MTC*\n\n👤 *Nom :* ${name}\n📞 *Téléphone :* ${phone}\n🎓 *Formation :* ${formation || "Non précisée"}\n\n💬 *Message :*\n${message || "Aucun message"}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/243816029419?text=${encoded}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Contactez-nous</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Restons en Contact</h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Adresse</h4>
                <p className="text-sm text-muted-foreground">Q. Makomeno, Av. Lomami coin des Usines, N°04</p>
                <p className="text-sm text-muted-foreground">Commune de Lubumbashi, Haut-Katanga, RDC</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Téléphone</h4>
                <a href="tel:+243816029419" className="text-sm text-primary hover:underline block">+243 816 029 419</a>
                <a href="tel:+243993132628" className="text-sm text-primary hover:underline block">+243 993 132 628</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">WhatsApp</h4>
                <a href="https://wa.me/243816029419" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  Écrivez-nous sur WhatsApp
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">Informations légales</h4>
                <p className="text-xs text-muted-foreground">RCCM : CD/L'SHI/24-B-01324</p>
                <p className="text-xs text-muted-foreground">ID NAT : 05-P8501-N55251L</p>
                <p className="text-xs text-muted-foreground">N° Impôt : A2425544S</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border h-52">
              <iframe
                title="MTC Lubumbashi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.5!2d27.4739!3d-11.6644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM5JzUxLjgiUyAyN8KwMjgnMjYuMCJF!5e0!3m2!1sfr!2scd!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-section-light rounded-xl p-8 border">
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">Envoyez-nous un message</h3>
            <p className="text-xs text-muted-foreground mb-5">Le formulaire sera envoyé directement sur notre WhatsApp.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Votre nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                required
                placeholder="Votre numéro de téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={formation}
                onChange={(e) => setFormation(e.target.value)}
                className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Choisir une formation</option>
                {formationOptions.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
              <textarea
                placeholder="Votre message (optionnel)"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <button
                type="submit"
                className="w-full bg-red text-red-foreground font-heading font-bold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Envoyer via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
