import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Car, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  getAllMakes,
  getModelsForMake,
  getYearsForModel,
  formatMakeName,
  type Make,
  type Model,
} from "@/services/nhtsa";

interface CreateComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateComparisonModal = ({
  open,
  onOpenChange,
}: CreateComparisonModalProps) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  // Car 1 state
  const [car1Make, setCar1Make] = useState<string>("");
  const [car1Model, setCar1Model] = useState<string>("");
  const [car1Year, setCar1Year] = useState<string>("");
  const [car1Models, setCar1Models] = useState<Model[]>([]);
  const [car1ModelsLoading, setCar1ModelsLoading] = useState(false);
  const [car1Years, setCar1Years] = useState<number[]>([]);
  const [car1YearsLoading, setCar1YearsLoading] = useState(false);

  // Car 2 state
  const [car2Make, setCar2Make] = useState<string>("");
  const [car2Model, setCar2Model] = useState<string>("");
  const [car2Year, setCar2Year] = useState<string>("");
  const [car2Models, setCar2Models] = useState<Model[]>([]);
  const [car2ModelsLoading, setCar2ModelsLoading] = useState(false);
  const [car2Years, setCar2Years] = useState<number[]>([]);
  const [car2YearsLoading, setCar2YearsLoading] = useState(false);

  // All makes (loaded instantly)
  const [makes] = useState<Make[]>(() => getAllMakes());
  const makesLoading = false;

  // Load models when car1 make changes
  useEffect(() => {
    if (car1Make) {
      setCar1Model("");
      setCar1Year("");
      setCar1Years([]);
      setCar1ModelsLoading(true);
      getModelsForMake(car1Make)
        .then(setCar1Models)
        .catch((error) => {
          console.error("Failed to load models:", error);
          toast.error("Kunde inte ladda modeller");
        })
        .finally(() => setCar1ModelsLoading(false));
    } else {
      setCar1Models([]);
      setCar1Model("");
      setCar1Year("");
      setCar1Years([]);
    }
  }, [car1Make]);

  // Load years when car1 model changes
  useEffect(() => {
    if (car1Make && car1Model) {
      setCar1Year("");
      setCar1YearsLoading(true);
      getYearsForModel(car1Make, car1Model)
        .then(setCar1Years)
        .catch((error) => {
          console.error("Failed to load years:", error);
          toast.error("Kunde inte ladda årsmodeller");
        })
        .finally(() => setCar1YearsLoading(false));
    } else {
      setCar1Years([]);
      setCar1Year("");
    }
  }, [car1Make, car1Model]);

  // Load models when car2 make changes
  useEffect(() => {
    if (car2Make) {
      setCar2Model("");
      setCar2Year("");
      setCar2Years([]);
      setCar2ModelsLoading(true);
      getModelsForMake(car2Make)
        .then(setCar2Models)
        .catch((error) => {
          console.error("Failed to load models:", error);
          toast.error("Kunde inte ladda modeller");
        })
        .finally(() => setCar2ModelsLoading(false));
    } else {
      setCar2Models([]);
      setCar2Model("");
      setCar2Year("");
      setCar2Years([]);
    }
  }, [car2Make]);

  // Load years when car2 model changes
  useEffect(() => {
    if (car2Make && car2Model) {
      setCar2Year("");
      setCar2YearsLoading(true);
      getYearsForModel(car2Make, car2Model)
        .then(setCar2Years)
        .catch((error) => {
          console.error("Failed to load years:", error);
          toast.error("Kunde inte ladda årsmodeller");
        })
        .finally(() => setCar2YearsLoading(false));
    } else {
      setCar2Years([]);
      setCar2Year("");
    }
  }, [car2Make, car2Model]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setCar1Make("");
      setCar1Model("");
      setCar1Year("");
      setCar1Years([]);
      setCar2Make("");
      setCar2Model("");
      setCar2Year("");
      setCar2Years([]);
    }
  }, [open]);

  const car1Full =
    car1Make && car1Model && car1Year
      ? `${formatMakeName(car1Make)} ${car1Model} (${car1Year})`
      : "";
  const car2Full =
    car2Make && car2Model && car2Year
      ? `${formatMakeName(car2Make)} ${car2Model} (${car2Year})`
      : "";

  const handleGenerate = async () => {
    if (!car1Full || !car2Full) {
      toast.error("Välj två bilar att jämföra");
      return;
    }

    if (car1Full === car2Full) {
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
        body: JSON.stringify({ car1: car1Full, car2: car2Full }),
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

  const renderCarSelector = (
    carNumber: 1 | 2,
    make: string,
    setMake: (value: string) => void,
    model: string,
    setModel: (value: string) => void,
    year: string,
    setYear: (value: string) => void,
    models: Model[],
    modelsLoading: boolean,
    availableYears: number[],
    yearsLoading: boolean
  ) => (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Bil {carNumber}</label>

      <div className="grid grid-cols-2 gap-2">
        {/* Make selector */}
        <Select value={make} onValueChange={setMake} disabled={makesLoading}>
          <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
            <SelectValue
              placeholder={makesLoading ? "Laddar..." : "Märke"}
            />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] border-gray-700 max-h-[300px]">
            {makes.map((m) => (
              <SelectItem
                key={m.Make_Name}
                value={m.Make_Name}
                className="text-white hover:bg-gray-700"
              >
                {formatMakeName(m.Make_Name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Model selector */}
        <Select
          value={model}
          onValueChange={setModel}
          disabled={!make || modelsLoading}
        >
          <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
            <SelectValue
              placeholder={
                !make
                  ? "Välj märke"
                  : modelsLoading
                    ? "Laddar..."
                    : "Modell"
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] border-gray-700 max-h-[300px]">
            {models.map((m) => (
              <SelectItem
                key={m.Model_ID}
                value={m.Model_Name}
                className="text-white hover:bg-gray-700"
              >
                {m.Model_Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year selector */}
      <Select value={year} onValueChange={setYear} disabled={!model || yearsLoading}>
        <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
          <SelectValue 
            placeholder={
              !model 
                ? "Välj modell först" 
                : yearsLoading 
                  ? "Laddar årsmodeller..." 
                  : availableYears.length === 0
                    ? "Inga årsmodeller hittades"
                    : "Välj årsmodell"
            } 
          />
        </SelectTrigger>
        <SelectContent className="bg-[#2a2a2a] border-gray-700 max-h-[300px]">
          {availableYears.map((y) => (
            <SelectItem
              key={y}
              value={y.toString()}
              className="text-white hover:bg-gray-700"
            >
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Selected car preview */}
      {make && model && year && (
        <div className="flex items-center gap-2 text-sm text-accent">
          <ChevronRight className="h-4 w-4" />
          {formatMakeName(make)} {model} ({year})
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px] bg-[#1a1a1a] border-black"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-white">
            <Car className="w-6 h-6 text-accent" />
            Skapa AI-genererad jämförelse
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Välj märke, modell och årsmodell för två bilar så genererar vår AI
            en detaljerad jämförelse åt dig
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {renderCarSelector(
            1,
            car1Make,
            setCar1Make,
            car1Model,
            setCar1Model,
            car1Year,
            setCar1Year,
            car1Models,
            car1ModelsLoading,
            car1Years,
            car1YearsLoading
          )}

          <div className="flex items-center justify-center">
            <div className="text-2xl font-bold text-gray-400">VS</div>
          </div>

          {renderCarSelector(
            2,
            car2Make,
            setCar2Make,
            car2Model,
            setCar2Model,
            car2Year,
            setCar2Year,
            car2Models,
            car2ModelsLoading,
            car2Years,
            car2YearsLoading
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !car1Full || !car2Full}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display tracking-wide"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Genererar jämförelse...
              </>
            ) : (
              <>
                <Car className="mr-2 h-4 w-4" />
                Generera jämförelse
              </>
            )}
          </Button>

          {car1Full && car2Full && car1Full !== car2Full && (
            <div className="mt-4 p-4 bg-[#2a2a2a] rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">
                <strong className="text-white">Förhandsgranskning:</strong>{" "}
                {car1Full} vs {car2Full}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
