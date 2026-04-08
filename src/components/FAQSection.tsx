import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quelles sont les conditions d'inscription ?",
    a: "L'inscription est ouverte à toute personne motivée, sans condition de diplôme pour la plupart des formations. Il suffit de se présenter au centre avec une pièce d'identité, deux photos passeport et les frais d'inscription.",
  },
  {
    q: "Est-ce que je reçois un brevet à la fin de la formation ?",
    a: "Oui, chaque formation aboutit à la délivrance d'un brevet professionnel reconnu. Pour l'auto-école, vous recevez également un permis de conduire officiel.",
  },
  {
    q: "Quelle est la durée moyenne des formations ?",
    a: "La durée varie selon le programme : de 45 jours pour la conduite d'engins lourds, 2 à 3 mois pour les formations courtes (bureautique, langues), jusqu'à 6 mois pour les formations complètes (couture, stylisme, hôtesse de l'air).",
  },
  {
    q: "Les formations incluent-elles des stages pratiques ?",
    a: "Oui, la majorité de nos formations incluent un stage pratique encadré. Nous privilégions l'apprentissage par la pratique pour garantir une insertion professionnelle rapide.",
  },
  {
    q: "Où se trouvent vos centres de formation ?",
    a: "Notre siège principal est à Lubumbashi (Q. Makomeno, Av. Lomami coin des Usines, N°04). Nous avons également des sites à Kolwezi et Likasi.",
  },
  {
    q: "Les inscriptions sont-elles ouvertes toute l'année ?",
    a: "Oui, nous acceptons les inscriptions tout au long de l'année. De nouvelles sessions démarrent régulièrement. Contactez-nous par WhatsApp pour connaître la prochaine date de début.",
  },
  {
    q: "Comment puis-je payer ma formation ?",
    a: "Le paiement peut se faire en une ou plusieurs tranches. Nous acceptons les paiements en espèces au centre ou par mobile money. Contactez-nous pour discuter des modalités.",
  },
  {
    q: "Y a-t-il un accompagnement après la formation ?",
    a: "Oui, MTC accompagne ses diplômés dans leur insertion professionnelle grâce à un réseau de partenaires et entreprises locales.",
  },
];

const FAQSection = () => (
  <section id="faq" className="section-padding bg-section-light">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">FAQ</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Questions Fréquentes</h2>
        <p className="text-muted-foreground mt-3">Tout ce que vous devez savoir avant de vous inscrire.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-background border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow">
            <AccordionTrigger className="font-heading font-semibold text-foreground text-left hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
