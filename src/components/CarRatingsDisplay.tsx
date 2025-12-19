import { Brain, Wrench, Heart, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SubRating {
  name: string;
  weight: number;
  score: number;
}

interface CategoryRating {
  name: string;
  score: number;
  subRatings: SubRating[];
}

interface MainRatingData {
  name: "IQ" | "TQ" | "EQ";
  fullName: string;
  score: number;
  categories: CategoryRating[];
}

interface CarRatingsDisplayProps {
  carName: string;
  ratings: {
    iq: MainRatingData;
    tq: MainRatingData;
    eq: MainRatingData;
    totalScore: number;
  };
}

const RatingBar = ({ score, max = 5 }: { score: number; max?: number }) => {
  const percentage = (score / max) * 100;
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8 text-right text-foreground">{score.toFixed(1)}</span>
    </div>
  );
};

const RatingStars = ({ score }: { score: number }) => {
  return (
    <div className="flex gap-0.5 w-24 flex-shrink-0">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-4 h-4 transition-colors",
            star <= Math.round(score) 
              ? "fill-primary text-primary" 
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
};

const CategorySection = ({ category }: { category: CategoryRating }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="font-medium text-foreground w-40 flex-shrink-0 text-left">{category.name}</span>
          <RatingStars score={category.score} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-black font-bold">{category.score.toFixed(1)}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-5 pt-2 space-y-3 bg-gray-50">
          {category.subRatings.map((sub) => (
            <div key={sub.name} className="flex items-center gap-4 text-sm py-1">
              <span className="text-gray-600 w-40 flex-shrink-0 text-left">
                {sub.name}
              </span>
              <RatingBar score={sub.score} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MainRatingSection = ({ rating }: { rating: MainRatingData }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getIcon = () => {
    switch (rating.name) {
      case "IQ":
        return <Brain className="h-6 w-6" />;
      case "TQ":
        return <Wrench className="h-6 w-6" />;
      case "EQ":
        return <Heart className="h-6 w-6" />;
    }
  };

  const getColor = () => {
    switch (rating.name) {
      case "IQ":
        return "from-blue-500 to-blue-600";
      case "TQ":
        return "from-green-500 to-green-600";
      case "EQ":
        return "from-red-500 to-red-600";
    }
  };

  const getDescription = () => {
    switch (rating.name) {
      case "IQ":
        return "Ekonomi, Kvalitet, Säkerhet & Miljö";
      case "TQ":
        return "Komfort, Utrymme & Teknik";
      case "EQ":
        return "Körupplevelse & Design";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-card border border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full p-4 flex items-center justify-between bg-gradient-to-r",
          getColor()
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">{getIcon()}</div>
          <div className="text-left">
            <h3 className="font-display text-xl text-white">{rating.name}</h3>
            <p className="text-sm text-white/80">{getDescription()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{rating.score.toFixed(1)}</div>
            <div className="text-xs text-white/70">av 5</div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-white/80" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white/80" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {rating.categories.map((category) => (
            <CategorySection key={category.name} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

const TotalScoreDisplay = ({ score }: { score: number }) => {
  return (
        <div className="bg-hero rounded-lg p-6 text-center border border-gray-900 shadow-sm">
          <h3 className="text-lg md:text-xl text-white uppercase tracking-wide mb-4 font-display">
            Totalbetyg
          </h3>
          <div className="text-5xl font-bold mb-2 text-accent">
            {score.toFixed(1)}
          </div>
          <div className="text-sm text-white/70">av 5.0</div>
          <div className="mt-4 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "w-5 h-5 transition-colors",
                  s <= Math.round(score) 
                    ? "fill-accent text-accent" 
                    : "fill-gray-700 text-gray-700"
                )}
              />
            ))}
          </div>
        </div>
  );
};

export const CarRatingsDisplay = ({ carName, ratings }: CarRatingsDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="font-display text-2xl">{carName}</h3>
      </div>

      <div className="space-y-4">
        <MainRatingSection rating={ratings.iq} />
        <MainRatingSection rating={ratings.tq} />
        <MainRatingSection rating={ratings.eq} />
      </div>

      <TotalScoreDisplay score={ratings.totalScore} />
    </div>
  );
};

// Comparison view showing both cars side by side
interface RatingsComparisonProps {
  car1Name: string;
  car1Ratings: CarRatingsDisplayProps["ratings"];
  car2Name: string;
  car2Ratings: CarRatingsDisplayProps["ratings"];
}

export const RatingsComparison = ({
  car1Name,
  car1Ratings,
  car2Name,
  car2Ratings,
}: RatingsComparisonProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <CarRatingsDisplay carName={car1Name} ratings={car1Ratings} />
      <CarRatingsDisplay carName={car2Name} ratings={car2Ratings} />
    </div>
  );
};

export default CarRatingsDisplay;
