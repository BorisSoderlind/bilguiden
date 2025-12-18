export interface CarModel {
  id: string;
  brand: string;
  model: string;
  year?: string;
  category: string;
}

// Lista med populära bilmodeller för jämförelse
export const carModels: CarModel[] = [
  // Premium Elbilar
  { id: "bmw-ix", brand: "BMW", model: "iX", category: "Premium Elbil" },
  { id: "mercedes-eqs-suv", brand: "Mercedes", model: "EQS SUV", category: "Premium Elbil" },
  { id: "mercedes-eqs", brand: "Mercedes", model: "EQS", category: "Premium Elbil" },
  { id: "audi-e-tron-gt", brand: "Audi", model: "e-tron GT", category: "Premium Elbil" },
  { id: "porsche-taycan", brand: "Porsche", model: "Taycan", category: "Premium Elbil" },
  { id: "tesla-model-s", brand: "Tesla", model: "Model S", category: "Premium Elbil" },
  { id: "tesla-model-x", brand: "Tesla", model: "Model X", category: "Premium Elbil" },
  { id: "tesla-model-3", brand: "Tesla", model: "Model 3", category: "Elbil" },
  { id: "tesla-model-y", brand: "Tesla", model: "Model Y", category: "Elbil" },
  
  // Stora SUV:ar
  { id: "volvo-xc90", brand: "Volvo", model: "XC90", category: "Stor SUV" },
  { id: "audi-q7", brand: "Audi", model: "Q7", category: "Stor SUV" },
  { id: "bmw-x5", brand: "BMW", model: "X5", category: "Stor SUV" },
  { id: "mercedes-gle", brand: "Mercedes", model: "GLE", category: "Stor SUV" },
  { id: "volvo-xc60", brand: "Volvo", model: "XC60", category: "SUV" },
  
  // Mellanklass
  { id: "volvo-v90", brand: "Volvo", model: "V90", category: "Kombi" },
  { id: "bmw-5-series", brand: "BMW", model: "5-serie", category: "Sedan" },
  { id: "mercedes-e-class", brand: "Mercedes", model: "E-klass", category: "Sedan" },
  { id: "audi-a6", brand: "Audi", model: "A6", category: "Sedan" },
  
  // Sportbilar
  { id: "porsche-911", brand: "Porsche", model: "911", category: "Sportbil" },
  { id: "bmw-m3", brand: "BMW", model: "M3", category: "Sportbil" },
  { id: "audi-rs6", brand: "Audi", model: "RS6", category: "Sportbil" },
  
  // Budget/Småbilar
  { id: "volkswagen-id3", brand: "Volkswagen", model: "ID.3", category: "Elbil" },
  { id: "volkswagen-id4", brand: "Volkswagen", model: "ID.4", category: "Elbil" },
  { id: "hyundai-ioniq-5", brand: "Hyundai", model: "IONIQ 5", category: "Elbil" },
  { id: "kia-ev6", brand: "Kia", model: "EV6", category: "Elbil" },
  { id: "polestar-2", brand: "Polestar", model: "2", category: "Elbil" },
];

export const getCarModelById = (id: string): CarModel | undefined => {
  return carModels.find((car) => car.id === id);
};

export const getCarModelsByCategory = (category: string): CarModel[] => {
  return carModels.filter((car) => car.category === category);
};

export const searchCarModels = (query: string): CarModel[] => {
  const lowerQuery = query.toLowerCase();
  return carModels.filter(
    (car) =>
      car.brand.toLowerCase().includes(lowerQuery) ||
      car.model.toLowerCase().includes(lowerQuery)
  );
};
