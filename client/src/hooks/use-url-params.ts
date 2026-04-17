import { useCallback, useMemo } from "react";
import { useLocation, useSearch } from "wouter";

export interface FilterParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export function useUrlParams() {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();

  const params = useMemo(() => {
    const urlParams = new URLSearchParams(searchString);
    return {
      query: urlParams.get("q") || undefined,
      category: urlParams.get("kategorie") || undefined,
      minPrice: urlParams.get("min") ? Number(urlParams.get("min")) : undefined,
      maxPrice: urlParams.get("max") ? Number(urlParams.get("max")) : undefined,
      sort: urlParams.get("sortierung") || undefined,
    };
  }, [searchString]);

  const updateParams = useCallback(
    (newParams: Partial<FilterParams>) => {
      const urlParams = new URLSearchParams(searchString);

      if (newParams.query !== undefined) {
        if (newParams.query) {
          urlParams.set("q", newParams.query);
        } else {
          urlParams.delete("q");
        }
      }

      if (newParams.category !== undefined) {
        if (newParams.category) {
          urlParams.set("kategorie", newParams.category);
        } else {
          urlParams.delete("kategorie");
        }
      }

      if (newParams.minPrice !== undefined) {
        if (newParams.minPrice > 0) {
          urlParams.set("min", String(newParams.minPrice));
        } else {
          urlParams.delete("min");
        }
      }

      if (newParams.maxPrice !== undefined) {
        if (newParams.maxPrice < 9999) {
          urlParams.set("max", String(newParams.maxPrice));
        } else {
          urlParams.delete("max");
        }
      }

      if (newParams.sort !== undefined) {
        if (newParams.sort && newParams.sort !== "relevance") {
          urlParams.set("sortierung", newParams.sort);
        } else {
          urlParams.delete("sortierung");
        }
      }

      const newSearch = urlParams.toString();
      const basePath = location.split("?")[0];
      const newUrl = newSearch ? `${basePath}?${newSearch}` : basePath;
      
      setLocation(newUrl, { replace: true });
    },
    [location, searchString, setLocation]
  );

  const clearParams = useCallback(() => {
    const basePath = location.split("?")[0];
    setLocation(basePath, { replace: true });
  }, [location, setLocation]);

  return { params, updateParams, clearParams };
}
