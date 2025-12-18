import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Trophy, Check, X, Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/services/articles";
import type { CarComparison } from "@/data/comparisons";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [comparison, setComparison] = useState<CarComparison | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) {
        setLoading(false);
        return;
      }
      const data = await getArticleBySlug(slug);
      setComparison(data);
      setLoading(false);
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
                  src={car1.image}
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
                  src={car2.image}
                  alt={car2.name}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                />
                <div className="mt-4 text-right">
                  <h3 className="font-display text-xl text-primary-foreground">{car2.name}</h3>
                  <p className="text-accent font-display">{car2.price}</p>
                </div>
              </div>
            </div>

            {/* Image credit */}
            {comparison.image_credit && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {comparison.image_credit}
              </p>
            )}
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

        {/* Verdict */}
        <section className="py-16">
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
