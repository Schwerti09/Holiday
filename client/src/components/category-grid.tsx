import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Shirt, Heart, Users, Sparkles, Plane, Hotel, Home, Baby, Gift, ShoppingBag, Watch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@shared/schema";

interface CategoryGridProps {
  categories: Category[];
  variant?: "compact" | "full";
  showImages?: boolean;
}

const categoryImages: Record<string, string> = {
  "reisen": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
  "schals": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=300&fit=crop",
  "handschuhe": "https://images.unsplash.com/photo-1545170241-e1e7e5d8f0c5?w=400&h=300&fit=crop",
  "kuscheldecken": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  "bademantel": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop",
  "socken-und-struempfe": "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=300&fit=crop",
  "kinderschuhe": "https://images.unsplash.com/photo-1519864600395-a099c8f7e1dc?w=400&h=300&fit=crop",
  "schuhe": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  "muetzen": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=300&fit=crop",
  "unterwaesche": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop",
  "taschen": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
  "deko-kissen": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop",
  "baby-erstausstattung": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop",
  "wellness-beauty": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
};

const categoryIcons: Record<string, typeof Shirt> = {
  "reisen": Plane,
  "schals": Shirt,
  "handschuhe": Watch,
  "muetzen": Sparkles,
  "kuscheldecken": Home,
  "bademantel": Sparkles,
  "socken-und-struempfe": Shirt,
  "kinderschuhe": Baby,
  "schuhe": ShoppingBag,
  "kinder-handschuhe": Baby,
  "kindersocken": Baby,
  "baby-erstausstattung": Baby,
  "unterwaesche": Shirt,
  "hosen": Shirt,
  "taschen": ShoppingBag,
  "guertel": Watch,
  "deko-kissen": Home,
  "baderosen": Sparkles,
  "waermekissen": Home,
  "grill-kueche": Home,
  "kinderbademantel": Baby,
  "wellness-beauty": Heart,
};

const categoryMinPrices: Record<string, number> = {
  "reisen": 29,
  "schals": 12,
  "handschuhe": 8,
  "kuscheldecken": 19,
  "bademantel": 29,
  "socken-und-struempfe": 6,
  "kinderschuhe": 15,
  "schuhe": 25,
  "muetzen": 9,
  "unterwaesche": 5,
  "taschen": 19,
  "deko-kissen": 14,
  "baby-erstausstattung": 12,
  "wellness-beauty": 8,
};

export function CategoryGrid({ categories, variant = "full", showImages = true }: CategoryGridProps) {
  const displayCategories = variant === "compact" ? categories.slice(0, 6) : categories;

  if (showImages && variant === "compact") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((category, index) => {
          const imageUrl = categoryImages[category.slug] || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop`;
          const minPrice = categoryMinPrices[category.slug] || 10;
          
          return (
            <Link key={category.slug} href={`/kategorie/${category.slug}`}>
              <Card 
                className={cn(
                  "group cursor-pointer overflow-hidden border-card-border bg-card hover-elevate transition-all duration-300",
                  "animate-fade-in",
                  index <= 5 && `stagger-${index + 1}`
                )}
                data-testid={`card-category-${category.slug}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 right-0 bg-white/95 backdrop-blur-sm rounded-tl-lg px-3 py-2 text-right">
                    <p className="text-xs text-muted-foreground font-medium">
                      {category.count.toLocaleString('de-DE')} Angebote
                    </p>
                    <p className="text-sm font-bold text-primary">
                      ab {minPrice.toFixed(2).replace('.', ',')} € <span className="text-xs font-normal text-muted-foreground">p.P.</span>
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn(
      "grid gap-4",
      variant === "compact" 
        ? "grid-cols-2 sm:grid-cols-4" 
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    )}>
      {displayCategories.map((category, index) => {
        const IconComponent = categoryIcons[category.slug] || Gift;
        
        return (
          <Link key={category.slug} href={`/kategorie/${category.slug}`}>
            <Card 
              className={cn(
                "group cursor-pointer border-card-border bg-card hover-elevate transition-all duration-300",
                "animate-fade-in",
                index <= 7 && `stagger-${index + 1}`
              )}
              data-testid={`card-category-${category.slug}`}
            >
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-sm md:text-base text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {category.count.toLocaleString('de-DE')} Produkte
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border-card-border overflow-hidden">
          <div className="aspect-[4/3] shimmer" />
          <CardContent className="p-4">
            <div className="h-5 w-3/4 shimmer rounded mb-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
