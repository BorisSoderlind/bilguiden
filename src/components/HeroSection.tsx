import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  comparison: {
    car1: string;
    car2: string;
    car1Image: string;
    car2Image: string;
    category: string;
    teaser: string;
  };
}

const HeroSection = ({ comparison }: HeroSectionProps) => {
  return (
    <section className="relative bg-hero overflow-hidden">
      {/* Diagonal accent stripe */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-20" />
      
      <div className="container relative py-12 lg:py-20">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 mb-6 animate-slide-up">
          <Zap className="h-4 w-4" />
          <span className="font-display text-sm tracking-wide">{comparison.category}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-primary-foreground mb-6 animate-slide-up delay-100">
          <span className="block">{comparison.car1}</span>
          <span className="text-accent">VS</span>
          <span className="block">{comparison.car2}</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 animate-slide-up delay-200">
          {comparison.teaser}
        </p>

        <Button 
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-display text-lg tracking-wide animate-slide-up delay-300 group"
        >
          Läs jämförelsen
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Car images */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:gap-8">
          <div className="relative animate-slide-in-right delay-200">
            <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-lg" />
            <img
              src={comparison.car1Image}
              alt={comparison.car1}
              className="relative w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg shadow-hover"
            />
            <div className="absolute bottom-4 left-4 bg-foreground/90 text-primary-foreground px-4 py-2">
              <span className="font-display text-sm tracking-wide">{comparison.car1}</span>
            </div>
          </div>
          <div className="relative animate-slide-in-right delay-300">
            <div className="absolute -inset-2 bg-accent/20 blur-xl rounded-lg" />
            <img
              src={comparison.car2Image}
              alt={comparison.car2}
              className="relative w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg shadow-hover"
            />
            <div className="absolute bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2">
              <span className="font-display text-sm tracking-wide">{comparison.car2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-accent" />
    </section>
  );
};

export default HeroSection;
