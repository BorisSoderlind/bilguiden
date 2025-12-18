import { useState } from "react";
import { Send, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Tack för din anmälan!",
        description: "Du kommer nu få våra senaste jämförelser direkt i din inbox.",
      });
      setEmail("");
    }
  };

  return (
    <section className="relative bg-primary overflow-hidden py-16 lg:py-24">
      {/* Diagonal accents */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-accent/10 -skew-x-12 -translate-x-20" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-foreground/10 skew-x-12 translate-x-20" />
      
      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 mb-6">
            <Zap className="h-4 w-4" />
            <span className="font-display text-sm tracking-wide">NYHETSBREV</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            Missa inte nästa
            <span className="text-accent"> stora test</span>
          </h2>

          <p className="text-primary-foreground/80 text-lg mb-8">
            Få de senaste biljämförelserna, nyheter och exklusiva tester direkt i din inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Din e-postadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
            />
            <Button 
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-display tracking-wide"
            >
              Prenumerera
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
