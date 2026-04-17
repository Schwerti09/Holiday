import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Home as HomeIcon, GitCompare, Trash2, ExternalLink, X } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShop } from "@/contexts/shop-context";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@shared/schema";

export default function ComparePage() {
  const { compareIds, clearCompare, compareCount, removeFromCompare, maxCompareItems } = useShop();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: allProducts } = useQuery<{ products: Product[] }>({
    queryKey: ["/api/products", { limit: 2000 }],
  });

  const compareProducts = allProducts?.products?.filter((p: Product) =>
    compareIds.includes(p.id)
  ) || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const comparisonRows = [
    { label: "Kategorie", key: "category" },
    { label: "Preis", key: "price" },
    { label: "Versandkosten", key: "shipping" },
    { label: "Verfügbarkeit", key: "availability" },
    { label: "Hersteller", key: "manufacturer" },
    { label: "Lieferzeit", key: "deliveryTime" },
  ];

  const getValue = (product: Product, key: string) => {
    switch (key) {
      case "category":
        return product.category;
      case "price":
        return formatPrice(product.priceBrutto);
      case "shipping":
        return product.shippingCost 
          ? product.shippingCost > 0 
            ? formatPrice(product.shippingCost)
            : "Kostenlos"
          : "-";
      case "availability":
        return product.availability === "in stock" ? "Auf Lager" : "Nicht verfügbar";
      case "manufacturer":
        return product.manufacturer || "-";
      case "deliveryTime":
        return product.deliveryTime ? `${product.deliveryTime} Tage` : "-";
      default:
        return "-";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Produktvergleich | DeineZeitEureZeit"
        description="Vergleiche bis zu 4 Produkte und finde das beste Angebot."
      />

      <Header categories={categories} onSearch={() => {}} searchQuery="" />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-accent via-background to-secondary/30 py-12 md:py-16" data-testid="section-compare-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                <HomeIcon className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium" data-testid="text-breadcrumb-current">
                Produktvergleich
              </span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2 flex items-center gap-3" data-testid="text-compare-title">
                  <GitCompare className="h-8 w-8 text-primary" />
                  Produktvergleich
                </h1>
                <p className="text-muted-foreground" data-testid="text-compare-count">
                  {compareCount} von {maxCompareItems} Produkten zum Vergleich
                </p>
              </div>
              {compareCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCompare}
                  className="gap-2"
                  data-testid="button-clear-compare"
                >
                  <Trash2 className="h-4 w-4" />
                  Vergleich leeren
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16" data-testid="section-compare-table">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {compareCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="container-empty-compare">
                <div className="w-24 h-24 mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                  <GitCompare className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Keine Produkte zum Vergleichen</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Füge bis zu 4 Produkte hinzu, um sie miteinander zu vergleichen.
                </p>
                <Link href="/">
                  <Button data-testid="button-browse-products">Produkte entdecken</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className={cn(
                    "grid gap-4 mb-6",
                    compareCount === 1 && "grid-cols-1 max-w-sm",
                    compareCount === 2 && "grid-cols-2 max-w-2xl",
                    compareCount === 3 && "grid-cols-3 max-w-4xl",
                    compareCount === 4 && "grid-cols-4"
                  )}>
                    {compareProducts.map((product) => (
                      <Card key={product.id} className="relative overflow-hidden" data-testid={`card-compare-${product.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm"
                          onClick={() => removeFromCompare(product.id)}
                          data-testid={`button-remove-compare-${product.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="aspect-square overflow-hidden bg-secondary/30">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-sm line-clamp-2 mb-2" data-testid={`text-compare-title-${product.id}`}>
                            {product.title.split("»")[0].trim()}
                          </h3>
                          <p className="text-lg font-semibold text-foreground mb-3" data-testid={`text-compare-price-${product.id}`}>
                            {formatPrice(product.priceBrutto)}
                          </p>
                          <a href={product.deeplink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="w-full gap-2" data-testid={`button-compare-view-${product.id}`}>
                              Zum Angebot
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="overflow-hidden">
                    <div className="divide-y divide-border">
                      {comparisonRows.map((row) => (
                        <div
                          key={row.key}
                          className={cn(
                            "grid gap-4",
                            compareCount === 1 && "grid-cols-2",
                            compareCount === 2 && "grid-cols-3",
                            compareCount === 3 && "grid-cols-4",
                            compareCount === 4 && "grid-cols-5"
                          )}
                          data-testid={`row-compare-${row.key}`}
                        >
                          <div className="p-4 font-medium bg-secondary/30">
                            {row.label}
                          </div>
                          {compareProducts.map((product) => (
                            <div key={product.id} className="p-4 text-sm">
                              {row.key === "availability" ? (
                                <Badge variant={product.availability === "in stock" ? "default" : "secondary"}>
                                  {getValue(product, row.key)}
                                </Badge>
                              ) : (
                                getValue(product, row.key)
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
