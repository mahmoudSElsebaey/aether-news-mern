import { api, type ApiSuccess } from "./api";
import { mapCategory } from "./mappers";
import type { Category } from "@/types/article";

export async function fetchCategories(all = false): Promise<Category[]> {
  const { data } = await api.get<ApiSuccess<unknown[]>>("/categories", {
    params: all ? { all: "true" } : undefined,
  });
  return (data.data || []).map(mapCategory);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  const { data } = await api.get<ApiSuccess<unknown>>(`/categories/${encodeURIComponent(slug)}`);
  return mapCategory(data.data);
}

export async function createCategory(payload: Record<string, unknown>) {
  const { data } = await api.post<ApiSuccess<unknown>>("/categories", payload);
  return mapCategory(data.data);
}

export async function updateCategory(id: string, payload: Record<string, unknown>) {
  const { data } = await api.patch<ApiSuccess<unknown>>(`/categories/${id}`, payload);
  return mapCategory(data.data);
}

export async function deleteCategory(id: string) {
  await api.delete(`/categories/${id}`);
}
