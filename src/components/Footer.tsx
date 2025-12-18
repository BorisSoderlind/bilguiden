import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Kategorier": ["Elbilar", "SUV", "Sportbilar", "Familjebil", "Premium"],
    "Om oss": ["Redaktionen", "Kontakt", "Annonsera", "Press"],
    "Juridiskt": ["Användarvillkor", "Integritetspolicy", "Cookies"],
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-accent px-3 py-1 skew-accent">
                <span className="skew-reset block font-display text-xl font-bold text-accent-foreground tracking-tight">
                  BIL
                </span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">GUIDEN</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Sveriges mest omfattande sajt för biljämförelser. Vi testar, jämför och hjälper dig hitta rätt bil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm tracking-wide mb-4 text-accent">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-muted/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Bilguiden. Alla rättigheter förbehållna.
          </p>
          <p className="text-muted-foreground text-sm">
            Gjord med passion för bilar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
