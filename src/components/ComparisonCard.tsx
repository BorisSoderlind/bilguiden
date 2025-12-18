import { ArrowRight } from "lucide-react";

interface ComparisonCardProps {
  car1: string;
  car2: string;
  image: string;
  category: string;
  excerpt: string;
  date: string;
  index?: number;
}

const ComparisonCard = ({ car1, car2, image, category, excerpt, date, index = 0 }: ComparisonCardProps) => {
  return (
    <article 
      className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 animate-scale-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${car1} vs ${car2}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1">
          <span className="font-display text-xs tracking-wide">{category}</span>
        </div>
        {/* VS overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="font-display text-xl text-primary-foreground">
            {car1} <span className="text-accent">VS</span> {car2}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{date}</span>
          <button className="flex items-center gap-1 text-primary font-display text-sm tracking-wide group-hover:text-accent transition-colors">
            Läs mer
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </article>
  );
};

export default ComparisonCard;
