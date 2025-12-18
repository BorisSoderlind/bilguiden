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

import bmwIx from "@/assets/bmw-ix.jpg";
import mercedesEqs from "@/assets/mercedes-eqs.jpg";
import volvoXc90 from "@/assets/volvo-xc90.jpg";
import audiQ7 from "@/assets/audi-q7.jpg";
import porscheTaycan from "@/assets/porsche-taycan.jpg";
import teslaModelS from "@/assets/tesla-model-s.jpg";

export const comparisons: CarComparison[] = [
  {
    slug: "bmw-ix-vs-mercedes-eqs-suv",
    car1: {
      name: "BMW iX",
      image: bmwIx,
      price: "från 849 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "523 hk",
        acceleration: "4,6 sek (0-100)",
        räckvidd: "630 km",
        bagageutrymme: "500 liter",
      },
      pros: [
        "Imponerande räckvidd",
        "Sportig körupplevelse",
        "Innovativ interiör",
      ],
      cons: [
        "Polariserande design",
        "Högt pris",
        "Litet bagageutrymme för klassen",
      ],
    },
    car2: {
      name: "Mercedes EQS SUV",
      image: mercedesEqs,
      price: "från 1 195 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "544 hk",
        acceleration: "4,6 sek (0-100)",
        räckvidd: "660 km",
        bagageutrymme: "645 liter",
      },
      pros: [
        "Hyperscreen är magisk",
        "Extremt tyst kupé",
        "Lyxigast i klassen",
      ],
      cons: [
        "Väldigt högt pris",
        "Stor och svårmanövrerad",
        "Tråkig att köra snabbt",
      ],
    },
    category: "Premium Elbil",
    date: "18 december 2024",
    author: "Erik Andersson",
    intro: "Två tyska jättar möts i vår mest eftertraktade duell. BMW iX och Mercedes EQS SUV representerar det absolut bästa inom elektrisk lyx – men vilken levererar mest för pengarna?",
    verdict: "BMW iX vinner på körupplevelse och värde, men Mercedes EQS SUV tar kronan för ren lyx. Vill du ha en bil som får dig att le när du kör? Välj BMW. Vill du anlända som en kung? Välj Mercedes.",
    winner: 1,
  },
  {
    slug: "volvo-xc90-vs-audi-q7",
    car1: {
      name: "Volvo XC90",
      image: volvoXc90,
      price: "från 799 000 kr",
      specs: {
        motor: "T8 Laddhybrid",
        effekt: "455 hk",
        acceleration: "5,4 sek (0-100)",
        räckvidd: "71 km (el)",
        bagageutrymme: "262-1816 liter",
      },
      pros: [
        "Bäst i klassen på säkerhet",
        "Elegant skandinavisk design",
        "Laddhybrid som standard",
      ],
      cons: [
        "Börjar bli gammal",
        "Litet bagageutrymme med tredje sätesrad",
        "Infotainment kan vara långsamt",
      ],
    },
    car2: {
      name: "Audi Q7",
      image: audiQ7,
      price: "från 869 000 kr",
      specs: {
        motor: "55 TFSI e quattro",
        effekt: "462 hk",
        acceleration: "5,7 sek (0-100)",
        räckvidd: "43 km (el)",
        bagageutrymme: "295-1925 liter",
      },
      pros: [
        "Fantastisk interiörkvalitet",
        "Virtual Cockpit är branschledande",
        "Utmärkt körkänsla",
      ],
      cons: [
        "Dyr i grundutförande",
        "Kortare elräckvidd",
        "Anonymare design",
      ],
    },
    category: "Stor SUV",
    date: "15 december 2024",
    author: "Maria Lindqvist",
    intro: "Skandinavisk elegans mot tysk ingenjörskonst. Vi har tillbringat två veckor med vardera bil för att avgöra vilken stor SUV som passar bäst för svenska familjer.",
    verdict: "Volvo XC90 imponerar med säkerhet och design, medan Audi Q7 levererar bättre på teknik och körglädje. För svenska förhållanden tar Volvo en knapp seger tack vare laddhybriden.",
    winner: 1,
  },
  {
    slug: "porsche-taycan-vs-tesla-model-s",
    car1: {
      name: "Porsche Taycan",
      image: porscheTaycan,
      price: "från 1 126 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "571 hk",
        acceleration: "3,2 sek (0-100)",
        räckvidd: "630 km",
        bagageutrymme: "366 liter",
      },
      pros: [
        "Oöverträffad körupplevelse",
        "Porsche-kvalitet överallt",
        "Kan köras på bana hela dagen",
      ],
      cons: [
        "Dyr med tillval",
        "Liten räckvidd i verklig körning",
        "Trångt i baksätet",
      ],
    },
    car2: {
      name: "Tesla Model S",
      image: teslaModelS,
      price: "från 879 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "670 hk",
        acceleration: "2,1 sek (0-100)",
        räckvidd: "723 km",
        bagageutrymme: "793 liter",
      },
      pros: [
        "Blixtsnabb acceleration",
        "Enormt laddnätverk",
        "Bäst teknik och uppdateringar",
      ],
      cons: [
        "Interiörkvalitet under förväntan",
        "Serviceupplevelsen varierar",
        "Yoke-ratten är kontroversiell",
      ],
    },
    category: "El-sportbil",
    date: "12 december 2024",
    author: "Johan Berg",
    intro: "Två filosofier inom elektrisk prestanda: Porsches fokus på körglädje mot Teslas teknologiska överlägsenhet. Vi har testat båda på väg och bana.",
    verdict: "Tesla vinner på spec-bladet, men Porsche tar hem segern för den som älskar att köra. Taycan är helt enkelt roligare – och det är värt mycket.",
    winner: 1,
  },
  {
    slug: "tesla-model-s-vs-mercedes-eqs",
    car1: {
      name: "Tesla Model S",
      image: teslaModelS,
      price: "från 879 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "670 hk",
        acceleration: "2,1 sek (0-100)",
        räckvidd: "723 km",
        bagageutrymme: "793 liter",
      },
      pros: [
        "Otrolig acceleration",
        "Bäst laddinfrastruktur",
        "Kontinuerliga OTA-uppdateringar",
      ],
      cons: [
        "Interiörkvalitet",
        "Servicenätverk",
        "Bullrig vid höga hastigheter",
      ],
    },
    car2: {
      name: "Mercedes EQS",
      image: mercedesEqs,
      price: "från 1 095 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "523 hk",
        acceleration: "4,3 sek (0-100)",
        räckvidd: "770 km",
        bagageutrymme: "610 liter",
      },
      pros: [
        "Lyxigast i klassen",
        "Hyperscreen är unik",
        "Otroligt tyst",
      ],
      cons: [
        "Extremt högt pris",
        "Långsamt laddnätverk",
        "Inte lika rolig att köra",
      ],
    },
    category: "Premium Elbil",
    date: "10 december 2024",
    author: "Erik Andersson",
    intro: "Tech-giganten mot lyxmärket. Kan Mercedes gamla anor slå Teslas Silicon Valley-innovation?",
    verdict: "Mercedes EQS är lyxigare, Tesla Model S är smartare. För teknikentusiasten vinner Tesla, för den som vill ha traditionell lyx tar Mercedes hem det.",
    winner: "draw",
  },
  {
    slug: "audi-q7-vs-bmw-x5",
    car1: {
      name: "Audi Q7",
      image: audiQ7,
      price: "från 869 000 kr",
      specs: {
        motor: "55 TFSI e quattro",
        effekt: "462 hk",
        acceleration: "5,7 sek (0-100)",
        räckvidd: "43 km (el)",
        bagageutrymme: "295-1925 liter",
      },
      pros: [
        "Bästa interiören",
        "Rymligast",
        "Fyrhjulsdrift som standard",
      ],
      cons: [
        "Kort elräckvidd",
        "Tung känsla",
        "Dyr med tillval",
      ],
    },
    car2: {
      name: "BMW X5",
      image: bmwIx,
      price: "från 849 000 kr",
      specs: {
        motor: "xDrive45e",
        effekt: "394 hk",
        acceleration: "5,6 sek (0-100)",
        räckvidd: "87 km (el)",
        bagageutrymme: "500-1720 liter",
      },
      pros: [
        "Längst elräckvidd",
        "Roligast att köra",
        "iDrive 8 är fantastiskt",
      ],
      cons: [
        "Mindre rymlig",
        "Sportigt = hårt",
        "Ingen sjusits",
      ],
    },
    category: "Stor SUV",
    date: "8 december 2024",
    author: "Maria Lindqvist",
    intro: "Tysklands två populäraste premium-SUV:ar möts i en klassisk duell. Vilken passar bäst för dig?",
    verdict: "BMW X5 tar segern för körglada familjer, medan Audi Q7 passar den som prioriterar utrymme och komfort.",
    winner: 2,
  },
  {
    slug: "porsche-taycan-vs-audi-e-tron-gt",
    car1: {
      name: "Porsche Taycan",
      image: porscheTaycan,
      price: "från 1 126 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "571 hk",
        acceleration: "3,2 sek (0-100)",
        räckvidd: "630 km",
        bagageutrymme: "366 liter",
      },
      pros: [
        "Mer exklusiv känsla",
        "Ikonisk design",
        "Bättre chassibalans",
      ],
      cons: [
        "Dyrare",
        "Mindre praktisk",
        "Hårdare fjädring",
      ],
    },
    car2: {
      name: "Audi e-tron GT",
      image: audiQ7,
      price: "från 1 049 000 kr",
      specs: {
        motor: "Dual elektrisk",
        effekt: "530 hk",
        acceleration: "3,3 sek (0-100)",
        räckvidd: "500 km",
        bagageutrymme: "350 liter",
      },
      pros: [
        "Bättre värde",
        "Bekvämare",
        "Snyggare interiör",
      ],
      cons: [
        "Inte riktigt Porsche-känsla",
        "Kortare räckvidd",
        "Mindre exklusiv",
      ],
    },
    category: "Sportbil",
    date: "5 december 2024",
    author: "Johan Berg",
    intro: "Samma plattform, olika filosofier. Porsche Taycan och Audi e-tron GT delar teknik men levererar olika upplevelser.",
    verdict: "Porsche Taycan vinner för entusiasten, men Audi e-tron GT är smartare köp för de flesta.",
    winner: 1,
  },
];

export const getComparisonBySlug = (slug: string): CarComparison | undefined => {
  return comparisons.find((c) => c.slug === slug);
};
