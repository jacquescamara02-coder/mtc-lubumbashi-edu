import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galleryCeremony from "@/assets/gallery-ceremony.jpg";
import galleryMakeup1 from "@/assets/gallery-makeup1.jpg";
import galleryMakeup2 from "@/assets/gallery-makeup2.jpg";
import galleryMakeup3 from "@/assets/gallery-makeup3.jpg";
import galleryMakeup4 from "@/assets/gallery-makeup4.jpg";
import galleryMakeup5 from "@/assets/gallery-makeup5.jpg";
import galleryMakeup6 from "@/assets/gallery-makeup6.jpg";
import galleryMakeup7 from "@/assets/gallery-makeup7.jpg";
import galleryMakeup8 from "@/assets/gallery-makeup8.jpg";
import galleryCoiffure1 from "@/assets/gallery-coiffure1.jpg";
import galleryCoiffure2 from "@/assets/gallery-coiffure2.jpg";
import galleryCoiffure3 from "@/assets/gallery-coiffure3.jpg";
import galleryAutoecole1 from "@/assets/gallery-autoecole1.jpg";
import galleryAutoecole2 from "@/assets/gallery-autoecole2.jpg";
import galleryCeremonie2 from "@/assets/gallery-ceremonie2.jpg";
import galleryCeremonie3 from "@/assets/gallery-ceremonie3.jpg";
import galleryCeremonie4 from "@/assets/gallery-ceremonie4.jpg";
import galleryCeremonie5 from "@/assets/gallery-ceremonie5.jpg";
import galleryCeremonie6 from "@/assets/gallery-ceremonie6.jpg";
import galleryCeremonie7 from "@/assets/gallery-ceremonie7.jpg";
import galleryCeremonie8 from "@/assets/gallery-ceremonie8.jpg";
import galleryCeremonie9 from "@/assets/gallery-ceremonie9.jpg";
import galleryCeremonie10 from "@/assets/gallery-ceremonie10.jpg";
import galleryCentre1 from "@/assets/gallery-centre1.jpg";
import galleryCentre2 from "@/assets/gallery-centre2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

type Category = "all" | "ceremonie" | "coiffure" | "maquillage" | "autoecole" | "centre";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "ceremonie", label: "Cérémonies" },
  { key: "coiffure", label: "Coiffure" },
  { key: "maquillage", label: "Maquillage & Esthétique" },
  { key: "autoecole", label: "Auto-École" },
  { key: "centre", label: "Le Centre" },
];

const photos: { src: string; alt: string; category: Category; span?: string }[] = [
  // Cérémonies
  { src: galleryCeremony, alt: "Cérémonie de remise des diplômes – photo de groupe", category: "ceremonie", span: "col-span-2" },
  { src: gallery1, alt: "Cérémonie de remise des brevets", category: "ceremonie" },
  { src: galleryCeremonie3, alt: "Diplômées en esthétique – toges noires", category: "ceremonie" },
  { src: galleryCeremonie6, alt: "Diplômées en esthétique – promotion MTC", category: "ceremonie", span: "col-span-2" },
  { src: galleryCeremonie4, alt: "Diplômées en coupe & couture – toges bleues", category: "ceremonie" },
  { src: galleryCeremonie5, alt: "Diplômées en anglais – remise de diplômes", category: "ceremonie" },
  { src: galleryCeremonie7, alt: "Diplômés – promotion masculine en toges bleues", category: "ceremonie", span: "col-span-2" },
  { src: galleryCeremonie2, alt: "Animation lors de la cérémonie MTC", category: "ceremonie" },
  { src: galleryCeremonie8, alt: "Diplômés en formation technique – toges bleues", category: "ceremonie" },
  { src: galleryCeremonie9, alt: "Lauréates avec diplômes et bouquets de fleurs", category: "ceremonie", span: "col-span-2" },
  { src: galleryCeremonie10, alt: "Photo de groupe – cérémonie de remise des brevets MTC", category: "ceremonie", span: "col-span-2" },
  // Maquillage
  { src: galleryMakeup1, alt: "Atelier maquillage – pratique entre étudiantes", category: "maquillage" },
  { src: galleryMakeup2, alt: "Résultat maquillage professionnel", category: "maquillage" },
  { src: galleryMakeup3, alt: "Pratique de maquillage en duo", category: "maquillage", span: "col-span-2" },
  { src: galleryMakeup4, alt: "Étudiante en esthétique – résultat final", category: "maquillage" },
  { src: galleryMakeup5, alt: "Maquillage de soirée – rendu professionnel", category: "maquillage" },
  { src: galleryMakeup6, alt: "Maquillage artistique – étudiante MTC", category: "maquillage" },
  { src: galleryMakeup7, alt: "Nail art et maquillage – résultat complet", category: "maquillage", span: "col-span-2" },
  { src: galleryMakeup8, alt: "Maquillage des yeux – technique professionnelle", category: "maquillage" },
  // Coiffure
  { src: galleryCoiffure1, alt: "Atelier coiffure – technique de brushing", category: "coiffure" },
  { src: galleryCoiffure2, alt: "Pratique de coiffure – peignage professionnel", category: "coiffure" },
  { src: galleryCoiffure3, alt: "Formation coiffure – mise en plis", category: "coiffure", span: "col-span-2" },
  // Auto-école
  { src: galleryAutoecole1, alt: "Formateur auto-école MTC – présentation", category: "autoecole" },
  { src: galleryAutoecole2, alt: "Cours de code de la route – tableau blanc", category: "autoecole" },
  // Centre
  { src: galleryCentre1, alt: "Étudiante MTC – tenue de cérémonie", category: "centre" },
  { src: galleryCentre2, alt: "Formateur MTC – métiers techniques", category: "centre" },
  { src: gallery2, alt: "Bâtiment du centre MTC", category: "centre" },
  { src: gallery3, alt: "Atelier de soudure", category: "centre" },
  { src: gallery4, alt: "Atelier pratique au centre", category: "centre" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all" ? photos : photos.filter((p) => p.category === activeCategory);

  const navigateLightbox = (dir: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox === null) return;
    const newIndex = lightbox + dir;
    if (newIndex >= 0 && newIndex < filtered.length) setLightbox(newIndex);
  };

  return (
    <section id="galerie" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Galerie</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Nos Activités en Images</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Découvrez l'environnement d'apprentissage, les ateliers pratiques et la vie au sein du centre MTC.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setLightbox(null); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {filtered.map((p, i) => (
            <div
              key={`${activeCategory}-${i}`}
              className={`${p.span || ""} rounded-xl overflow-hidden cursor-pointer group relative animate-fade-in`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                <p className="text-white text-sm font-heading font-semibold p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {p.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white hover:text-white/70 transition-colors">
            <X className="h-8 w-8" />
          </button>
          {lightbox > 0 && (
            <button onClick={(e) => navigateLightbox(-1, e)} className="absolute left-4 text-white hover:text-white/70 transition-colors">
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}
          {lightbox < filtered.length - 1 && (
            <button onClick={(e) => navigateLightbox(1, e)} className="absolute right-4 text-white hover:text-white/70 transition-colors">
              <ChevronRight className="h-10 w-10" />
            </button>
          )}
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-white text-sm font-heading font-semibold bg-black/50 px-4 py-2 rounded-full">
            {filtered[lightbox].alt}
          </p>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
