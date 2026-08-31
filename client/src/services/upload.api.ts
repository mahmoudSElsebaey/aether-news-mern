import { api } from "./api";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  /\/api\/?$/,
  ""
);

/** Turn relative /uploads/... into absolute URL for <img> and storage */
export function resolveMediaUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function uploadImage(file: File) {
  const form = new FormData();
  form.append("image", file);
  const { data } = await api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const relative = data.data.url as string;
  return resolveMediaUrl(relative);
}
