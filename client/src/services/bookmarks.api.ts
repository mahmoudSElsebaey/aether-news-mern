import { api } from "./api";
import type { ApiResponse } from "@/types/api";

export async function fetchBookmarks() {
  const { data } = await api.get<ApiResponse<unknown[]>>("/bookmarks");
  return data.data;
}

export async function addBookmark(articleId: string) {
  const { data } = await api.post("/bookmarks", { articleId });
  return data;
}

export async function removeBookmark(articleId: string) {
  await api.delete(`/bookmarks/${articleId}`);
}
