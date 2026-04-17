import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { ProductGrid } from "@/components/product-grid";
import { Filters } from "@/components/filters";
import { ProductQuickView } from "@/components/product-quick-view";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, ShoppingBag } from "lucide-react";
import type { Product, Category, PaginatedResponse } from "@shared/schema";

const PRODUCTS_PER_PAGE = 16;

const nonTravelCategories = [
  "schals", "handschuhe", "kuscheldecken", "bademantel", "socken-und-struempfe",
  "kinderschuhe", "schuhe", "muetzen", "unterwaesche", "taschen", "deko-kissen",
  "baby-erstausstattung", "wellness-beauty", "kinder-handschuhe", "kindersocken",
  "hosen", "kinderbademantel", "baderosen", "grill-kueche", "guertel", "waermekissen",
  "damen-parfuem", "herren-parfuem", "deko-teppiche-vorleger", "zugluftstopper",
  "hundemantel-hundepullover", "kinderschals", "kindermuetzen", "deko-artikel",
  "kinderdecke", "hundebetten-hundedecken", "geschenkartikel", "hundefutter"
];

export default function Verwoehnartikel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const productCategories = useMemo(() => 
    categories.filter(cat => cat.slug !== "reisen"),
    [categories]
  );

  const { data: productsData, isLoading: productsLoading, isFetching } = useQuery<PaginatedResponse>({
    queryKey: [
      "/api/products",
      {
        query: searchQuery,
        category: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort: sortBy,
        page,
        limit: PRODUCTS_PER_PAGE,
        excludeCategory: "Reisen",
      },
    ],
  });

  useEffect(() => {
    if (productsData?.products) {
      const nonTravelProducts = productsData.products.filter(
        p => p.category.toLowerCase() !== "reisen"
      );
      if (page === 1) {
        setAllProducts(nonTravelProducts);
      } else {
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = nonTravelProducts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      }
    }
  }, [productsData?.products, page]);

  const maxPrice = useMemo(() => {
    if (!allProducts.length) return 200;
    const max = Math.max(...allProducts.map((p) => p.priceBrutto));
    return Math.ceil(max / 10) * 10;
  }, [allProducts]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
    setAllProducts([]);
  }, []);

  const handleCategoryChange = useCallback((category: string | undefined) => {
    setSelectedCategory(category);
    setPage(1);
    setAllProducts([]);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    setPage(1);
    setAllProducts([]);
  }, []);

  const handlePriceChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
    setPage(1);
    setAllProducts([]);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (productsData?.hasMore) {
      setPage((p) => p + 1);
    }
  }, [productsData?.hasMore]);

  const breadcrumbs = [
    { name: "Home", url: "https://lass-dich-verwoehnen.de" },
    { name: "Verwöhnprodukte", url: "https://lass-dich-verwoehnen.de/verwoehnartikel" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Verwöhnprodukte | Premium Lifestyle Artikel | DeineZeitEureZeit"
        description="Entdecken Sie unsere handverlesenen Verwöhnprodukte: Kuschelige Decken, edle Schals, hochwertige Accessoires und mehr für Ihr Wohlbefinden."
        breadcrumbs={breadcrumbs}
        canonicalPath="/verwoehnartikel"
      />

      <Header
        categories={categories}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16 md:py-24">
        <div className="blur-circle blur-circle-primary w-96 h-96 -top-48 -right-48 opacity-30" />
        <div className="blur-circle blur-circle-accent w-64 h-64 bottom-0 left-1/4 opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-slide-up">
              <ShoppingBag className="w-4 h-4" />
              Premium Lifestyle Produkte
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up wow-1">
              <span className="animate-gradient-text">Verwöhnprodukte</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up wow-2">
              Handverlesene Produkte für Ihr Wohlbefinden. Kuschelige Decken, edle Schals, 
              hochwertige Accessoires und mehr.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-slide-up wow-3">
            {[
              { icon: Sparkles, title: "Premium Qualität", desc: "Nur die besten Produkte für Sie" },
              { icon: Heart, title: "Verwöhn-Garantie", desc: "Für Ihr persönliches Wohlbefinden" },
              { icon: ShoppingBag, title: "Große Auswahl", desc: "Über 1.100 Premium-Artikel" },
            ].map((feature, i) => (
              <Card key={feature.title} className="glass border-0 card-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {selectedCategory || "Alle Verwöhnprodukte"}
            </h2>
            <p className="text-muted-foreground">
              {allProducts.length > 0 ? `${allProducts.length} Produkte gefunden` : "Produkte werden geladen..."}
            </p>
          </div>

          <Filters
            categories={productCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            totalProducts={allProducts.length}
            className="mb-8"
          />

          <ProductGrid
            products={allProducts}
            isLoading={productsLoading && page === 1}
            hasMore={productsData?.hasMore}
            onLoadMore={handleLoadMore}
            isLoadingMore={isFetching && page > 1}
            onQuickView={setQuickViewProduct}
            emptyMessage={
              searchQuery
                ? `Keine Ergebnisse für "${searchQuery}"`
                : "Keine Produkte gefunden"
            }
          />
        </div>
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
