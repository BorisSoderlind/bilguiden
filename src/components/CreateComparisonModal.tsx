import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { carModels } from "@/data/car-models";
import { toast } from "sonner";

interface CreateComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateComparisonModal = ({ open, onOpenChange }: CreateComparisonModalProps) => {
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
          toast.success("Denna jämförelse finns redan! Tar dig dit nu...");
          onOpenChange(false);
          navigate(`/artikel/${data.slug}`);
          return;
        }
        throw new Error(data.error || "Något gick fel");
      }

      toast.success("Jämförelsen har skapats! 🎉");
      onOpenChange(false);
      navigate(`/artikel/${data.slug}`);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#1a1a1a] border-black"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-white">
            <Sparkles className="w-6 h-6 text-gray-400" />
            Skapa AI-genererad jämförelse
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Välj två bilmodeller så genererar vår AI en detaljerad jämförelse åt dig
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Bil 1</label>
            <Select value={car1} onValueChange={setCar1}>
              <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                <SelectValue placeholder="Välj första bilen" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-gray-700">
                {categories.map((category) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-gray-400">
                      {category}
                    </div>
                    {carModels
                      .filter((car) => car.category === category)
                      .map((car) => (
                        <SelectItem
                          key={car.id}
                          value={`${car.brand} ${car.model}`}
                          className="text-white hover:bg-gray-700"
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
            <div className="text-2xl font-bold text-gray-400">VS</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Bil 2</label>
            <Select value={car2} onValueChange={setCar2}>
              <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                <SelectValue placeholder="Välj andra bilen" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-gray-700">
                {categories.map((category) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-gray-400">
                      {category}
                    </div>
                    {carModels
                      .filter((car) => car.category === category)
                      .map((car) => (
                        <SelectItem
                          key={car.id}
                          value={`${car.brand} ${car.model}`}
                          className="text-white hover:bg-gray-700"
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
            className="w-full bg-[#2a2a2a] hover:bg-[#333333] text-white border border-gray-700"
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
            <div className="mt-4 p-4 bg-[#2a2a2a] rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">
                <strong className="text-white">Förhandsgranskning:</strong> {car1} vs {car2}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
