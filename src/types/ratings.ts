// Rating system types for car comparisons
// IQ = Intelligence Quotient (ekonomi, kvalitet, säkerhet, miljö)
// TQ = Technical Quotient (komfort, utrymme, teknik)
// EQ = Emotional Quotient (körning, design)

export interface SubRating {
  name: string;
  weight: number; // Percentage weight (0-100)
  score: number; // Score 1-5
}

export interface CategoryRating {
  name: string;
  subRatings: SubRating[];
  score: number; // Calculated weighted average 1-5
}

export interface MainRating {
  name: "IQ" | "TQ" | "EQ";
  fullName: string;
  categories: CategoryRating[];
  score: number; // Calculated average of categories 1-5
}

export interface CarRatings {
  iq: MainRating;
  tq: MainRating;
  eq: MainRating;
  totalScore: number; // Overall weighted score 1-5
}

// Rating structure definition with weights
export const RATING_STRUCTURE = {
  IQ: {
    fullName: "Intelligence Quotient",
    categories: {
      ekonomi: {
        name: "Ekonomi",
        subRatings: [
          { name: "Pris", weight: 20 },
          { name: "Utrustningsnivå", weight: 5 },
          { name: "Pris extrautrustning", weight: 5 },
          { name: "Värdefall", weight: 30 },
          { name: "Skatt", weight: 10 },
          { name: "Energikostnad", weight: 15 },
          { name: "Servicekostnad", weight: 10 },
          { name: "Förmånsvärde", weight: 5 },
        ],
      },
      kvalitetGaranti: {
        name: "Kvalitet & Garanti",
        subRatings: [
          { name: "Driftsäkerhet", weight: 50 },
          { name: "Garantier", weight: 50 },
        ],
      },
      sakerhet: {
        name: "Säkerhet",
        subRatings: [
          { name: "Euro NCAP", weight: 80 },
          { name: "Bilens vikt", weight: 10 },
          { name: "Säkerhetsutrustning", weight: 10 },
        ],
      },
      miljoEnergi: {
        name: "Miljö/Energi",
        subRatings: [
          { name: "Förbrukning kWh/100 km", weight: 70 },
          { name: "Energieffektivitet", weight: 30 },
        ],
      },
    },
  },
  TQ: {
    fullName: "Technical Quotient",
    categories: {
      komfort: {
        name: "Komfort",
        subRatings: [
          { name: "Sitta fram", weight: 25 },
          { name: "Sitta bak", weight: 15 },
          { name: "Fjädring", weight: 30 },
          { name: "Ljudnivå", weight: 30 },
        ],
      },
      kupeutrymme: {
        name: "Kupéutrymme",
        subRatings: [
          { name: "Fram", weight: 60 },
          { name: "Bak", weight: 40 },
        ],
      },
      bagageutrymme: {
        name: "Bagageutrymme",
        subRatings: [
          { name: "Frunk", weight: 15, optional: true },
          { name: "Bagage bak", weight: 60 },
          { name: "Fällt baksäte", weight: 30 }, // or 15% if frunk exists
          { name: "Dragvikt", weight: 10 },
        ],
      },
      teknik: {
        name: "Teknik",
        subRatings: [
          { name: "Självkörning", weight: 25 },
          { name: "Infotainment", weight: 40 },
          { name: "Navigation", weight: 20 },
          { name: "Röststyrning", weight: 15 },
        ],
      },
    },
  },
  EQ: {
    fullName: "Emotional Quotient",
    categories: {
      aktivKorning: {
        name: "Aktiv körning",
        subRatings: [
          { name: "Styrning", weight: 40 },
          { name: "Chassi", weight: 30 },
          { name: "Motor/växellåda", weight: 20 },
          { name: "Motorljud", weight: 10, optional: true },
        ],
      },
      design: {
        name: "Design",
        subRatings: [
          { name: "Exteriör", weight: 30 },
          { name: "Interiör", weight: 30 },
          { name: "Vill-ha-känsla", weight: 40 },
        ],
      },
    },
  },
} as const;

// Helper function to calculate weighted score
export function calculateWeightedScore(subRatings: SubRating[]): number {
  const totalWeight = subRatings.reduce((sum, sr) => sum + sr.weight, 0);
  const weightedSum = subRatings.reduce(
    (sum, sr) => sum + sr.score * sr.weight,
    0
  );
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

// Helper function to calculate category average
export function calculateCategoryAverage(categories: CategoryRating[]): number {
  if (categories.length === 0) return 0;
  const sum = categories.reduce((acc, cat) => acc + cat.score, 0);
  return sum / categories.length;
}

// Helper function to calculate total score (average of IQ, TQ, EQ)
export function calculateTotalScore(ratings: CarRatings): number {
  return (ratings.iq.score + ratings.tq.score + ratings.eq.score) / 3;
}
