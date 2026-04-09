import { useState, useEffect } from "react";
import { Phone, MapPin, MessageCircle, FileText, Send, UserPlus, Mail } from "lucide-react";

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

type Tab = "info" | "inscription";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

const ContactSection = () => {
  const [tab, setTab] = useState<Tab>("info");

  useEffect(() => {
    const handler = () => setTab("inscription");
    window.addEventListener("switch-to-inscription", handler);
    return () => window.removeEventListener("switch-to-inscription", handler);
  }, []);

  // Info form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formation, setFormation] = useState("");
  const [message, setMessage] = useState("");

  // Inscription form
  const [insNom, setInsNom] = useState("");
  const [insPostnom, setInsPostnom] = useState("");
  const [insPrenom, setInsPrenom] = useState("");
  const [insSexe, setInsSexe] = useState("");
  const [insAge, setInsAge] = useState("");
  const [insPhone, setInsPhone] = useState("");
  const [insEmail, setInsEmail] = useState("");
  const [insFormation, setInsFormation] = useState("");
  const [insNiveau, setInsNiveau] = useState("");
  const [insSite, setInsSite] = useState("");

  const handleInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `📋 *DEMANDE D'INFORMATION — MTC*\n\n👤 *Nom :* ${name}\n📞 *Téléphone :* ${phone}\n🎓 *Formation souhaitée :* ${formation || "Non précisée"}\n\n💬 *Message :*\n${message || "Aucun message"}`;
    window.open(`https://wa.me/243816029419?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `📝 *INSCRIPTION EN LIGNE — MTC*\n\n👤 *Nom :* ${insNom}\n👤 *Post-nom :* ${insPostnom}\n👤 *Prénom :* ${insPrenom}\n⚧ *Sexe :* ${insSexe}\n🎂 *Âge :* ${insAge} ans\n📞 *Téléphone :* ${insPhone}\n📧 *Email :* ${insEmail || "Non renseigné"}\n🎓 *Formation choisie :* ${insFormation}\n📚 *Niveau d'études :* ${insNiveau}\n📍 *Site souhaité :* ${insSite}`;
    window.open(`https://wa.me/243816029419?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Contactez-nous</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Restons en Contact</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">Demandez des informations sur nos formations ou inscrivez-vous directement en ligne.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Info colonne gauche */}
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

          {/* Formulaires à droite */}
          <div className="bg-section-light rounded-xl border overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setTab("info")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-heading font-semibold transition-colors ${
                  tab === "info"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Mail className="h-4 w-4" />
                Demande d'info
              </button>
              <button
                onClick={() => setTab("inscription")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-heading font-semibold transition-colors ${
                  tab === "inscription"
                    ? "bg-red text-red-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                Inscription en ligne
              </button>
            </div>

            <div className="p-6 md:p-8">
              {tab === "info" ? (
                <>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">Besoin d'informations ?</h3>
                  <p className="text-xs text-muted-foreground mb-5">Remplissez le formulaire et nous vous répondrons sur WhatsApp.</p>
                  <form onSubmit={handleInfo} className="space-y-4">
                    <input type="text" required placeholder="Votre nom complet" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                    <input type="tel" required placeholder="Votre numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                    <select value={formation} onChange={(e) => setFormation(e.target.value)} className={inputClass}>
                      <option value="">Formation qui vous intéresse</option>
                      {formationOptions.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                    <textarea placeholder="Votre question ou message (optionnel)" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-none`} />
                    <button type="submit" className="w-full bg-primary text-primary-foreground font-heading font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      Envoyer via WhatsApp
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">Inscrivez-vous en ligne</h3>
                  <p className="text-xs text-muted-foreground mb-5">Remplissez ce formulaire pour réserver votre place. Votre inscription sera confirmée par WhatsApp.</p>
                  <form onSubmit={handleInscription} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" required placeholder="Nom" value={insNom} onChange={(e) => setInsNom(e.target.value)} className={inputClass} />
                      <input type="text" required placeholder="Post-nom" value={insPostnom} onChange={(e) => setInsPostnom(e.target.value)} className={inputClass} />
                    </div>
                    <input type="text" required placeholder="Prénom" value={insPrenom} onChange={(e) => setInsPrenom(e.target.value)} className={inputClass} />
                    <div className="grid grid-cols-2 gap-3">
                      <select required value={insSexe} onChange={(e) => setInsSexe(e.target.value)} className={inputClass}>
                        <option value="">Sexe</option>
                        <option>Masculin</option>
                        <option>Féminin</option>
                      </select>
                      <input type="number" required placeholder="Âge" min="10" max="80" value={insAge} onChange={(e) => setInsAge(e.target.value)} className={inputClass} />
                    </div>
                    <input type="tel" required placeholder="Numéro de téléphone" value={insPhone} onChange={(e) => setInsPhone(e.target.value)} className={inputClass} />
                    <input type="email" placeholder="Email (optionnel)" value={insEmail} onChange={(e) => setInsEmail(e.target.value)} className={inputClass} />
                    <select required value={insFormation} onChange={(e) => setInsFormation(e.target.value)} className={inputClass}>
                      <option value="">Choisir une formation</option>
                      {formationOptions.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                    <select required value={insNiveau} onChange={(e) => setInsNiveau(e.target.value)} className={inputClass}>
                      <option value="">Niveau d'études</option>
                      <option>Primaire</option>
                      <option>Secondaire (Diplômé d'État)</option>
                      <option>Universitaire (Graduat)</option>
                      <option>Universitaire (Licence)</option>
                      <option>Autre</option>
                    </select>
                    <select required value={insSite} onChange={(e) => setInsSite(e.target.value)} className={inputClass}>
                      <option value="">Site souhaité</option>
                      <option>Lubumbashi</option>
                      <option>Kolwezi</option>
                      <option>Likasi</option>
                    </select>
                    <button type="submit" className="w-full bg-red text-red-foreground font-heading font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      S'inscrire via WhatsApp
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
