import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { carModels } from "@/data/car-models";
import { toast } from "sonner";

const CreateComparison = () => {
  const navigate = useNavigate();
  const [car1, setCar1] = useState<string>("");
  const [car2, setCar2] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!car1 || !car2) {
      toast.error("Välj två bilar att jämföra");
      return;
    }

    if (car1 === car2) {
      toast.error("Välj två olika bilar");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-comparison", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car1, car2 }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error("Jämförelsen finns redan!");
          navigate(`/jamforelse/${data.slug}`);
          return;
        }
        throw new Error(data.error || "Något gick fel");
      }

      toast.success("Jämförelsen har skapats!");
      navigate(`/jamforelse/${data.slug}`);
    } catch (error) {
      console.error("Error generating comparison:", error);
      toast.error(
        error instanceof Error ? error.message : "Kunde inte skapa jämförelsen"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Group cars by category
  const categories = Array.from(new Set(carModels.map((car) => car.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Skapa AI-genererad jämförelse
          </h1>
          <p className="text-muted-foreground text-lg">
            Välj två bilmodeller så genererar vår AI en detaljerad jämförelse åt dig
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Välj bilar att jämföra</CardTitle>
            <CardDescription>
              Välj två olika bilmodeller för att skapa en ny jämförelse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bil 1</label>
              <Select value={car1} onValueChange={setCar1}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj första bilen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        {category}
                      </div>
                      {carModels
                        .filter((car) => car.category === category)
                        .map((car) => (
                          <SelectItem
                            key={car.id}
                            value={`${car.brand} ${car.model}`}
                          >
                            {car.brand} {car.model}
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-primary">VS</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bil 2</label>
              <Select value={car2} onValueChange={setCar2}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj andra bilen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                        {category}
                      </div>
                      {carModels
                        .filter((car) => car.category === category)
                        .map((car) => (
                          <SelectItem
                            key={car.id}
                            value={`${car.brand} ${car.model}`}
                          >
                            {car.brand} {car.model}
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !car1 || !car2}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Genererar jämförelse...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generera jämförelse
                </>
              )}
            </Button>

            {car1 && car2 && car1 !== car2 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Förhandsgranskning:</strong> {car1} vs {car2}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateComparison;
