import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "lass-dich-verwoehnen-wishlist";

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      } catch {
        localStorage.removeItem(WISHLIST_KEY);
      }
    }
  }, []);

  const saveToStorage = useCallback((ids: string[]) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  }, []);

  const addToWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) return prev;
      const updated = [...prev, productId];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const updated = prev.filter((id) => id !== productId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const isInWishlist = prev.includes(productId);
      const updated = isInWishlist
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    localStorage.removeItem(WISHLIST_KEY);
  }, []);

  return {
    wishlistIds,
    wishlistCount: wishlistIds.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
}
