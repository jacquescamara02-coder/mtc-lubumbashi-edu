import { Star, Quote } from "lucide-react";
import { useSiteText, useSiteImage } from "@/hooks/useSiteContent";
import photo1 from "@/assets/testimonial-1.jpg";
import photo2 from "@/assets/testimonial-2.jpg";
import photo3 from "@/assets/testimonial-3.jpg";
import photo4 from "@/assets/testimonial-4.jpg";

const baseTestimonials = [
  {
    name: "Patrick Kabongo",
    formation: "Électricité Industrielle",
    photo: photo1,
    text: "Grâce à MTC, j'ai décroché un emploi dans une grande entreprise minière à Kolwezi seulement deux mois après ma formation. Les formateurs sont très compétents et la pratique est au rendez-vous.",
    rating: 5,
  },
  {
    name: "Grâce Mwamba",
    formation: "Coupe et Couture",
    photo: photo2,
    text: "MTC m'a permis de lancer mon propre atelier de couture. La formation était complète, du stylisme à la confection. Aujourd'hui, j'ai 3 employés et une clientèle fidèle.",
    rating: 5,
  },
  {
    name: "Olivier Kasongo",
    formation: "Conduite d'Engins Lourds",
    photo: photo3,
    text: "J'ai obtenu mon brevet de conducteur de bulldozer et j'ai été recruté directement sur un chantier. La formation pratique est vraiment ce qui fait la différence chez MTC.",
    rating: 5,
  },
  {
    name: "Esther Ilunga",
    formation: "Management des Projets",
    photo: photo4,
    text: "La formation en management m'a ouvert les portes du monde professionnel. J'occupe maintenant un poste de coordinatrice de projets dans une ONG internationale à Lubumbashi.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const eyebrow = useSiteText("testimonials.eyebrow", "Témoignages");
  const title = useSiteText("testimonials.title", "Ce que disent nos anciens étudiants");
  const subtitle = useSiteText("testimonials.subtitle", "Découvrez les parcours inspirants de ceux qui ont été formés chez MTC.");
  const p1 = useSiteImage("testimonials.photo_1", photo1);
  const p2 = useSiteImage("testimonials.photo_2", photo2);
  const p3 = useSiteImage("testimonials.photo_3", photo3);
  const p4 = useSiteImage("testimonials.photo_4", photo4);
  const photos = [p1, p2, p3, p4];
  const testimonials = baseTestimonials.map((t, i) => ({ ...t, photo: photos[i] }));
  return (
  <section className="section-padding bg-section-light">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">{eyebrow}</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto whitespace-pre-line">{subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-background rounded-xl border p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <Quote className="h-8 w-8 text-primary/20 mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.text}"</p>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t">
              <img
                src={t.photo}
                alt={t.name}
                loading="lazy"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-heading font-bold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-primary">{t.formation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default TestimonialsSection;
