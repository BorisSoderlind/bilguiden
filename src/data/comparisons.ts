export interface CarComparison {
  slug: string;
  car1: {
    name: string;
    image: string;
    price: string;
    specs: {
      motor: string;
      effekt: string;
      acceleration: string;
      räckvidd: string;
      bagageutrymme: string;
    };
    pros: string[];
    cons: string[];
  };
  car2: {
    name: string;
    image: string;
    price: string;
    specs: {
      motor: string;
      effekt: string;
      acceleration: string;
      räckvidd: string;
      bagageutrymme: string;
    };
    pros: string[];
    cons: string[];
  };
  category: string;
  date: string;
  author: string;
  intro: string;
  verdict: string;
  winner: 1 | 2 | "draw";
}

// Note: This file is kept for type definitions and legacy support
// Actual article data is now stored in Supabase database
export const comparisons: CarComparison[] = [];

export const getComparisonBySlug = (slug: string): CarComparison | undefined => {
  return comparisons.find((c) => c.slug === slug);
};
