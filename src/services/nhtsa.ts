// NHTSA Vehicle API Service
// https://vpic.nhtsa.dot.gov/api/

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

export interface Make {
  Make_ID: number;
  Make_Name: string;
}

export interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface NHTSAResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

// Cache for API responses to reduce requests
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`NHTSA API error: ${response.statusText}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

// Curated list of car makes relevant for the Swedish market
// We use this instead of fetching all makes from NHTSA (which includes trailers, trucks, etc.)
const CAR_MAKES: Make[] = [
  // Swedish
  { Make_ID: 492, Make_Name: "VOLVO" },
  { Make_ID: 582, Make_Name: "POLESTAR" },
  // German
  { Make_ID: 452, Make_Name: "VOLKSWAGEN" },
  { Make_ID: 449, Make_Name: "BMW" },
  { Make_ID: 449, Make_Name: "MERCEDES-BENZ" },
  { Make_ID: 582, Make_Name: "AUDI" },
  { Make_ID: 583, Make_Name: "PORSCHE" },
  { Make_ID: 476, Make_Name: "OPEL" },
  { Make_ID: 475, Make_Name: "MINI" },
  // Japanese
  { Make_ID: 448, Make_Name: "TOYOTA" },
  { Make_ID: 474, Make_Name: "HONDA" },
  { Make_ID: 477, Make_Name: "NISSAN" },
  { Make_ID: 473, Make_Name: "MAZDA" },
  { Make_ID: 481, Make_Name: "SUBARU" },
  { Make_ID: 480, Make_Name: "SUZUKI" },
  { Make_ID: 475, Make_Name: "MITSUBISHI" },
  { Make_ID: 476, Make_Name: "LEXUS" },
  // Korean
  { Make_ID: 499, Make_Name: "KIA" },
  { Make_ID: 485, Make_Name: "HYUNDAI" },
  { Make_ID: 583, Make_Name: "GENESIS" },
  // Czech
  { Make_ID: 482, Make_Name: "SKODA" },
  // American
  { Make_ID: 460, Make_Name: "TESLA" },
  { Make_ID: 460, Make_Name: "FORD" },
  { Make_ID: 467, Make_Name: "JEEP" },
  { Make_ID: 454, Make_Name: "CHEVROLET" },
  { Make_ID: 440, Make_Name: "CADILLAC" },
  // French
  { Make_ID: 479, Make_Name: "PEUGEOT" },
  { Make_ID: 456, Make_Name: "RENAULT" },
  { Make_ID: 455, Make_Name: "CITROEN" },
  { Make_ID: 489, Make_Name: "DS" },
  // Italian
  { Make_ID: 459, Make_Name: "FIAT" },
  { Make_ID: 441, Make_Name: "ALFA ROMEO" },
  { Make_ID: 584, Make_Name: "MASERATI" },
  { Make_ID: 585, Make_Name: "FERRARI" },
  { Make_ID: 586, Make_Name: "LAMBORGHINI" },
  // British
  { Make_ID: 469, Make_Name: "JAGUAR" },
  { Make_ID: 468, Make_Name: "LAND ROVER" },
  { Make_ID: 587, Make_Name: "BENTLEY" },
  { Make_ID: 588, Make_Name: "ROLLS-ROYCE" },
  { Make_ID: 589, Make_Name: "ASTON MARTIN" },
  { Make_ID: 590, Make_Name: "LOTUS" },
  { Make_ID: 591, Make_Name: "MCLAREN" },
  // Spanish
  { Make_ID: 478, Make_Name: "SEAT" },
  { Make_ID: 592, Make_Name: "CUPRA" },
  // Chinese
  { Make_ID: 593, Make_Name: "BYD" },
  { Make_ID: 594, Make_Name: "MG" },
  { Make_ID: 595, Make_Name: "LYNK & CO" },
  { Make_ID: 596, Make_Name: "NIO" },
  { Make_ID: 597, Make_Name: "XPENG" },
  // Romanian
  { Make_ID: 457, Make_Name: "DACIA" },
];

export function getAllMakes(): Make[] {
  // Return the curated list immediately (no API call needed)
  return CAR_MAKES;
}

export async function getModelsForMake(makeName: string): Promise<Model[]> {
  const data = await fetchWithCache<NHTSAResponse<Model>>(
    `${BASE_URL}/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`
  );

  // Sort models alphabetically
  return data.Results.sort((a, b) =>
    a.Model_Name.localeCompare(b.Model_Name)
  );
}

export async function getModelsForMakeYear(
  makeName: string,
  year: number
): Promise<Model[]> {
  const data = await fetchWithCache<NHTSAResponse<Model>>(
    `${BASE_URL}/GetModelsForMakeYear/make/${encodeURIComponent(makeName)}/modelyear/${year}?format=json`
  );

  return data.Results.sort((a, b) =>
    a.Model_Name.localeCompare(b.Model_Name)
  );
}

// Get available years for a specific make and model
export async function getYearsForModel(
  makeName: string,
  modelName: string
): Promise<number[]> {
  const currentYear = new Date().getFullYear() + 1;
  const startYear = 1990;
  
  // Query years in parallel (batched to avoid too many simultaneous requests)
  const years: number[] = [];
  const allYears = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );
  
  // Check years in batches of 10
  const batchSize = 10;
  for (let i = 0; i < allYears.length; i += batchSize) {
    const batch = allYears.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (year) => {
        try {
          const models = await getModelsForMakeYear(makeName, year);
          const hasModel = models.some(
            (m) => m.Model_Name.toUpperCase() === modelName.toUpperCase()
          );
          return hasModel ? year : null;
        } catch {
          return null;
        }
      })
    );
    years.push(...results.filter((y): y is number => y !== null));
  }
  
  return years.sort((a, b) => b - a); // Sort descending (newest first)
}

// Generate year options (from current year back to 1990)
export function getAvailableYears(): number[] {
  const currentYear = new Date().getFullYear() + 1; // Include next year for new models
  const years: number[] = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
  }
  return years;
}

// Format make name for display (capitalize properly)
export function formatMakeName(name: string): string {
  // Handle special cases
  const specialCases: Record<string, string> = {
    "BMW": "BMW",
    "MERCEDES-BENZ": "Mercedes-Benz",
    "VOLKSWAGEN": "Volkswagen",
    "AUDI": "Audi",
    "LAND ROVER": "Land Rover",
  };

  const upper = name.toUpperCase();
  if (specialCases[upper]) {
    return specialCases[upper];
  }

  // Title case for others
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
