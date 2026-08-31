import { api, type ApiSuccess } from "./api";
import { mapArticle } from "./mappers";
import type { Article } from "@/types/article";

export interface ArticleListParams {
  language?: string;
  category?: string;
  status?: string;
  featured?: string;
  trending?: string;
  breaking?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchArticles(params: ArticleListParams = {}) {
  const { data } = await api.get<ApiSuccess<unknown[]>>("/articles", { params });
  const items = (data.data || []).map(mapArticle);
  return { items, meta: data.meta };
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const { data } = await api.get<ApiSuccess<unknown>>(`/articles/${encodeURIComponent(slug)}`);
  return mapArticle(data.data);
}

export async function fetchArticleById(id: string): Promise<Article> {
  const { data } = await api.get<ApiSuccess<unknown>>(`/articles/id/${id}`);
  return mapArticle(data.data);
}

export async function createArticle(payload: Record<string, unknown>) {
  const { data } = await api.post<ApiSuccess<unknown>>("/articles", payload);
  return mapArticle(data.data);
}

export async function updateArticle(id: string, payload: Record<string, unknown>) {
  const { data } = await api.patch<ApiSuccess<unknown>>(`/articles/${id}`, payload);
  return mapArticle(data.data);
}

export async function deleteArticle(id: string) {
  await api.delete(`/articles/${id}`);
}
