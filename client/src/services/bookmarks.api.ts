import { api, type ApiSuccess } from "./api";
import { mapArticle } from "./mappers";
import type { Article } from "@/types/article";

export async function fetchBookmarks(): Promise<Article[]> {
  const { data } = await api.get<ApiSuccess<Array<{ article: unknown }>>>("/bookmarks");
  return (data.data || [])
    .map((b) => b.article)
    .filter(Boolean)
    .map(mapArticle);
}

export async function addBookmark(articleId: string) {
  await api.post("/bookmarks", { articleId });
}

export async function removeBookmark(articleId: string) {
  await api.delete(`/bookmarks/${articleId}`);
}
