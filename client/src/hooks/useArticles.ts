import { useCallback, useEffect, useState } from "react";
import * as articlesApi from "@/services/articles.api";
import type { ArticleListParams } from "@/types/api";
import type { Article } from "@/types/article";
import { mapArticle } from "@/utils/mappers";

export function useArticles(params: ArticleListParams = {}, enabled = true) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [meta, setMeta] = useState<{ page: number; total: number; totalPages: number } | null>(
    null
  );
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await articlesApi.fetchArticles(params);
      setArticles(result.items.map(mapArticle));
      setMeta(
        result.meta
          ? {
              page: result.meta.page,
              total: result.meta.total,
              totalPages: result.meta.totalPages,
            }
          : null
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load articles");
      setArticles([]);
    } finally {
      setLoading(false);
    }
    // stringify params for stable dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, JSON.stringify(params)]);

  useEffect(() => {
    load();
  }, [load]);

  return { articles, meta, loading, error, reload: load };
}

export function useArticle(slug: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await articlesApi.fetchArticleBySlug(slug);
      setArticle(mapArticle(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Article not found");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  return { article, loading, error, reload: load };
}
