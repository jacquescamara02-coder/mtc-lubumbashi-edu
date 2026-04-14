import { Smartphone, Building2, Banknote, Copy, Check } from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  {
    icon: Smartphone,
    title: "Vodacom M-Pesa",
    color: "bg-red-500/10 text-red-600",
    details: [
      { label: "Numéro", value: "+243 816 029 419" },
      { label: "Nom", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Envoyez le montant via M-Pesa au numéro ci-dessus, puis partagez la capture d'écran sur WhatsApp.",
  },
  {
    icon: Smartphone,
    title: "Airtel Money",
    color: "bg-red-500/10 text-red-600",
    details: [
      { label: "Numéro", value: "+243 993 132 628" },
      { label: "Nom", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Effectuez le transfert via Airtel Money, puis envoyez la confirmation sur WhatsApp.",
  },
  {
    icon: Smartphone,
    title: "Orange Money",
    color: "bg-orange-500/10 text-orange-600",
    details: [
      { label: "Numéro", value: "+243 816 029 419" },
      { label: "Nom", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Transférez via Orange Money au numéro indiqué, puis confirmez sur WhatsApp.",
  },
  {
    icon: Building2,
    title: "Virement Bancaire",
    color: "bg-blue-500/10 text-blue-600",
    details: [
      { label: "Banque", value: "Rawbank" },
      { label: "Compte", value: "Contactez-nous pour les détails" },
      { label: "Titulaire", value: "MAMRE TRAINING CENTER" },
    ],
    instructions: "Contactez-nous pour obtenir les coordonnées bancaires complètes.",
  },
  {
    icon: Banknote,
    title: "Paiement en espèces",
    color: "bg-green-500/10 text-green-600",
    details: [
      { label: "Lieu", value: "Au centre MTC" },
      { label: "Adresse", value: "Q. Makomeno, Av. Lomami coin des Usines, N°04" },
    ],
    instructions: "Rendez-vous directement au centre pour effectuer votre paiement en espèces.",
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="ml-2 text-muted-foreground hover:text-primary transition-colors" title="Copier">
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

const PaymentSection = () => (
  <section id="paiement" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Paiement</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Moyens de Paiement</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Plusieurs options de paiement sont disponibles pour faciliter votre inscription et le règlement de vos frais de formation.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-11 w-11 rounded-xl ${method.color} flex items-center justify-center`}>
                <method.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground">{method.title}</h3>
            </div>

            <div className="space-y-2 mb-4">
              {method.details.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="font-medium text-foreground flex items-center">
                    {d.value}
                    {d.label === "Numéro" && <CopyButton text={d.value.replace(/\s/g, "")} />}
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

      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold">
          <Smartphone className="h-4 w-4" />
          Après paiement, envoyez la preuve sur WhatsApp : +243 816 029 419
        </div>
      </div>
    </div>
  </section>
);

export default PaymentSection;
