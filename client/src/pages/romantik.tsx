import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { ProductGrid, ProductGridSkeleton } from "@/components/product-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Heart, Sparkles, Utensils, Wine, Flower2, Moon, ChevronRight } from "lucide-react";
import type { Product } from "@shared/schema";

const romantikFeatures = [
  { icon: Heart, title: "Romantik-Zimmer", desc: "Liebevoll dekoriert mit Rosen und Kerzen" },
  { icon: Utensils, title: "Candle-Light-Dinner", desc: "Kulinarische Highlights bei Kerzenschein" },
  { icon: Wine, title: "Champagner", desc: "Prickelnde Momente mit edlen Tropfen" },
  { icon: Flower2, title: "Paarmassage", desc: "Entspannung zu zweit im Spa" },
];

export default function RomantikPage() {
  const { data: productsData, isLoading } = useQuery<{ products: Product[]; total: number }>({
    queryKey: ['/api/products', { category: 'reisen', query: 'romantik', limit: 12 }],
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Romantisches Wochenende zu zweit | Kuschelurlaub buchen | DeineZeitEureZeit"
        description="Romantik-Kurzurlaub für Verliebte: Candle-Light-Dinner, Rosenzimmer, Paarmassage und mehr. Über 1.000 romantische Angebote für unvergessliche Momente zu zweit."
        pageType="landing"
        canonicalPath="/romantik"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Romantisches Wochenende", url: "/romantik" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section 
          className="relative bg-cover bg-center py-16 md:py-24"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920&h=600&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-rose-400 mb-4">
                <Heart className="h-6 w-6" />
                <span className="text-sm font-medium uppercase tracking-wider">Romantik Kurzurlaub</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-romantik-title">
                Romantisches Wochenende zu zweit
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Zeit für die Liebe. Genießen Sie besondere Momente mit ausgewählten Romantik-Angeboten 
                in exklusiven Hotels – perfekt für Verliebte und Paare.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 bg-rose-600 hover:bg-rose-700" asChild>
                  <Link href="/kategorie/reisen?query=romantik">
                    Alle Romantik-Angebote
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-rose-50 dark:bg-rose-950/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {romantikFeatures.map((feature, i) => (
                <Card key={i} className="text-center hover-elevate border-rose-200/50">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Beliebte Romantik-Angebote
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kuschelwochenende, Candle-Light-Dinner und mehr – für unvergessliche Momente zu zweit
              </p>
            </div>
            
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : (
              <ProductGrid products={productsData?.products || []} />
            )}

            <div className="text-center mt-10">
              <Button size="lg" variant="outline" asChild>
                <Link href="/kategorie/reisen?query=romantik">
                  Alle {productsData?.total || 1000}+ Romantik-Angebote anzeigen
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gradient-to-br from-rose-50 to-background dark:from-rose-950/20 dark:to-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop" 
                  alt="Romantisches Zimmer"
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop" 
                  alt="Candle Light Dinner"
                  className="rounded-lg shadow-lg mt-6"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Romantik für jeden Anlass
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Hochzeitstag:</strong> Feiern Sie Ihre Liebe 
                    mit einem besonderen Wochenende.
                  </p>
                  <p>
                    <strong className="text-foreground">Valentinstag:</strong> Überraschen Sie Ihren 
                    Schatz mit einem romantischen Kurztrip.
                  </p>
                  <p>
                    <strong className="text-foreground">Heiratsantrag:</strong> Der perfekte Rahmen 
                    für die wichtigste Frage.
                  </p>
                  <p>
                    <strong className="text-foreground">Einfach so:</strong> Weil Liebe keinen 
                    besonderen Anlass braucht.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
