import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Product } from "@shared/schema";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  onQuickView?: (product: Product) => void;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  isLoading,
  hasMore,
  onLoadMore,
  isLoadingMore,
  onQuickView,
  emptyMessage = "Keine Produkte gefunden",
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="container-empty-state">
        <div className="w-24 h-24 mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          {emptyMessage}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Versuche es mit anderen Suchbegriffen oder schau dir unsere Kategorien an.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="container-product-grid">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Mehr laden Button */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="min-w-[200px]"
            data-testid="button-load-more"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Lädt...
              </>
            ) : (
              "Mehr anzeigen"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
