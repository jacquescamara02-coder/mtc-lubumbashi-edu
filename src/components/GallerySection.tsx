import { useState } from "react";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const photos = [
  { src: gallery1, alt: "Cérémonie de remise des brevets", span: "col-span-2" },
  { src: gallery2, alt: "Bâtiment du centre MTC", span: "row-span-2" },
  { src: gallery3, alt: "Atelier de soudure", span: "" },
  { src: gallery7, alt: "Formation en coiffure et esthétique", span: "row-span-2" },
  { src: gallery8, alt: "Photo de groupe étudiants et formateurs", span: "col-span-2" },
  { src: gallery4, alt: "Atelier pratique au centre", span: "" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="galerie" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">Galerie</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Nos Activités en Images</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Découvrez l'environnement d'apprentissage, les ateliers pratiques et la vie au sein du centre MTC.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`${p.span} rounded-xl overflow-hidden cursor-pointer group relative`}
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
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white hover:text-white/70 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
