import { Brain, Wrench, Heart, ChevronDown, ChevronUp } from "lucide-react";
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
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8 text-right text-foreground">{score.toFixed(1)}</span>
    </div>
  );
};

const RatingDots = ({ score }: { score: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={cn(
            "w-3 h-3 rounded-full transition-colors",
            dot <= Math.round(score) ? "bg-accent" : "bg-gray-300"
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
        className="w-full py-3 px-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium text-foreground">{category.name}</span>
          <RatingDots score={category.score} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold">{category.score.toFixed(1)}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-3 space-y-2 bg-gray-50">
          {category.subRatings.map((sub) => (
            <div key={sub.name} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {sub.name}
                <span className="text-gray-400 ml-1">({sub.weight}%)</span>
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
          <div className="bg-white/20 p-2 rounded-lg">{getIcon()}</div>
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
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-green-500";
    if (score >= 3.5) return "text-yellow-500";
    if (score >= 3.0) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center border border-gray-200 shadow-sm">
      <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
        Totalbetyg
      </div>
      <div className={cn("text-5xl font-bold mb-2", getScoreColor(score))}>
        {score.toFixed(1)}
      </div>
      <div className="text-sm text-gray-400">av 5.0</div>
      <div className="mt-4 flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={cn(
              "w-4 h-4 rounded-full",
              star <= Math.round(score) ? "bg-accent" : "bg-gray-300"
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
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl mb-2">{carName}</h3>
        <TotalScoreDisplay score={ratings.totalScore} />
      </div>

      <div className="space-y-4">
        <MainRatingSection rating={ratings.iq} />
        <MainRatingSection rating={ratings.tq} />
        <MainRatingSection rating={ratings.eq} />
      </div>
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
