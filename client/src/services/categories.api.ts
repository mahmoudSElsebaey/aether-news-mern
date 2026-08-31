import { api } from "./api";
import type { ApiCategory, ApiResponse } from "@/types/api";

export async function fetchCategories(all = false) {
  const { data } = await api.get<ApiResponse<ApiCategory[]>>("/categories", {
    params: all ? { all: "true" } : undefined,
  });
  return data.data;
}

export async function fetchCategoryBySlug(slug: string) {
  const { data } = await api.get<ApiResponse<ApiCategory>>(`/categories/${encodeURIComponent(slug)}`);
  return data.data;
}

export async function createCategory(payload: unknown) {
  const { data } = await api.post<ApiResponse<ApiCategory>>("/categories", payload);
  return data.data;
}

export async function updateCategory(id: string, payload: unknown) {
  const { data } = await api.patch<ApiResponse<ApiCategory>>(`/categories/${id}`, payload);
  return data.data;
}

export async function deleteCategory(id: string) {
  await api.delete(`/categories/${id}`);
}
