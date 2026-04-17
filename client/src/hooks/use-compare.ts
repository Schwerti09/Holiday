import { useState, useEffect, useCallback } from "react";

const COMPARE_KEY = "lass-dich-verwoehnen-compare";
const MAX_COMPARE_ITEMS = 4;

export function useCompare() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareIds(parsed.slice(0, MAX_COMPARE_ITEMS));
        }
      } catch {
        localStorage.removeItem(COMPARE_KEY);
      }
    }
  }, []);

  const saveToStorage = useCallback((ids: string[]) => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  }, []);

  const addToCompare = useCallback((productId: string): boolean => {
    let added = false;
    setCompareIds((prev) => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      const updated = [...prev, productId];
      saveToStorage(updated);
      added = true;
      return updated;
    });
    return added;
  }, [saveToStorage]);

  const removeFromCompare = useCallback((productId: string) => {
    setCompareIds((prev) => {
      const updated = prev.filter((id) => id !== productId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const toggleCompare = useCallback((productId: string): boolean => {
    let added = false;
    setCompareIds((prev) => {
      const isInCompare = prev.includes(productId);
      if (isInCompare) {
        const updated = prev.filter((id) => id !== productId);
        saveToStorage(updated);
        return updated;
      } else if (prev.length < MAX_COMPARE_ITEMS) {
        const updated = [...prev, productId];
        saveToStorage(updated);
        added = true;
        return updated;
      }
      return prev;
    });
    return added;
  }, [saveToStorage]);

  const isInCompare = useCallback((productId: string) => {
    return compareIds.includes(productId);
  }, [compareIds]);

  const canAddMore = compareIds.length < MAX_COMPARE_ITEMS;

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    localStorage.removeItem(COMPARE_KEY);
  }, []);

  return {
    compareIds,
    compareCount: compareIds.length,
    maxItems: MAX_COMPARE_ITEMS,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    canAddMore,
    clearCompare,
  };
}
