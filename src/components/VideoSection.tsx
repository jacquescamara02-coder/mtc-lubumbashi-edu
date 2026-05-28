import videoMtc from "@/assets/video-mtc.mp4";
import { useSiteText, useSiteImage } from "@/hooks/useSiteContent";

const VideoSection = () => {
  const src = useSiteImage("video.main", videoMtc);
  const eyebrow = useSiteText("video.eyebrow", "Découvrez MTC");
  const title = useSiteText("video.title", "Notre Centre en Vidéo");
  const subtitle = useSiteText("video.subtitle", "Plongez au cœur de Mamre Training Center et découvrez nos installations, nos formations et l'ambiance qui fait notre force.");
  return (
  <section className="section-padding bg-muted/30">
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-red mb-2">{eyebrow}</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto whitespace-pre-line">{subtitle}</p>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
        <video
          src={src}
          key={src}
          controls
          playsInline
          preload="metadata"
          className="w-full aspect-video bg-black"
          poster=""
        >
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
    </div>
  </section>
  );
};

export default VideoSection;
