import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Home as HomeIcon, Heart, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import { ProductQuickView } from "@/components/product-quick-view";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { useShop } from "@/contexts/shop-context";
import { useState } from "react";
import type { Product, Category } from "@shared/schema";

export default function WishlistPage() {
  const { wishlistIds, clearWishlist, wishlistCount } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: allProductsData } = useQuery<{ products: Product[] }>({
    queryKey: ["/api/products", { limit: 2000 }],
  });

  const wishlistProducts = allProductsData?.products?.filter((p: Product) =>
    wishlistIds.includes(p.id)
  ) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Meine Merkliste | DeineZeitEureZeit"
        description="Deine gespeicherten Lieblingsprodukte auf einen Blick."
      />

      <Header categories={categories} onSearch={() => {}} searchQuery="" />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-accent via-background to-secondary/30 py-12 md:py-16" data-testid="section-wishlist-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                <HomeIcon className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium" data-testid="text-breadcrumb-current">
                Merkliste
              </span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2 flex items-center gap-3" data-testid="text-wishlist-title">
                  <Heart className="h-8 w-8 text-destructive fill-destructive" />
                  Meine Merkliste
                </h1>
                <p className="text-muted-foreground" data-testid="text-wishlist-count">
                  {wishlistCount} {wishlistCount === 1 ? "Produkt" : "Produkte"} gespeichert
                </p>
              </div>
              {wishlistCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="gap-2"
                  data-testid="button-clear-wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                  Alle entfernen
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16" data-testid="section-wishlist-products">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {wishlistCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="container-empty-wishlist">
                <div className="w-24 h-24 mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Deine Merkliste ist leer</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Entdecke unsere Produkte und speichere deine Favoriten für später.
                </p>
                <Link href="/">
                  <Button data-testid="button-browse-products">Produkte entdecken</Button>
                </Link>
              </div>
            ) : (
              <ProductGrid
                products={wishlistProducts}
                isLoading={false}
                hasMore={false}
                onLoadMore={() => {}}
                onQuickView={setQuickViewProduct}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </div>
  );
}
