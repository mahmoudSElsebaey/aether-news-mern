import { useCallback, useEffect, useState } from "react";
import * as categoriesApi from "@/services/categories.api";
import type { Category } from "@/types/article";
import { mapCategory } from "@/utils/mappers";

export function useCategories(all = false) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesApi.fetchCategories(all);
      setCategories(data.map(mapCategory));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [all]);

  useEffect(() => {
    load();
  }, [load]);

  return { categories, loading, error, reload: load };
}
