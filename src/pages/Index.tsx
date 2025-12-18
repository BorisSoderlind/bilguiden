import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ComparisonCard from "@/components/ComparisonCard";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

import bmwIx from "@/assets/bmw-ix.jpg";
import mercedesEqs from "@/assets/mercedes-eqs.jpg";
import volvoXc90 from "@/assets/volvo-xc90.jpg";
import audiQ7 from "@/assets/audi-q7.jpg";
import porscheTaycan from "@/assets/porsche-taycan.jpg";
import teslaModelS from "@/assets/tesla-model-s.jpg";

const Index = () => {
  const heroComparison = {
    car1: "BMW iX",
    car2: "Mercedes EQS SUV",
    car1Image: bmwIx,
    car2Image: mercedesEqs,
    category: "VECKANS DUELL",
    teaser: "Två tyska premium-elbilar möts i vår största jämförelse. Vem tar segern när innovation möter lyx?",
  };

  const comparisons = [
    {
      car1: "Volvo XC90",
      car2: "Audi Q7",
      image: volvoXc90,
      category: "STOR SUV",
      excerpt: "Skandinavisk elegans möter tysk ingenjörskonst. Vi har kört båda i veckor för att hitta vinnaren.",
      date: "18 december 2024",
    },
    {
      car1: "Porsche Taycan",
      car2: "Tesla Model S",
      image: porscheTaycan,
      category: "EL-SPORTBIL",
      excerpt: "Sportvagnsikoner i en elektrisk tid. Kan Tesla matcha Porsches körupplevelse?",
      date: "15 december 2024",
    },
    {
      car1: "Tesla Model S",
      car2: "Mercedes EQS",
      image: teslaModelS,
      category: "PREMIUM ELBIL",
      excerpt: "Tekniklösningar i världsklass ställs mot varandra i denna prestigefyllda duell.",
      date: "12 december 2024",
    },
    {
      car1: "Audi Q7",
      car2: "BMW X5",
      image: audiQ7,
      category: "STOR SUV",
      excerpt: "Två av Tysklands mest populära familje-SUV:ar i en komplett jämförelse.",
      date: "10 december 2024",
    },
    {
      car1: "Volvo XC90",
      car2: "Mercedes GLE",
      image: volvoXc90,
      category: "PREMIUM SUV",
      excerpt: "Svensk säkerhet mot tysk komfort – vilken passar bäst för din familj?",
      date: "8 december 2024",
    },
    {
      car1: "Porsche Taycan",
      car2: "Audi e-tron GT",
      image: porscheTaycan,
      category: "SPORTBIL",
      excerpt: "Två elbilar från samma koncern – men vilken ger mest för pengarna?",
      date: "5 december 2024",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bilguiden - Sveriges bästa biljämförelser</title>
        <meta name="description" content="Bilguiden är Sveriges mest omfattande sajt för biljämförelser. Vi testar och jämför bilar för att hjälpa dig välja rätt." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection comparison={heroComparison} />
        
        {/* Latest Comparisons Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-1 w-12 bg-accent" />
              <h2 className="font-display text-3xl md:text-4xl">
                Senaste <span className="text-primary">jämförelserna</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map((comparison, index) => (
                <ComparisonCard
                  key={index}
                  {...comparison}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-secondary">
          <div className="container">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-1 w-12 bg-primary" />
              <h2 className="font-display text-3xl md:text-4xl">
                Utforska <span className="text-primary">kategorier</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Elbilar", "SUV", "Sportbilar", "Familjebil"].map((category, index) => (
                <a
                  key={category}
                  href="#"
                  className="group relative bg-foreground text-primary-foreground p-8 overflow-hidden animate-scale-in hover:shadow-hover transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <span className="font-display text-xl tracking-wide relative z-10">{category}</span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Index;
