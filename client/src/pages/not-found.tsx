import { Link } from "wouter";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        {/* Dekoratives Element */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          </div>
          <h1 className="relative font-serif text-8xl font-bold text-primary/20">
            404
          </h1>
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Seite nicht gefunden
        </h2>
        
        <p className="text-muted-foreground mb-8">
          Ups! Die Seite, die du suchst, existiert leider nicht. 
          Vielleicht findest du, was du suchst, auf unserer Startseite.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="gap-2" data-testid="button-404-home">
              <Home className="h-4 w-4" />
              Zur Startseite
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
            data-testid="button-404-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        </div>

        {/* Suchvorschlag */}
        <div className="mt-12 p-6 rounded-lg bg-card border border-card-border">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
            <Search className="h-4 w-4" />
            <span className="text-sm">Beliebte Kategorien</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/kategorie/schals">
              <Button variant="secondary" size="sm">Schals</Button>
            </Link>
            <Link href="/kategorie/kuscheldecken">
              <Button variant="secondary" size="sm">Kuscheldecken</Button>
            </Link>
            <Link href="/kategorie/handschuhe">
              <Button variant="secondary" size="sm">Handschuhe</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
