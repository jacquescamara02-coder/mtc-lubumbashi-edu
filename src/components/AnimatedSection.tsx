import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

type Animation = "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: string;
  className?: string;
}

const animationClass: Record<Animation, string> = {
  "fade-in-up": "animate-fade-in-up",
  "fade-in-left": "animate-fade-in-left",
  "fade-in-right": "animate-fade-in-right",
  "scale-in": "animate-scale-in",
};

const AnimatedSection = ({
  children,
  animation = "fade-in-up",
  delay = "0ms",
  className,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animationClass[animation],
        className
      )}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
