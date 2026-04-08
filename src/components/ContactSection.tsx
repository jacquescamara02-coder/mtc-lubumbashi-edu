import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Contactez-nous</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Restons en Contact</h2>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground">Adresse</h4>
              <p className="text-sm text-muted-foreground">Centre ville de Lubumbashi, Avenue Lomami coin des Usines, 1er niveau</p>
              <p className="text-sm text-muted-foreground">Quartier Makutano, Commune de Lubumbashi, Haut-Katanga</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground">Téléphone</h4>
              <a href="tel:+243816029419" className="text-sm text-primary hover:underline">+243 816 029 419</a>
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
        </div>

        <div className="bg-section-light rounded-xl p-8 border">
          <h3 className="font-heading font-bold text-lg text-foreground mb-4">Envoyez-nous un message</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input type="text" placeholder="Votre nom complet" className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="tel" placeholder="Votre numéro de téléphone" className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <select className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Choisir une formation</option>
              <option>Informatique & Bureautique</option>
              <option>Langues</option>
              <option>Électricité & Plomberie</option>
              <option>Gestion & Entrepreneuriat</option>
              <option>Électronique</option>
              <option>Coupe & Couture</option>
              <option>Comptabilité</option>
              <option>Logistique</option>
            </select>
            <textarea placeholder="Votre message" rows={3} className="w-full px-4 py-3 rounded-md border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <button type="submit" className="w-full bg-red text-red-foreground font-heading font-bold py-3 rounded-md hover:opacity-90 transition-opacity">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
