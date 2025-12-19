// car.info API integration for images only
// Unofficial API endpoints

const BASE_URL = "https://www.car.info/api/v1";

export interface CarInfoSearchResult {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  image: string | null;
}

// Search for cars (make+model+year) and get image
export async function searchCarWithImage(make: string, model: string, year: number): Promise<CarInfoSearchResult | null> {
  const res = await fetch(`${BASE_URL}/search/${encodeURIComponent(`${make} ${model} ${year}`)}`);
  if (!res.ok) throw new Error("car.info API error");
  const data = await res.json();
  if (!data.hits || !data.hits.length) return null;
  const car = data.hits[0];
  return {
    id: car.id,
    name: car.name,
    make: car.make,
    model: car.model,
    year: car.year,
    image: car.image || null,
  };
}
