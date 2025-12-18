import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/database.types';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables in .env file');
  console.error('Please create a .env file with:');
  console.error('VITE_SUPABASE_URL=your_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_key');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Public image URLs
const images: Record<string, string> = {
  bmwIx: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
  mercedesEqs: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  volvoXc90: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
  audiQ7: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
  porscheTaycan: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f8207?w=800&q=80',
  teslaModelS: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
  vwId4: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  hyundaiIoniq5: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
};

// Data from comparisons.ts (without image imports)
const comparisons = [
  {
    slug: "bmw-ix-vs-mercedes-eqs-suv",
    car1: {
      name: "BMW iX",
      image: images.bmwIx,
      price: "975 000 kr",
      specs: {
        motor: "Dubbla elmotorer",
        effekt: "523 hk",
        acceleration: "0-100 km/h på 4,6 s",
        räckvidd: "630 km (WLTP)",
        bagageutrymme: "500 liter",
      },
      pros: [
        "Fantastisk körupplevelse",
        "Modern och innovativ teknik",
        "Rymlig och komfortabel",
        "Snabb laddning",
      ],
      cons: [
        "Högt pris",
        "Kontroversiell design",
        "Vissa funktioner saknas som standard",
      ],
    },
    car2: {
      name: "Mercedes EQS SUV",
      image: images.mercedesEqs,
      price: "1 150 000 kr",
      specs: {
        motor: "Dubbla elmotorer",
        effekt: "544 hk",
        acceleration: "0-100 km/h på 4,5 s",
        räckvidd: "590 km (WLTP)",
        bagageutrymme: "645 liter",
      },
      pros: [
        "Överlägsen komfort",
        "Massiv infotainment-skärm",
        "Hög kvalitetskänsla",
        "Större bagageutrymme",
      ],
      cons: [
        "Mycket dyrt",
        "Tung och stor",
        "Komplex användargränssnitt",
      ],
    },
    category: "VECKANS DUELL",
    date: "18 december 2024",
    author: "Peter Andersson",
    intro: "Två tyska premium-elbilar möts i vår största jämförelse. Vem tar segern när innovation möter lyx?",
    verdict: "Båda bilarna är exceptionella på sina sätt. BMW iX vinner på körglädje och innovativa lösningar, medan Mercedes EQS SUV levererar överlägsen komfort och lyx. För den körglade köparen är iX förstahandsvalet, men för den som prioriterar komfort och status är EQS SUV värd extrakostnaden.",
    winner: 1,
  },
  {
    slug: "volvo-xc90-vs-audi-q7",
    car1: {
      name: "Volvo XC90",
      image: images.volvoXc90,
      price: "795 000 kr",
      specs: {
        motor: "B5 mild-hybrid",
        effekt: "250 hk",
        acceleration: "0-100 km/h på 7,2 s",
        räckvidd: "850 km",
        bagageutrymme: "640 liter",
      },
      pros: [
        "Bästa säkerhetsutrustning",
        "Skandinavisk design",
        "Bekväm för långresor",
        "Sjusitsig som standard",
      ],
      cons: [
        "Mindre premium än konkurrenterna",
        "Infotainment kan vara långsamt",
        "Inte lika sportigt att köra",
      ],
    },
    car2: {
      name: "Audi Q7",
      image: images.audiQ7,
      price: "845 000 kr",
      specs: {
        motor: "3.0 TFSI mild-hybrid",
        effekt: "340 hk",
        acceleration: "0-100 km/h på 5,6 s",
        räckvidd: "800 km",
        bagageutrymme: "770 liter",
      },
      pros: [
        "Kraftfull motor",
        "Sportigt och bekvämt",
        "Virtual Cockpit",
        "Större bagageutrymme",
      ],
      cons: [
        "Högre pris",
        "Dyrare att underhålla",
        "Mindre fokus på säkerhet",
      ],
    },
    category: "STOR SUV",
    date: "15 december 2024",
    author: "Anna Svensson",
    intro: "Skandinavisk elegans möter tysk ingenjörskonst. Vi har kört båda i veckor för att hitta vinnaren.",
    verdict: "Volvo XC90 vinner för familjer som prioriterar säkerhet och skandinavisk design. Audi Q7 är bättre för den som vill ha mer prestanda och ett större bagageutrymme. Båda är utmärkta val i premiumklassen.",
    winner: 1,
  },
  {
    slug: "porsche-taycan-vs-tesla-model-s",
    car1: {
      name: "Porsche Taycan",
      image: images.porscheTaycan,
      price: "1 095 000 kr",
      specs: {
        motor: "Dubbla elmotorer",
        effekt: "476 hk",
        acceleration: "0-100 km/h på 4,0 s",
        räckvidd: "484 km (WLTP)",
        bagageutrymme: "366 liter",
      },
      pros: [
        "Fenomenal körkänsla",
        "Porsche-kvalitet",
        "Snabb återkommande laddning",
        "Tidlös design",
      ],
      cons: [
        "Högre pris",
        "Kortare räckvidd",
        "Mindre bagageutrymme",
      ],
    },
    car2: {
      name: "Tesla Model S",
      image: images.teslaModelS,
      price: "1 045 000 kr",
      specs: {
        motor: "Dubbla elmotorer",
        effekt: "670 hk",
        acceleration: "0-100 km/h på 3,2 s",
        räckvidd: "634 km (WLTP)",
        bagageutrymme: "709 liter",
      },
      pros: [
        "Överlägsen räckvidd",
        "Otrolig acceleration",
        "Tesla Supercharger-nätverk",
        "Stort bagageutrymme",
      ],
      cons: [
        "Sämre build quality",
        "Minimalistisk interiör",
        "Färre fysiska knappar",
      ],
    },
    category: "EL-SPORTBIL",
    date: "12 december 2024",
    author: "Johan Bergström",
    intro: "Sportvagnsikoner i en elektrisk tid. Kan Tesla matcha Porsches körupplevelse?",
    verdict: "Porsche Taycan är den självklara vinnarenför den som prioriterar körglädje och premium-kvalitet. Tesla Model S erbjuder mer praktikalitet och bättre räckvidd till ett lägre pris. Välj Porsche för upplevelsen, Tesla för det rationella.",
    winner: 1,
  },
];

async function migrate() {
  console.log('Starting migration...');
  console.log(`Found ${comparisons.length} articles to migrate`);

  for (const comparison of comparisons) {
    console.log(`Migrating: ${comparison.car1.name} vs ${comparison.car2.name}`);

    const articleData = {
      slug: comparison.slug,
      category: comparison.category,
      date: comparison.date,
      author: comparison.author,
      intro: comparison.intro,
      verdict: comparison.verdict,
      winner: typeof comparison.winner === 'number' ? comparison.winner : null,
      
      car1_name: comparison.car1.name,
      car1_image: comparison.car1.image,
      car1_price: comparison.car1.price,
      car1_motor: comparison.car1.specs.motor,
      car1_effekt: comparison.car1.specs.effekt,
      car1_acceleration: comparison.car1.specs.acceleration,
      car1_rackvidd: comparison.car1.specs.räckvidd,
      car1_bagageutrymme: comparison.car1.specs.bagageutrymme,
      car1_pros: comparison.car1.pros,
      car1_cons: comparison.car1.cons,
      
      car2_name: comparison.car2.name,
      car2_image: comparison.car2.image,
      car2_price: comparison.car2.price,
      car2_motor: comparison.car2.specs.motor,
      car2_effekt: comparison.car2.specs.effekt,
      car2_acceleration: comparison.car2.specs.acceleration,
      car2_rackvidd: comparison.car2.specs.räckvidd,
      car2_bagageutrymme: comparison.car2.specs.bagageutrymme,
      car2_pros: comparison.car2.pros,
      car2_cons: comparison.car2.cons,
    };

    const { error } = await supabase.from('articles').insert(articleData as any);

    if (error) {
      console.error(`Error migrating ${comparison.slug}:`, error);
    } else {
      console.log(`✓ Migrated: ${comparison.slug}`);
    }
  }

  console.log('Migration complete!');
}

migrate();
