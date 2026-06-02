import { useState } from "react";
import { useSiteText } from "@/hooks/useSiteContent";
import { Smartphone, Building2, Banknote, Copy, Check, ChevronRight, GraduationCap, Receipt, CreditCard, ArrowLeft } from "lucide-react";

const formations = [
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

const feeTypes = [
  { label: "Frais d'inscription", icon: Receipt },
  { label: "Frais de formation (mensualité)", icon: CreditCard },
  { label: "Frais d'examen", icon: GraduationCap },
];

const paymentMethods = [
  {
    icon: Smartphone,
    title: "Vodacom M-Pesa",
    color: "bg-red-500/10 text-red-600",
    details: [
      { label: "Numéro", value: "+243 816 029 419", copyable: true },
      { label: "Nom", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Envoyez le montant via M-Pesa, puis partagez la capture d'écran sur WhatsApp.",
  },
  {
    icon: Smartphone,
    title: "Airtel Money",
    color: "bg-red-500/10 text-red-600",
    details: [
      { label: "Numéro", value: "+243 993 132 628", copyable: true },
      { label: "Nom", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Transférez via Airtel Money, puis envoyez la confirmation sur WhatsApp.",
  },
  {
    icon: Smartphone,
    title: "Orange Money",
    color: "bg-orange-500/10 text-orange-600",
    details: [
      { label: "Numéro", value: "+243 816 029 419", copyable: true },
      { label: "Nom", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Transférez via Orange Money, puis confirmez sur WhatsApp.",
  },
  {
    icon: Building2,
    title: "Virement Bancaire",
    color: "bg-blue-500/10 text-blue-600",
    details: [
      { label: "Banque", value: "Rawbank" },
      { label: "Titulaire", value: "MAMRE TRAINING CENTER" },
      { label: "Info", value: "Contactez-nous pour les détails" },
    ],
    instructions: "Contactez-nous pour obtenir les coordonnées bancaires complètes.",
  },
  {
    icon: Banknote,
    title: "Espèces au centre",
    color: "bg-green-500/10 text-green-600",
    details: [
      { label: "Lieu", value: "Centre MTC" },
      { label: "Adresse", value: "Q. Makomeno, Av. Lomami" },
    ],
    instructions: "Rendez-vous directement au centre pour payer en espèces.",
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="ml-2 text-muted-foreground hover:text-primary transition-colors" title="Copier">
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

const steps = [
  { number: 1, label: "Formation" },
  { number: 2, label: "Type de frais" },
  { number: 3, label: "Paiement" },
];

const PaymentSection = () => {
  const [step, setStep] = useState(1);
  const [selectedFormation, setSelectedFormation] = useState("");
  const [selectedFee, setSelectedFee] = useState("");

  const eyebrow = useSiteText("payment.eyebrow", "Paiement");
  const title = useSiteText("payment.title", "Effectuez Votre Paiement");
  const subtitle = useSiteText(
    "payment.subtitle",
    "Suivez les étapes ci-dessous pour régler vos frais de formation en toute simplicité."
  );

  const handleFormationSelect = (f: string) => {
    setSelectedFormation(f);
    setStep(2);
  };

  const handleFeeSelect = (f: string) => {
    setSelectedFee(f);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) { setStep(1); setSelectedFormation(""); }
    if (step === 3) { setStep(2); setSelectedFee(""); }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedFormation("");
    setSelectedFee("");
  };

  return (
    <section id="paiement" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">{eyebrow}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-10">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step >= s.number
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                  </div>
                  <span className={`text-xs mt-2 font-semibold transition-colors ${step >= s.number ? "text-primary" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${step > s.number ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Back button */}
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Retour
            </button>
          )}

          {/* Step 1: Choose Formation */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Choisissez votre formation</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {formations.map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFormationSelect(f)}
                    className="flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card text-left text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <span>{f}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Fee Type */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="bg-muted/50 rounded-xl px-5 py-3 mb-6 text-sm">
                <span className="text-muted-foreground">Formation :</span>{" "}
                <span className="font-semibold text-foreground">{selectedFormation}</span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quel type de frais souhaitez-vous régler ?</h3>
              <div className="grid gap-3">
                {feeTypes.map((ft) => (
                  <button
                    key={ft.label}
                    onClick={() => handleFeeSelect(ft.label)}
                    className="flex items-center gap-4 px-5 py-5 rounded-xl border border-border bg-card text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ft.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground text-sm">{ft.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Payment Methods */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="bg-muted/50 rounded-xl px-5 py-3 mb-6 text-sm space-y-1">
                <div>
                  <span className="text-muted-foreground">Formation :</span>{" "}
                  <span className="font-semibold text-foreground">{selectedFormation}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Frais :</span>{" "}
                  <span className="font-semibold text-foreground">{selectedFee}</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Choisissez votre moyen de paiement</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.title}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-10 w-10 rounded-xl ${method.color} flex items-center justify-center`}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-heading font-bold text-foreground text-sm">{method.title}</h4>
                    </div>
                    <div className="space-y-2 mb-3">
                      {method.details.map((d) => (
                        <div key={d.label} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{d.label}</span>
                          <span className="font-medium text-foreground flex items-center">
                            {d.value}
                            {d.copyable && <CopyButton text={d.value} />}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                      {method.instructions}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold">
                  <Smartphone className="h-4 w-4" />
                  Après paiement, envoyez la preuve sur WhatsApp : +243 816 029 419
                </div>
                <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-primary transition-colors underline">
                  Recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
