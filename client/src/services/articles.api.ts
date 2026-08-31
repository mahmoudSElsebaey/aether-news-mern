import { api } from "./api";
import type { ApiArticle, ApiResponse, ArticleListParams } from "@/types/api";

export async function fetchArticles(params: ArticleListParams = {}) {
  const query: Record<string, string | number> = {};
  if (params.language) query.language = params.language;
  if (params.category) query.category = params.category;
  if (params.status) query.status = params.status;
  if (params.featured) query.featured = "true";
  if (params.trending) query.trending = "true";
  if (params.breaking) query.breaking = "true";
  if (params.search) query.search = params.search;
  if (params.sort) query.sort = params.sort;
  if (params.page) query.page = params.page;
  if (params.limit) query.limit = params.limit;

  const { data } = await api.get<ApiResponse<ApiArticle[]>>("/articles", { params: query });
  return { items: data.data, meta: data.meta };
}

export async function fetchArticleBySlug(slug: string) {
  const { data } = await api.get<ApiResponse<ApiArticle>>(`/articles/${encodeURIComponent(slug)}`);
  return data.data;
}

export async function fetchArticleById(id: string) {
  const { data } = await api.get<ApiResponse<ApiArticle>>(`/articles/id/${id}`);
  return data.data;
}

export async function createArticle(payload: unknown) {
  const { data } = await api.post<ApiResponse<ApiArticle>>("/articles", payload);
  return data.data;
}

export async function updateArticle(id: string, payload: unknown) {
  const { data } = await api.patch<ApiResponse<ApiArticle>>(`/articles/${id}`, payload);
  return data.data;
}

export async function deleteArticle(id: string) {
  await api.delete(`/articles/${id}`);
}
