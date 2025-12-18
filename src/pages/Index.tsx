import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ComparisonCard from "@/components/ComparisonCard";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { getAllArticles } from "@/services/articles";
import type { CarComparison } from "@/data/comparisons";

// Fallback images
import bmwIx from "@/assets/bmw-ix.jpg";
import mercedesEqs from "@/assets/mercedes-eqs.jpg";

const Index = () => {
  const [articles, setArticles] = useState<CarComparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const data = await getAllArticles();
      setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, []);
  const heroComparison = articles[0] ? {
    slug: articles[0].slug,
    car1: articles[0].car1.name,
    car2: articles[0].car2.name,
    car1Image: articles[0].car1.image || bmwIx,
    car2Image: articles[0].car2.image || mercedesEqs,
    category: articles[0].category,
    teaser: articles[0].intro,
  } : {
    slug: "",
    car1: "",
    car2: "",
    car1Image: bmwIx,
    car2Image: mercedesEqs,
    category: "",
    teaser: "",
  };

  const displayArticles = articles.slice(1, 7).map((article) => ({
    slug: article.slug,
    car1: article.car1.name,
    car2: article.car2.name,
    image: article.car1.image || bmwIx,
    category: article.category,
    excerpt: article.intro,
    date: article.date,
  }));

  return (
    <>
      <Helmet>
        <title>Bilguiden - Sveriges bästa biljämförelser</title>
        <meta name="description" content="Bilguiden är Sveriges mest omfattande sajt för biljämförelser. Vi testar och jämför bilar för att hjälpa dig välja rätt." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        {loading ? (
          <div className="container py-24 text-center">
            <p className="text-xl">Laddar artiklar...</p>
          </div>
        ) : (
          <>
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
                  {displayArticles.map((comparison, index) => (
                    <ComparisonCard
                      key={comparison.slug}
                      {...comparison}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

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
