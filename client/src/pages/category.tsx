import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "wouter";
import { ChevronRight, Home as HomeIcon, MapPin, Sparkles, Search } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import { Filters } from "@/components/filters";
import { ProductQuickView } from "@/components/product-quick-view";
import { Footer } from "@/components/footer";
import { SEOHead, generateCategoryBreadcrumbs } from "@/components/seo-head";
import { cn } from "@/lib/utils";
import type { Product, Category, PaginatedResponse } from "@shared/schema";

const categoryHeroImages: Record<string, { image: string; subtitle: string; gradient: string }> = {
  reisen: {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Entdecken Sie traumhafte Kurzurlaube, Wellness-Wochenenden und romantische Auszeiten",
    gradient: "from-primary/80 via-primary/50 to-transparent"
  },
  wellness: {
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Entspannung pur: Spa, Massage und Wellness für Körper und Seele",
    gradient: "from-teal-900/80 via-teal-800/50 to-transparent"
  },
  romantik: {
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Romantische Auszeiten zu zweit - unvergessliche Momente",
    gradient: "from-rose-900/80 via-rose-800/50 to-transparent"
  },
  schals: {
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Edle Schals und Tücher für jeden Anlass",
    gradient: "from-amber-900/80 via-amber-800/50 to-transparent"
  },
  kuscheldecken: {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Kuschelig weiche Decken für gemütliche Stunden",
    gradient: "from-stone-900/80 via-stone-800/50 to-transparent"
  },
};

const PRODUCTS_PER_PAGE = 16;

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const categorySlug = params.slug;
  const searchParams = useSearch();
  
  const urlQuery = useMemo(() => {
    const urlParams = new URLSearchParams(searchParams);
    return urlParams.get("q") || "";
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState("relevance");
  
  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Kategorien laden
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Aktuelle Kategorie finden
  const currentCategory = categories.find((c) => c.slug === categorySlug);

  // Produkte laden
  const { data: productsData, isLoading: productsLoading, isFetching } = useQuery<PaginatedResponse>({
    queryKey: [
      "/api/products",
      {
        query: searchQuery,
        category: currentCategory?.name,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort: sortBy,
        page,
        limit: PRODUCTS_PER_PAGE,
      },
    ],
    enabled: !!currentCategory,
  });

  // Produkte akkumulieren bei "Mehr laden"
  useEffect(() => {
    if (productsData?.products) {
      if (page === 1) {
        setAllProducts(productsData.products);
      } else {
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = productsData.products.filter(
            (p) => !existingIds.has(p.id)
          );
          return [...prev, ...newProducts];
        });
      }
    }
  }, [productsData?.products, page]);

  // Maximaler Preis ermitteln
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

  const breadcrumbs = currentCategory
    ? generateCategoryBreadcrumbs(currentCategory)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${currentCategory?.name || categorySlug} | DeineZeitEureZeit`}
        description={`Entdecke ${currentCategory?.count || 0} Produkte in der Kategorie ${currentCategory?.name || categorySlug}. Premium Qualität für dein Wohlbefinden.`}
        category={currentCategory}
        breadcrumbs={breadcrumbs}
      />

      <Header
        categories={categories}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="flex-1">
        {/* Kategorie Header mit Hero-Bild */}
        {categoryHeroImages[categorySlug || ""] ? (
          <section className="relative overflow-hidden min-h-[300px] md:min-h-[400px]" data-testid="section-category-hero">
            <div className="blur-circle blur-circle-primary w-64 h-64 -top-32 -left-32 animate-float opacity-50" />
            <div className="blur-circle blur-circle-accent w-48 h-48 bottom-0 right-1/4 animate-float-delayed opacity-40" />
            
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat gpu-accelerate"
              style={{ backgroundImage: `url('${categoryHeroImages[categorySlug || ""].image}')` }}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r",
                categoryHeroImages[categorySlug || ""].gradient
              )} />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
              <nav className="flex items-center gap-2 text-sm text-white/80 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
                <Link href="/" className="hover:text-white transition-colors" data-testid="link-breadcrumb-home">
                  <HomeIcon className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/kategorien" className="hover:text-white transition-colors" data-testid="link-breadcrumb-categories">
                  Kategorien
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white font-medium" data-testid="text-breadcrumb-current">
                  {currentCategory?.name || categorySlug}
                </span>
              </nav>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Entdecken Sie</p>
                  <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-category-title">
                    {currentCategory?.name || categorySlug}
                  </h1>
                </div>
              </div>
              
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
                {categoryHeroImages[categorySlug || ""].subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  {currentCategory?.count?.toLocaleString('de-DE') || 0} Angebote
                </div>
                {searchQuery && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Search className="w-4 h-4" />
                    Suche: "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gradient-to-br from-accent via-background to-secondary/30 py-12 md:py-16" data-testid="section-category-header">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
                <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                  <HomeIcon className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/kategorien" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-categories">
                  Kategorien
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium" data-testid="text-breadcrumb-current">
                  {currentCategory?.name || categorySlug}
                </span>
              </nav>

              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2" data-testid="text-category-title">
                {currentCategory?.name || categorySlug}
              </h1>
              <p className="text-muted-foreground" data-testid="text-category-count">
                {currentCategory?.count || 0} Produkte in dieser Kategorie
              </p>
              {searchQuery && (
                <div className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Search className="w-4 h-4" />
                  Suche: "{searchQuery}"
                </div>
              )}
            </div>
          </section>
        )}

        {/* Produkte */}
        <section className="py-12 md:py-16" data-testid="section-category-products">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Filter */}
            <Filters
              categories={categories}
              selectedCategory={currentCategory?.name}
              onCategoryChange={() => {}}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
              totalProducts={productsData?.total || 0}
              className="mb-8"
            />

            {/* Produkt-Grid */}
            <ProductGrid
              products={allProducts}
              isLoading={productsLoading && page === 1}
              hasMore={productsData?.hasMore}
              onLoadMore={handleLoadMore}
              isLoadingMore={isFetching && page > 1}
              onQuickView={setQuickViewProduct}
            />
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
