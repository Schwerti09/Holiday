import { useState, useEffect, KeyboardEvent } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Heart, GitCompare, Sparkles, Heart as HeartIcon, Dog, Users, Gift, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useShop } from "@/contexts/shop-context";
import type { Category } from "@shared/schema";

const themeLinks = [
  { href: "/wellness", label: "Wellness", icon: Sparkles },
  { href: "/romantik", label: "Romantik", icon: HeartIcon },
  { href: "/kategorie/reisen", label: "Kurzreisen", icon: Gift },
  { href: "/verwoehnartikel", label: "Verwöhnprodukte", icon: Heart },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

interface HeaderProps {
  categories?: Category[];
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Header({ categories = [], onSearch, searchQuery = "" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [location, setLocation] = useLocation();
  const { wishlistCount, compareCount } = useShop();
  
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      setLocation(`/kategorie/reisen?q=${encodeURIComponent(query.trim())}`);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit(localSearchQuery);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topCategories = categories.slice(0, 6);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background"
      )}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                      DeineZeitEureZeit
                    </h2>
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reisethemen</p>
                    {themeLinks.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium hover-elevate",
                            location === item.href && "bg-accent"
                          )}
                        >
                          <item.icon className="h-4 w-4 text-primary" />
                          {item.label}
                        </div>
                      </Link>
                    ))}
                    <div className="my-4 border-t border-border" />
                    <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Kategorien</p>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <div
                        className={cn(
                          "flex items-center px-4 py-3 rounded-md text-sm font-medium hover-elevate",
                          location === "/" && "bg-accent"
                        )}
                      >
                        Alle Angebote
                      </div>
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/kategorie/${category.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-md text-sm hover-elevate",
                            location === `/kategorie/${category.slug}` && "bg-accent"
                          )}
                        >
                          <span>{category.name}</span>
                          <span className="text-muted-foreground text-xs">
                            {category.count}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-lg md:text-xl lg:text-2xl font-semibold text-foreground tracking-tight" data-testid="text-logo">
              <span className="hidden sm:inline">DeineZeitEureZeit</span>
              <span className="sm:hidden">DZEZ</span>
            </h1>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => handleSearchSubmit(localSearchQuery)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-0 bg-transparent border-0 cursor-pointer hover:text-primary transition-colors"
                data-testid="button-search-icon"
              >
                <Search className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </button>
              <Input
                type="search"
                placeholder="Kurzreisen suchen..."
                value={localSearchQuery}
                onChange={(e) => {
                  setLocalSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-4 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              data-testid="button-search-toggle"
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            <ThemeToggle />

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/vergleich">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    data-testid="button-compare"
                  >
                    <GitCompare className="h-5 w-5" />
                    {compareCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {compareCount}
                      </Badge>
                    )}
                    <span className="sr-only">Vergleich</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Produktvergleich</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/merkliste">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    data-testid="button-wishlist"
                  >
                    <Heart className={cn("h-5 w-5", wishlistCount > 0 && "fill-destructive text-destructive")} />
                    {wishlistCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {wishlistCount}
                      </Badge>
                    )}
                    <span className="sr-only">Merkliste</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Merkliste</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Produkte durchsuchen..."
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 pr-4 bg-secondary/50 border-0"
                autoFocus
                data-testid="input-search-mobile"
              />
            </div>
          </div>
        )}

        {/* Desktop Category Navigation */}
        <nav className="hidden md:block border-t border-border/50">
          <div className="flex items-center justify-center gap-1 px-4 py-2 overflow-x-auto hide-scrollbar">
            <Link href="/">
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                size="sm"
                className="text-sm font-medium whitespace-nowrap"
                data-testid="link-all-products"
              >
                Alle Angebote
              </Button>
            </Link>
            {themeLinks.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="text-sm font-medium whitespace-nowrap gap-1.5"
                  data-testid={`link-theme-${item.label.toLowerCase()}`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/kategorien">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                data-testid="link-all-categories"
              >
                Alle Kategorien
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
