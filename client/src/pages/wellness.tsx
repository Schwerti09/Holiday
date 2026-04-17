import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { ProductGrid, ProductGridSkeleton } from "@/components/product-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sparkles, Heart, Droplets, Leaf, Sun, Moon, ChevronRight } from "lucide-react";
import type { Product } from "@shared/schema";

const wellnessFeatures = [
  { icon: Droplets, title: "Spa & Sauna", desc: "Entspannung pur in luxuriösen Wellnessbereichen" },
  { icon: Heart, title: "Massagen", desc: "Wohltuende Behandlungen für Körper und Geist" },
  { icon: Leaf, title: "Beauty", desc: "Verwöhnprogramme für strahlende Schönheit" },
  { icon: Sun, title: "Pool & Therme", desc: "Schwimmen und relaxen in wohlig warmem Wasser" },
];

export default function WellnessPage() {
  const { data: productsData, isLoading } = useQuery<{ products: Product[]; total: number }>({
    queryKey: ['/api/products', { category: 'reisen', query: 'wellness', limit: 12 }],
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Wellness-Wochenende buchen | Spa, Sauna & Massagen | DeineZeitEureZeit"
        description="Buchen Sie Ihr Wellness-Wochenende: Entspannung pur mit Spa, Sauna, Pool und wohltuenden Massagen in ausgewählten Wellnesshotels. Über 2.700 Angebote ab 59€."
        pageType="landing"
        canonicalPath="/wellness"
        breadcrumbs={[
          { name: "Startseite", url: "/" },
          { name: "Wellness-Wochenende", url: "/wellness" },
        ]}
      />
      <Header />
      
      <main className="flex-1">
        <section 
          className="relative bg-cover bg-center py-16 md:py-24"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=600&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Sparkles className="h-6 w-6" />
                <span className="text-sm font-medium uppercase tracking-wider">Wellness Kurzurlaub</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-wellness-title">
                Wellness-Wochenende im Wellnesshotel
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Zeit für die kleine Auszeit. Entspannen Sie in angenehmer Atmosphäre mit Sauna, 
                Dampfbad, Pool und wohltuenden Massagen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/kategorie/reisen?query=wellness">
                    Alle Wellness-Angebote
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wellnessFeatures.map((feature, i) => (
                <Card key={i} className="text-center hover-elevate">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-primary" />
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
                Beliebte Wellness-Angebote
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie handverlesene Wellness-Kurzurlaube mit Spa, Sauna und Verwöhnprogrammen
              </p>
            </div>
            
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : (
              <ProductGrid products={productsData?.products || []} />
            )}

            <div className="text-center mt-10">
              <Button size="lg" variant="outline" asChild>
                <Link href="/kategorie/reisen?query=wellness">
                  Alle {productsData?.total || 2700}+ Wellness-Angebote anzeigen
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Wellnesswochenende für jeden Anlass
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Pärchen Wellness:</strong> Romantische Auszeit zu zweit 
                    mit Paarmassagen und Candle-Light-Dinner.
                  </p>
                  <p>
                    <strong className="text-foreground">Freundinnen-Wellness:</strong> Mädels-Wochenende mit 
                    Beauty, Spa und Prosecco.
                  </p>
                  <p>
                    <strong className="text-foreground">Solo-Wellness:</strong> Me-Time pur – entspannen und 
                    neue Energie tanken.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop" 
                  alt="Spa Behandlung"
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop" 
                  alt="Pool"
                  className="rounded-lg shadow-lg mt-6"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
