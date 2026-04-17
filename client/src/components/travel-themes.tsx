import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, PartyPopper, Dog, Users } from "lucide-react";

interface TravelTheme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  offerCount: number;
  minPrice: number;
  link: string;
  featured?: boolean;
  icon: typeof Sparkles;
}

const travelThemes: TravelTheme[] = [
  {
    id: "wellness",
    title: "Wellnesswochenende im Wellnesshotel",
    subtitle: "Wellness Kurzurlaub",
    description: "Zeit für ein Wellnesswochenende, Zeit für die kleine Auszeit im Wellnesshotel. Kurz mal weg und ab ins Wellness-Wochenende, um in angenehmer Atmosphäre zu entspannen.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
    offerCount: 2741,
    minPrice: 33,
    link: "/wellness",
    featured: true,
    icon: Sparkles,
  },
  {
    id: "romantik",
    title: "Romantisches Wochenende zu zweit",
    subtitle: "Romantik Kurzurlaub",
    description: "Mit einem romantischen Kurztrip geht es ab in ein Wochenende voller Romantik, um besondere Momente in exklusiven Hotels zu genießen.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop&q=80",
    offerCount: 1083,
    minPrice: 43,
    link: "/romantik",
    featured: true,
    icon: Heart,
  },
  {
    id: "silvester",
    title: "Silvester im Hotel",
    subtitle: "Silvesterreisen",
    description: "Mit dem Silvester Kurzurlaub feiern Sie die Party des Jahres mal wo ganz anders. Komfortable Hotelzimmer, Sektempfang, Musik & Tanz.",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&h=400&fit=crop&q=80",
    offerCount: 89,
    minPrice: 169.50,
    link: "/kategorie/reisen?theme=silvester",
    icon: PartyPopper,
  },
  {
    id: "hund",
    title: "Kurzurlaub mit dem Hund",
    subtitle: "Hundeurlaub",
    description: "Hunde sind vollwertige Familienmitglieder. Unsere Vierbeiner reisen mit in den Urlaub, um die schönste Zeit des Jahres gemeinsam zu verbringen.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&q=80",
    offerCount: 4703,
    minPrice: 16,
    link: "/kategorie/reisen?theme=hund",
    icon: Dog,
  },
  {
    id: "freundinnen",
    title: "Kurzurlaub mit der Freundin",
    subtitle: "Mädels Wochenende",
    description: "Ein Wellness-Wochenende mit den besten Freundinnen ohne Männer – diesen Traum lassen unsere Kurzurlaub Angebote für Mädels wahr werden.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop&q=80",
    offerCount: 133,
    minPrice: 65,
    link: "/kategorie/reisen?theme=freundinnen",
    icon: Users,
  },
];

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "50px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

export function TravelThemes() {
  const featuredThemes = travelThemes.filter(t => t.featured);
  const regularThemes = travelThemes.filter(t => !t.featured);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as React.RefObject<HTMLElement>);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredThemes.map((theme, index) => (
          <FeaturedThemeCard key={theme.id} theme={theme} index={index} isVisible={isInView} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regularThemes.map((theme, index) => (
          <ThemeCard key={theme.id} theme={theme} index={index} isVisible={isInView} />
        ))}
      </div>
    </div>
  );
}

function FeaturedThemeCard({ theme, index, isVisible }: { theme: TravelTheme; index: number; isVisible: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const IconComponent = theme.icon;

  return (
    <Link href={theme.link}>
      <Card 
        className={cn(
          "group cursor-pointer overflow-hidden border-card-border bg-card card-lift shine-effect gpu-accelerate",
          "transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: `${index * 150}ms` }}
        data-testid={`card-theme-${theme.id}`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-muted/30">
            <div className={cn(
              "absolute inset-0 shimmer transition-opacity duration-500",
              imageLoaded ? "opacity-0" : "opacity-100"
            )} />
            <img
              src={theme.image}
              alt={theme.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 gpu-accelerate",
                "group-hover:scale-110",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-3 left-3 glass rounded-lg px-3 py-2 transition-transform duration-300 group-hover:scale-105">
              <p className="text-xs text-foreground/70 font-medium">
                {theme.offerCount.toLocaleString('de-DE')} Angebote
              </p>
              <p className="text-sm font-bold text-primary">
                ab {theme.minPrice.toFixed(2).replace('.', ',')} € <span className="text-xs font-normal text-foreground/60">p.P.</span>
              </p>
            </div>

            <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <ArrowRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          
          <CardContent className="flex-1 p-5 md:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{theme.subtitle}</span>
              </div>
              <h3 className="font-bold text-lg md:text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {theme.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 md:line-clamp-4">
                {theme.description}
              </p>
            </div>
            <div className="mt-4">
              <Button variant="default" size="sm" className="group/btn shine-effect">
                Angebote entdecken
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

function ThemeCard({ theme, index, isVisible }: { theme: TravelTheme; index: number; isVisible: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const IconComponent = theme.icon;

  return (
    <Link href={theme.link}>
      <Card 
        className={cn(
          "group cursor-pointer overflow-hidden border-card-border bg-card card-lift shine-effect h-full gpu-accelerate",
          "transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: `${(index + 2) * 150}ms` }}
        data-testid={`card-theme-${theme.id}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
          <div className={cn(
            "absolute inset-0 shimmer transition-opacity duration-500",
            imageLoaded ? "opacity-0" : "opacity-100"
          )} />
          <img
            src={theme.image}
            alt={theme.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 gpu-accelerate",
              "group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute top-3 left-3 glass rounded-lg px-3 py-2 transition-transform duration-300 group-hover:scale-105">
            <p className="text-xs text-foreground/70 font-medium">
              {theme.offerCount.toLocaleString('de-DE')} Angebote
            </p>
            <p className="text-sm font-bold text-primary">
              ab {theme.minPrice.toFixed(2).replace('.', ',')} € <span className="text-xs font-normal text-foreground/60">p.P.</span>
            </p>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-xs font-medium">{theme.subtitle}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {theme.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {theme.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function TravelThemesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="border-card-border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto shimmer" />
              <CardContent className="flex-1 p-6">
                <div className="h-6 w-3/4 shimmer rounded mb-3" />
                <div className="h-4 w-full shimmer rounded mb-2" />
                <div className="h-4 w-2/3 shimmer rounded" />
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-card-border overflow-hidden">
            <div className="aspect-[16/9] shimmer" />
            <CardContent className="p-4">
              <div className="h-5 w-3/4 shimmer rounded mb-2" />
              <div className="h-4 w-full shimmer rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
