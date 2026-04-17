import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { Category } from "@shared/schema";

interface FiltersProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  totalProducts: number;
  className?: string;
}

export function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  maxPrice,
  onPriceChange,
  totalProducts,
  className,
}: FiltersProps) {
  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice;

  const clearFilters = () => {
    onCategoryChange(undefined);
    onPriceChange([0, maxPrice]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn("space-y-4", className)} data-testid="container-filters">
      {/* Ergebnisse und Sortierung */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" data-testid="text-product-count">
          <span className="font-medium text-foreground">{totalProducts}</span> Produkte
          {selectedCategory && (
            <span> in <span className="font-medium text-foreground">{selectedCategory}</span></span>
          )}
        </p>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]" data-testid="select-sort">
            <SelectValue placeholder="Sortieren nach" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevanz</SelectItem>
            <SelectItem value="price-asc">Preis aufsteigend</SelectItem>
            <SelectItem value="price-desc">Preis absteigend</SelectItem>
            <SelectItem value="newest">Neuheiten</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter-Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Kategorie-Filter */}
        <Select 
          value={selectedCategory || "all"} 
          onValueChange={(v) => onCategoryChange(v === "all" ? undefined : v)}
        >
          <SelectTrigger className="w-auto min-w-[140px]" data-testid="select-category">
            <SelectValue placeholder="Kategorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kategorien</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.name}>
                {cat.name} ({cat.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Preis-Filter */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-md bg-secondary/50">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Preis:</span>
          <div className="w-32">
            <Slider
              value={priceRange}
              min={0}
              max={maxPrice}
              step={5}
              onValueChange={(v) => onPriceChange(v as [number, number])}
              className="w-full"
              data-testid="slider-price"
            />
          </div>
          <span className="text-sm whitespace-nowrap">
            {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </span>
        </div>

        {/* Aktive Filter löschen */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1 text-muted-foreground"
            data-testid="button-clear-filters"
          >
            <X className="h-3 w-3" />
            Filter löschen
          </Button>
        )}
      </div>

      {/* Aktive Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {selectedCategory}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onCategoryChange(undefined)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onPriceChange([0, maxPrice])}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
