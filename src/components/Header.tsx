import { useState } from "react";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateComparisonModal } from "@/components/CreateComparisonModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { label: "Hem", href: "/" },
    { label: "Jämförelser", href: "/jamforelser" },
    { label: "Elbilar", href: "/elbilar" },
    { label: "SUV", href: "/suv" },
    { label: "Sportbilar", href: "/sportbilar" },
    { label: "Nyheter", href: "/nyheter" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-foreground text-primary-foreground">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="bg-accent px-3 py-1 skew-accent">
            <span className="skew-reset block font-display text-2xl font-bold text-accent-foreground tracking-tight">
              BIL
            </span>
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">GUIDEN</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-display text-sm tracking-wide hover:text-accent transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Search & Menu */}
        <div className="flex items-center gap-3">
          <Button 
            variant="default" 
            size="sm"
            className="hidden md:flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
            Skapa jämförelse
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground hover:text-accent hover:bg-transparent"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:text-accent hover:bg-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-foreground border-t border-muted/20 animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-display text-lg tracking-wide hover:text-accent transition-colors duration-200 py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      <CreateComparisonModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default Header;
