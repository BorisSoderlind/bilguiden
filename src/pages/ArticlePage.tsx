import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { searchCarWithImage } from "@/services/carinfo";
import { ArrowLeft, Trophy, Check, X, Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/services/articles";
import { RatingsComparison } from "@/components/CarRatingsDisplay";
import type { CarComparison } from "@/data/comparisons";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [comparison, setComparison] = useState<CarComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [car1Image, setCar1Image] = useState<string | null>(null);
  const [car2Image, setCar2Image] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) {
        setLoading(false);
        return;
      }
      const data = await getArticleBySlug(slug);
      setComparison(data);
      setLoading(false);

      // Hämta car.info-bilder
      if (data?.car1) {
        searchCarWithImage(data.car1.make, data.car1.model, data.car1.year)
          .then((res) => setCar1Image(res?.image || null));
      }
      if (data?.car2) {
        searchCarWithImage(data.car2.make, data.car2.model, data.car2.year)
          .then((res) => setCar2Image(res?.image || null));
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <p className="text-xl">Laddar artikel...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Artikeln hittades inte</h1>
          <Link to="/">
            <Button>Tillbaka till startsidan</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { car1, car2, category, date, author, intro, verdict, winner } = comparison;
  const specLabels = {
    motor: "Motor",
    effekt: "Effekt",
    acceleration: "Acceleration",
    räckvidd: "Räckvidd",
    bagageutrymme: "Bagageutrymme",
  };

  // Demo ratings - these would come from the database in production
  const createDemoRatings = (carNum: 1 | 2) => ({
    iq: {
      name: "IQ" as const,
      fullName: "Intelligence Quotient",
      score: carNum === 1 ? 4.2 : 3.9,
      categories: [
        {
          name: "Ekonomi",
          score: carNum === 1 ? 4.0 : 3.8,
          subRatings: [
            { name: "Pris", weight: 20, score: carNum === 1 ? 4.0 : 3.5 },
            { name: "Utrustningsnivå", weight: 5, score: carNum === 1 ? 4.5 : 4.0 },
            { name: "Pris extrautrustning", weight: 5, score: carNum === 1 ? 3.5 : 4.0 },
            { name: "Värdefall", weight: 30, score: carNum === 1 ? 4.0 : 3.5 },
            { name: "Skatt", weight: 10, score: carNum === 1 ? 4.5 : 4.5 },
            { name: "Energikostnad", weight: 15, score: carNum === 1 ? 4.0 : 4.0 },
            { name: "Servicekostnad", weight: 10, score: carNum === 1 ? 3.5 : 4.0 },
            { name: "Förmånsvärde", weight: 5, score: carNum === 1 ? 4.0 : 3.5 },
          ],
        },
        {
          name: "Kvalitet & Garanti",
          score: carNum === 1 ? 4.3 : 4.0,
          subRatings: [
            { name: "Driftsäkerhet", weight: 50, score: carNum === 1 ? 4.5 : 4.0 },
            { name: "Garantier", weight: 50, score: carNum === 1 ? 4.0 : 4.0 },
          ],
        },
        {
          name: "Säkerhet",
          score: carNum === 1 ? 4.5 : 4.2,
          subRatings: [
            { name: "Euro NCAP", weight: 80, score: carNum === 1 ? 5.0 : 4.5 },
            { name: "Bilens vikt", weight: 10, score: carNum === 1 ? 3.5 : 3.5 },
            { name: "Säkerhetsutrustning", weight: 10, score: carNum === 1 ? 4.0 : 4.0 },
          ],
        },
        {
          name: "Miljö/Energi",
          score: carNum === 1 ? 4.0 : 3.8,
          subRatings: [
            { name: "Förbrukning kWh/100 km", weight: 70, score: carNum === 1 ? 4.0 : 3.5 },
            { name: "Energieffektivitet", weight: 30, score: carNum === 1 ? 4.0 : 4.5 },
          ],
        },
      ],
    },
    tq: {
      name: "TQ" as const,
      fullName: "Technical Quotient",
      score: carNum === 1 ? 4.1 : 4.3,
      categories: [
        {
          name: "Komfort",
          score: carNum === 1 ? 4.2 : 4.5,
          subRatings: [
            { name: "Sitta fram", weight: 25, score: carNum === 1 ? 4.5 : 4.5 },
            { name: "Sitta bak", weight: 15, score: carNum === 1 ? 4.0 : 4.5 },
            { name: "Fjädring", weight: 30, score: carNum === 1 ? 4.0 : 4.5 },
            { name: "Ljudnivå", weight: 30, score: carNum === 1 ? 4.5 : 4.5 },
          ],
        },
        {
          name: "Kupéutrymme",
          score: carNum === 1 ? 4.0 : 4.2,
          subRatings: [
            { name: "Fram", weight: 60, score: carNum === 1 ? 4.0 : 4.0 },
            { name: "Bak", weight: 40, score: carNum === 1 ? 4.0 : 4.5 },
          ],
        },
        {
          name: "Bagageutrymme",
          score: carNum === 1 ? 4.0 : 4.2,
          subRatings: [
            { name: "Frunk", weight: 15, score: carNum === 1 ? 4.0 : 4.5 },
            { name: "Bagage bak", weight: 60, score: carNum === 1 ? 4.0 : 4.0 },
            { name: "Fällt baksäte", weight: 15, score: carNum === 1 ? 4.0 : 4.5 },
            { name: "Dragvikt", weight: 10, score: carNum === 1 ? 4.0 : 4.0 },
          ],
        },
        {
          name: "Teknik",
          score: carNum === 1 ? 4.2 : 4.3,
          subRatings: [
            { name: "Självkörning", weight: 25, score: carNum === 1 ? 4.5 : 4.5 },
            { name: "Infotainment", weight: 40, score: carNum === 1 ? 4.0 : 4.5 },
            { name: "Navigation", weight: 20, score: carNum === 1 ? 4.0 : 4.0 },
            { name: "Röststyrning", weight: 15, score: carNum === 1 ? 4.5 : 4.0 },
          ],
        },
      ],
    },
    eq: {
      name: "EQ" as const,
      fullName: "Emotional Quotient",
      score: carNum === 1 ? 4.4 : 4.1,
      categories: [
        {
          name: "Aktiv körning",
          score: carNum === 1 ? 4.5 : 4.0,
          subRatings: [
            { name: "Styrning", weight: 40, score: carNum === 1 ? 4.5 : 4.0 },
            { name: "Chassi", weight: 30, score: carNum === 1 ? 4.5 : 4.0 },
            { name: "Motor/växellåda", weight: 20, score: carNum === 1 ? 4.5 : 4.0 },
            { name: "Motorljud", weight: 10, score: carNum === 1 ? 4.5 : 4.0 },
          ],
        },
        {
          name: "Design",
          score: carNum === 1 ? 4.3 : 4.2,
          subRatings: [
            { name: "Exteriör", weight: 30, score: carNum === 1 ? 4.5 : 4.0 },
            { name: "Interiör", weight: 30, score: carNum === 1 ? 4.0 : 4.5 },
            { name: "Vill-ha-känsla", weight: 40, score: carNum === 1 ? 4.5 : 4.0 },
          ],
        },
      ],
    },
    totalScore: carNum === 1 ? 4.2 : 4.1,
  });

  const car1Ratings = createDemoRatings(1);
  const car2Ratings = createDemoRatings(2);

  return (
    <>
      <Helmet>
        <title>{`${car1.name} vs ${car2.name} - Bilguiden`}</title>
        <meta name="description" content={intro} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="bg-hero py-12 lg:py-20">
          <div className="container">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-display text-sm">Tillbaka</span>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 font-display text-sm tracking-wide">
                {category}
              </span>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {author}
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
              {car1.name} <span className="text-accent">VS</span> {car2.name}
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mb-10">
              {intro}
            </p>

            {/* Car images with winner badge */}
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              <div className="relative animate-fade-in">
                {winner === 1 && (
                  <div className="absolute -top-3 -right-3 z-10 bg-accent text-accent-foreground p-2 rounded-full shadow-lg">
                    <Trophy className="h-6 w-6" />
                  </div>
                )}
                <img
                  src={car1Image || car1.image}
                  alt={car1.name}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="font-display text-xl text-primary-foreground">{car1.name}</h3>
                  <p className="text-accent font-display">{car1.price}</p>
                </div>
              </div>
              <div className="relative animate-fade-in delay-100">
                {winner === 2 && (
                  <div className="absolute -top-3 -left-3 z-10 bg-accent text-accent-foreground p-2 rounded-full shadow-lg">
                    <Trophy className="h-6 w-6" />
                  </div>
                )}
                <img
                  src={car2Image || car2.image}
                  alt={car2.name}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                />
                <div className="mt-4 text-right">
                  <h3 className="font-display text-xl text-primary-foreground">{car2.name}</h3>
                  <p className="text-accent font-display">{car2.price}</p>
                </div>
              </div>
            </div>

            {/* Image credit borttagen */}
          </div>
        </section>

        {/* Specs comparison */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-display text-3xl mb-8">
              <span className="text-primary">Specifikationer</span> i jämförelse
            </h2>

            <div className="bg-card rounded-lg shadow-card overflow-hidden">
              <div className="grid grid-cols-3 bg-foreground text-primary-foreground">
                <div className="p-4 font-display text-center border-r border-muted/20">{car1.name}</div>
                <div className="p-4 font-display text-center border-r border-muted/20 bg-primary">Spec</div>
                <div className="p-4 font-display text-center">{car2.name}</div>
              </div>
              
              {Object.entries(specLabels).map(([key, label]) => (
                <div key={key} className="grid grid-cols-3 border-b border-border last:border-b-0">
                  <div className="p-4 text-center">{car1.specs[key as keyof typeof car1.specs]}</div>
                  <div className="p-4 text-center bg-secondary font-medium">{label}</div>
                  <div className="p-4 text-center">{car2.specs[key as keyof typeof car2.specs]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-16 bg-secondary">
          <div className="container">
            <h2 className="font-display text-3xl mb-8">
              <span className="text-primary">För-</span> och nackdelar
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Car 1 */}
              <div className="bg-card rounded-lg shadow-card p-6">
                <h3 className="font-display text-2xl mb-6 flex items-center gap-3">
                  {winner === 1 && <Trophy className="h-6 w-6 text-accent" />}
                  {car1.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm text-primary mb-3">FÖRDELAR</h4>
                    <ul className="space-y-2">
                      {car1.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-destructive mb-3">NACKDELAR</h4>
                    <ul className="space-y-2">
                      {car1.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Car 2 */}
              <div className="bg-card rounded-lg shadow-card p-6">
                <h3 className="font-display text-2xl mb-6 flex items-center gap-3">
                  {winner === 2 && <Trophy className="h-6 w-6 text-accent" />}
                  {car2.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm text-primary mb-3">FÖRDELAR</h4>
                    <ul className="space-y-2">
                      {car2.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-destructive mb-3">NACKDELAR</h4>
                    <ul className="space-y-2">
                      {car2.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings Comparison */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-display text-3xl mb-8">
              <span className="text-primary">Detaljerade</span> betyg
            </h2>

            <RatingsComparison
              car1Name={car1.name}
              car1Ratings={car1Ratings}
              car2Name={car2.name}
              car2Ratings={car2Ratings}
            />
          </div>
        </section>

        {/* Verdict */}
        <section className="py-16 bg-secondary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 mb-6">
                <Trophy className="h-5 w-5" />
                <span className="font-display tracking-wide">SLUTSATS</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl mb-6">
                {winner === 1 && `${car1.name} tar segern!`}
                {winner === 2 && `${car2.name} tar segern!`}
                {winner === "draw" && "Oavgjort!"}
              </h2>

              <p className="text-lg text-muted-foreground mb-8">{verdict}</p>

              <Link to="/">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display">
                  Se fler jämförelser
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ArticlePage;
