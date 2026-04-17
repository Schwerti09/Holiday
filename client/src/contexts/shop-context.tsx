import { createContext, useContext, type ReactNode } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCompare } from "@/hooks/use-compare";

interface ShopContextType {
  wishlistIds: string[];
  wishlistCount: number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  
  compareIds: string[];
  compareCount: number;
  maxCompareItems: number;
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
  canAddMoreToCompare: boolean;
  clearCompare: () => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const wishlist = useWishlist();
  const compare = useCompare();

  const value: ShopContextType = {
    wishlistIds: wishlist.wishlistIds,
    wishlistCount: wishlist.wishlistCount,
    addToWishlist: wishlist.addToWishlist,
    removeFromWishlist: wishlist.removeFromWishlist,
    toggleWishlist: wishlist.toggleWishlist,
    isInWishlist: wishlist.isInWishlist,
    clearWishlist: wishlist.clearWishlist,
    
    compareIds: compare.compareIds,
    compareCount: compare.compareCount,
    maxCompareItems: compare.maxItems,
    addToCompare: compare.addToCompare,
    removeFromCompare: compare.removeFromCompare,
    toggleCompare: compare.toggleCompare,
    isInCompare: compare.isInCompare,
    canAddMoreToCompare: compare.canAddMore,
    clearCompare: compare.clearCompare,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
