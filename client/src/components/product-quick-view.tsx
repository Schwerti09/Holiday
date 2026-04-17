import { useState } from "react";
import { ExternalLink, Heart, Truck, Shield, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@shared/schema";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({
  product,
  open,
  onOpenChange,
}: ProductQuickViewProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const isInStock = product.availability === "in stock";
  const hasDiscount =
    product.strikePrice && product.strikePrice > product.priceBrutto;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.priceBrutto / product.strikePrice!) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden" data-testid="dialog-quickview">
        <div className="grid md:grid-cols-2">
          {/* Bildbereich */}
          <div className="relative aspect-square md:aspect-auto bg-secondary/30">
            {!isImageLoaded && (
              <div className="absolute inset-0 shimmer" />
            )}
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              data-testid="img-quickview-product"
            />
            {hasDiscount && (
              <Badge
                variant="destructive"
                className="absolute top-4 left-4 text-sm"
                data-testid="badge-quickview-discount"
              >
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Inhalt */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left mb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1" data-testid="text-quickview-category">
                {product.category}
              </p>
              <DialogTitle className="text-xl font-semibold text-foreground leading-tight" data-testid="text-quickview-title">
                {product.title.split("»")[0].trim()}
              </DialogTitle>
            </DialogHeader>

            {/* Preis */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-foreground" data-testid="text-quickview-price">
                {formatPrice(product.priceBrutto)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through" data-testid="text-quickview-original-price">
                  {formatPrice(product.strikePrice!)}
                </span>
              )}
            </div>

            {/* Verfügbarkeit */}
            <div className="flex items-center gap-2 mb-4" data-testid="container-quickview-availability">
              {isInStock ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium" data-testid="text-quickview-instock">
                    Auf Lager
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground" data-testid="text-quickview-outofstock">
                  Derzeit nicht verfügbar
                </span>
              )}
            </div>

            <Separator className="my-4" />

            {/* Beschreibung */}
            <div className="flex-1 overflow-y-auto mb-6">
              <p className="text-sm text-muted-foreground line-clamp-6" data-testid="text-quickview-description">
                {product.description}
              </p>
            </div>

            {/* Vorteile */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="text-quickview-shipping">
                <Truck className="h-4 w-4 text-primary" />
                <span>
                  {product.shippingCost && product.shippingCost > 0
                    ? `Versand: ${formatPrice(product.shippingCost)}`
                    : "Kostenloser Versand"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="text-quickview-secure">
                <Shield className="h-4 w-4 text-primary" />
                <span>Sichere Bezahlung</span>
              </div>
            </div>

            {/* Aktionen */}
            <div className="flex gap-3">
              <a
                href={product.deeplink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                data-testid="link-quickview-offer"
              >
                <Button className="w-full gap-2" size="lg" data-testid="button-quickview-buy">
                  Zum Angebot
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                data-testid="button-quickview-favorite"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isFavorite && "fill-destructive text-destructive"
                  )}
                />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
