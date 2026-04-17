import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Home as HomeIcon } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { CategoryGrid, CategoryGridSkeleton } from "@/components/category-grid";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import type { Category } from "@shared/schema";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Kategorien laden
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Kategorien filtern
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { name: "Home", url: "https://lass-dich-verwoehnen.de" },
    { name: "Kategorien", url: "https://lass-dich-verwoehnen.de/kategorien" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Alle Kategorien | DeineZeitEureZeit"
        description="Entdecke alle Kategorien unseres Premium Lifestyle Shops. Schals, Kuscheldecken, Handschuhe und vieles mehr für dein Wohlbefinden."
        breadcrumbs={breadcrumbs}
      />

      <Header
        categories={categories}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-accent via-background to-secondary/30 py-12 md:py-16" data-testid="section-categories-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                <HomeIcon className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium" data-testid="text-breadcrumb-current">Kategorien</span>
            </nav>

            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2" data-testid="text-page-title">
              Alle Kategorien
            </h1>
            <p className="text-muted-foreground" data-testid="text-page-subtitle">
              Entdecke unsere vielfältige Produktwelt
            </p>
          </div>
        </section>

        {/* Kategorien Grid */}
        <section className="py-12 md:py-16" data-testid="section-categories-grid">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {isLoading ? (
              <CategoryGridSkeleton count={12} />
            ) : filteredCategories.length > 0 ? (
              <CategoryGrid categories={filteredCategories} variant="full" />
            ) : (
              <div className="text-center py-12" data-testid="container-empty-state">
                <p className="text-muted-foreground" data-testid="text-empty-message">
                  Keine Kategorien gefunden für "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
