import { useState } from "react";
import { Link } from "wouter";
import { Heart, Shield, Truck, CreditCard, Mail, CheckCircle, Loader2, Sparkles, Hotel, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");
    toast({
      title: "Erfolgreich angemeldet!",
      description: "Sie erhalten ab jetzt unsere exklusiven Angebote.",
    });
  };

  return (
    <footer className="bg-card border-t border-border mt-16" data-testid="footer">
      <div className="border-b border-border" data-testid="container-footer-trust">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center" data-testid="card-trust-shipping">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Hotel className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm text-foreground mb-1">10.000+ Angebote</h4>
              <p className="text-xs text-muted-foreground">Kurzreisen & Wellness</p>
            </div>
            <div className="flex flex-col items-center text-center" data-testid="card-trust-secure">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm text-foreground mb-1">Sichere Buchung</h4>
              <p className="text-xs text-muted-foreground">SSL-verschlüsselt</p>
            </div>
            <div className="flex flex-col items-center text-center" data-testid="card-trust-payment">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm text-foreground mb-1">Flexible Zahlung</h4>
              <p className="text-xs text-muted-foreground">Alle gängigen Methoden</p>
            </div>
            <div className="flex flex-col items-center text-center" data-testid="card-trust-quality">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm text-foreground mb-1">Trusted Shops</h4>
              <p className="text-xs text-muted-foreground">Zertifizierter Partner</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="sm:col-span-2 lg:col-span-1" data-testid="container-footer-brand">
            <Link href="/" data-testid="link-footer-home">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                DeineZeitEureZeit
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-footer-description">
              Ihr Partner für Kurzreisen, Wellness-Wochenenden und Premium-Lifestyle-Produkte.
            </p>
            <a 
              href="https://www.verwoehnwochenende.de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Partner: Verwoehnwochenende.de
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div data-testid="container-footer-themes">
            <h3 className="font-medium text-foreground mb-4">Reisethemen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/wellness" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-wellness">
                  Wellness-Wochenende
                </Link>
              </li>
              <li>
                <Link href="/romantik" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-romantik">
                  Romantik-Kurzurlaub
                </Link>
              </li>
              <li>
                <Link href="/kategorie/reisen" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-reisen">
                  Alle Kurzreisen
                </Link>
              </li>
              <li>
                <Link href="/kategorien" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-alle-kategorien">
                  Alle Kategorien
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blog">
                  Reise-Blog & Tipps
                </Link>
              </li>
            </ul>
          </div>

          <div data-testid="container-footer-service">
            <h3 className="font-medium text-foreground mb-4">Service & Hilfe</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">
                  Häufige Fragen (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/zahlung-versand" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-zahlung">
                  Zahlung & Versand
                </Link>
              </li>
              <li>
                <Link href="/reiserichtlinien" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-reiserichtlinien">
                  Reiserichtlinien
                </Link>
              </li>
              <li>
                <Link href="/reiseversicherung" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-versicherung">
                  Reiseversicherung
                </Link>
              </li>
            </ul>
          </div>

          <div data-testid="container-footer-legal">
            <h3 className="font-medium text-foreground mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-imprint">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-agb">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/widerruf" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-widerruf">
                  Widerrufsbelehrung
                </Link>
              </li>
              <li>
                <Link href="/barrierefreiheit" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-barrierefreiheit">
                  Barrierefreiheit
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  Über uns
                </Link>
              </li>
            </ul>
          </div>

          <div data-testid="container-footer-newsletter">
            <h3 className="font-medium text-foreground mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Erhalten Sie exklusive Angebote und Reise-Inspirationen.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>Sie sind angemeldet!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ihre E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                  data-testid="input-newsletter"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  data-testid="button-newsletter"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Separator />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left" data-testid="text-footer-copyright">
            © {currentYear} DeineZeitEureZeit | Betreiber: Rolf Schwertfechter, Dornum
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right" data-testid="text-footer-disclaimer">
            * Affiliate-Partner von Verwoehnwochenende.de. Der Preis für Sie bleibt unverändert.
          </p>
        </div>
      </div>
    </footer>
  );
}
