import { useState } from "react";
import { ExternalLink, Heart, Eye, GitCompare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useShop } from "@/contexts/shop-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare, canAddMoreToCompare } = useShop();
  const { toast } = useToast();

  const isFavorite = isInWishlist(product.id);
  const isComparing = isInCompare(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  // Produkt ist verfügbar wenn deliveryTime nicht "nicht lieferbar" enthält
  const isInStock = !product.deliveryTime?.toLowerCase().includes("nicht lieferbar");
  const hasDiscount = product.strikePrice && product.strikePrice > product.priceBrutto;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceBrutto / product.strikePrice!) * 100)
    : 0;

  return (
    <Card
      className={cn(
        "group relative overflow-visible border-card-border bg-card transition-all duration-300 hover-elevate",
        "animate-fade-in",
        index <= 7 && `stagger-${index + 1}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      {/* Bildbereich */}
      <div className="relative aspect-product overflow-hidden rounded-t-md bg-secondary/30">
        {/* Lade-Shimmer */}
        {!isImageLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}

        {/* Produktbild */}
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0",
            isHovered && "scale-105"
          )}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <Badge variant="destructive" className="text-xs font-medium">
              -{discountPercent}%
            </Badge>
          )}
          {!isInStock && (
            <Badge variant="secondary" className="text-xs">
              Ausverkauft
            </Badge>
          )}
        </div>

        {/* Aktionsbuttons */}
        <div
          className={cn(
            "absolute top-2 right-2 flex flex-col gap-1 transition-all duration-200",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          )}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-background/90 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product.id);
                  toast({
                    title: isFavorite ? "Von Merkliste entfernt" : "Zur Merkliste hinzugefügt",
                    duration: 2000,
                  });
                }}
                data-testid={`button-favorite-${product.id}`}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isFavorite && "fill-destructive text-destructive"
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isFavorite ? "Von Merkliste entfernen" : "Zur Merkliste"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  "h-8 w-8 bg-background/90 backdrop-blur-sm",
                  isComparing && "ring-2 ring-primary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isComparing && !canAddMoreToCompare) {
                    toast({
                      title: "Vergleichsliste voll",
                      description: "Maximal 4 Produkte können verglichen werden",
                      variant: "destructive",
                      duration: 2000,
                    });
                    return;
                  }
                  toggleCompare(product.id);
                  toast({
                    title: isComparing ? "Vom Vergleich entfernt" : "Zum Vergleich hinzugefügt",
                    duration: 2000,
                  });
                }}
                data-testid={`button-compare-${product.id}`}
              >
                <GitCompare
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isComparing && "text-primary"
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isComparing ? "Vom Vergleich entfernen" : "Zum Vergleich"}
            </TooltipContent>
          </Tooltip>
          {onQuickView && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-background/90 backdrop-blur-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(product);
                  }}
                  data-testid={`button-quickview-${product.id}`}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Schnellansicht</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Schnellansicht Overlay */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent transition-all duration-200",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
        >
          <a
            href={product.deeplink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="sm"
              className="w-full gap-2 bg-white text-black hover:bg-white/90"
              data-testid={`button-view-${product.id}`}
            >
              Zum Angebot
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </div>

      {/* Inhalt */}
      <CardContent className="p-4">
        {/* Kategorie */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Titel */}
        <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem] text-foreground">
          {product.title.split("»")[0].trim()}
        </h3>

        {/* Preis */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-foreground" data-testid={`text-price-${product.id}`}>
            {formatPrice(product.priceBrutto)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.strikePrice!)}
            </span>
          )}
        </div>

        {/* Versand */}
        {product.shippingCost !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            {product.shippingCost > 0
              ? `+ ${formatPrice(product.shippingCost)} Versand`
              : "Kostenloser Versand"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border-card-border">
      <div className="aspect-product shimmer" />
      <CardContent className="p-4 space-y-3">
        <div className="h-3 w-16 shimmer rounded" />
        <div className="space-y-2">
          <div className="h-4 shimmer rounded" />
          <div className="h-4 w-3/4 shimmer rounded" />
        </div>
        <div className="h-5 w-20 shimmer rounded" />
      </CardContent>
    </Card>
  );
}
