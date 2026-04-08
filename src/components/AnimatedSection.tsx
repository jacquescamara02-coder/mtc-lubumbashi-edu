import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in";
  delay?: string;
  className?: string;
}

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
        isVisible && `animate-${animation}`,
        className
      )}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
