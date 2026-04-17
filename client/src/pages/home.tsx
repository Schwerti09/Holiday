import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import { TravelThemes } from "@/components/travel-themes";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Gift, Mountain, Waves, Building2, Trees, Compass, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@shared/schema";

const regions = [
  { name: "Ostsee", icon: Waves, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80", count: 842 },
  { name: "Nordsee", icon: Waves, image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop&q=80", count: 634 },
  { name: "Bayern", icon: Mountain, image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=300&fit=crop&q=80", count: 1256 },
  { name: "Schwarzwald", icon: Trees, image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop&q=80", count: 523 },
  { name: "Harz", icon: Mountain, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80", count: 387 },
  { name: "Berlin", icon: Building2, image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=300&fit=crop&q=80", count: 445 },
];

const testimonials = [
  {
    name: "Sandra M.",
    location: "München",
    rating: 5,
    text: "Unser Wellness-Wochenende im Schwarzwald war einfach traumhaft! Die Buchung über DeineZeitEureZeit war unkompliziert und das Hotel hat alle Erwartungen übertroffen.",
    trip: "Wellness Schwarzwald",
  },
  {
    name: "Thomas & Julia K.",
    location: "Hamburg",
    rating: 5,
    text: "Zum Hochzeitstag haben wir uns einen Romantik-Kurzurlaub gegönnt. Das Suite-Upgrade war die beste Entscheidung - absolute Entspannung pur!",
    trip: "Romantik Bayern",
  },
  {
    name: "Familie Weber",
    location: "Berlin",
    rating: 5,
    text: "Mit zwei Kindern ist Urlaub oft stressig, aber das Familienhotel an der Ostsee war perfekt organisiert. Kinderbetreuung, Spa für die Eltern - wir kommen wieder!",
    trip: "Familienurlaub Ostsee",
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
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
      { threshold, rootMargin: "100px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

export default function Home() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const regionsRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const regionsInView = useInView(regionsRef);
  const giftInView = useInView(giftRef);
  const testimonialsInView = useInView(testimonialsRef);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead isHomePage totalProducts={9538} />
      
      <Header
        categories={categories}
        onSearch={() => {}}
        searchQuery=""
      />

      <Hero onSearch={() => {}} onCategoryChange={() => {}} />

      <main className="flex-1">
        <section className="py-16 md:py-20 bg-background relative overflow-hidden" data-testid="section-themes">
          <div className="blur-circle blur-circle-accent w-64 h-64 -top-32 right-1/4 opacity-30" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-themes-title">
                Wellness-Kurzurlaub & <span className="animate-gradient-text">Romantik-Kurzreisen</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-themes-subtitle">
                Hotel Kurztrips für jedes Interesse! Entdecken Sie über 9.500 handverlesene Angebote.
              </p>
            </div>
            <TravelThemes />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-secondary/20 relative" data-testid="section-about">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Compass className="w-4 h-4" />
                Ihr Reiseportal für Kurzurlaub
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Kurzurlaub & Kurzreise. <span className="animate-gradient-text">Kurztrips in Deutschland.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                Verwoehnwochenende.de - Reiseportal für <strong className="text-foreground">Kurzurlaub Angebote</strong> und <strong className="text-foreground">Wochenendtrips</strong>. 
                Kurzreisen als Wellness Wochenende oder Romantik Wochenende, zu den schönsten Urlaubsregionen.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Der <strong className="text-foreground">kurze Urlaub in Deutschland</strong> ist erholsam. Vom Wochenendtrip im Harz bis zu 
                Wellness in den Bergen. Schlösser, Weinberge, Seen und Kultur.
              </p>
            </div>
          </div>
        </section>

        <section ref={regionsRef} className="py-16 md:py-20 bg-background relative overflow-hidden" data-testid="section-regions">
          <div className="blur-circle blur-circle-primary w-48 h-48 bottom-0 left-1/4 opacity-20" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Kurzreisen zu <span className="animate-gradient-text">Urlaubsregionen</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Beliebte Reiseziele in Deutschland
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {regions.map((region, index) => {
                const IconComponent = region.icon;
                return (
                  <Link key={region.name} href={`/kategorie/reisen?region=${region.name.toLowerCase()}`}>
                    <Card 
                      className={cn(
                        "group cursor-pointer border-card-border bg-card card-lift shine-effect overflow-hidden gpu-accelerate",
                        "transition-all duration-500",
                        regionsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      )}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                        <img
                          src={region.image}
                          alt={region.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <h3 className="font-bold text-sm flex items-center gap-1.5 mb-0.5">
                            <IconComponent className="w-4 h-4" />
                            {region.name}
                          </h3>
                          <p className="text-xs text-white/70">{region.count} Angebote</p>
                        </div>
                        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                          <ArrowRight className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={giftRef} className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent relative overflow-hidden" data-testid="section-gift">
          <div className="blur-circle blur-circle-primary w-72 h-72 top-1/2 -translate-y-1/2 -right-36 opacity-40" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
            <Card 
              className={cn(
                "border-primary/20 bg-card overflow-hidden shine-effect transition-all duration-700",
                giftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center animate-float shadow-lg shadow-primary/30">
                    <Gift className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Hotelgutschein <span className="animate-gradient-text">schenken</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Überraschen Sie Ihre Liebsten mit einem Kurzurlaub! Unsere Hotelgutscheine sind das 
                    perfekte Geschenk für jeden Anlass - flexibel einlösbar und mit großer Hotelauswahl.
                  </p>
                  <Button asChild size="lg" className="animate-pulse-glow shine-effect">
                    <a 
                      href="https://www.verwoehnwochenende.de/gutscheine" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Gutscheine entdecken
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section ref={testimonialsRef} className="py-16 md:py-20 bg-secondary/10 relative overflow-hidden" data-testid="section-testimonials">
          <div className="blur-circle blur-circle-accent w-56 h-56 top-0 left-1/3 opacity-20" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-current" />
                Kundenbewertungen
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Das sagen unsere <span className="animate-gradient-text">Gäste</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Echte Erfahrungen von zufriedenen Kurzurlaubern
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.name}
                  className={cn(
                    "border-card-border bg-card relative transition-all duration-500",
                    testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  data-testid={`card-testimonial-${index}`}
                >
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {testimonial.trip}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background" data-testid="section-quicklinks">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Zum Kurzurlaub</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Kurzurlaub nach Reisethema", href: "/kategorien" },
                { title: "Suiten & Whirlpoolzimmer", href: "/kategorie/reisen?theme=luxus" },
                { title: "Hotelgutschein schenken", href: "https://www.verwoehnwochenende.de/gutscheine", external: true },
                { title: "Kurztrips in Europa", href: "/kategorie/reisen" },
                { title: "Städtetrips", href: "/kategorie/reisen?theme=staedtetrip" },
                { title: "Wellness Wochenende", href: "/wellness" },
                { title: "Romantik Wochenende", href: "/romantik" },
                { title: "Verwöhnprodukte", href: "/verwoehnartikel" },
              ].map((link) => (
                <Link 
                  key={link.title}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <ArrowRight className="w-3 h-3 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    <span>{link.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
