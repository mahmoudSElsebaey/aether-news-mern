import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "@/services/api";
import { uploadImage, resolveMediaUrl } from "@/services/upload.api";
import { Button } from "@/components/ui/Button";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";

interface MediaItem {
  id: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  createdAt?: string;
  provider?: string;
}

export function MediaPage() {
  const { t } = useTranslation("dashboard");
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/upload");
      setItems(data.data || []);
      setProvider(data.meta?.provider || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onUpload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await uploadImage(file);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (url: string) => {
    const full = resolveMediaUrl(url);
    await navigator.clipboard.writeText(full);
    setCopied(full);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("media")}</h1>
          <p className="text-sm text-muted mt-1">
            {provider === "cloudinary"
              ? "Cloudinary library · folder delta-news"
              : provider === "local"
                ? "Local uploads folder"
                : t("mediaHint")}
          </p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
          <Button
            variant="accent"
            isLoading={uploading}
            onClick={() => fileRef.current?.click()}
          >
            Upload image
          </Button>
        </div>
      </div>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <p className="text-muted">No media yet. Upload your first image.</p>
          <p className="text-xs text-muted mt-2">
            Add CLOUDINARY_* keys in server/.env to use Cloudinary CDN.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const src = resolveMediaUrl(item.url);
            return (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-video bg-surface overflow-hidden">
                  <img src={src} alt="" className="size-full object-cover" loading="lazy" />
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <p className="text-xs text-muted truncate font-mono">{item.id}</p>
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="shrink-0 text-xs font-medium text-accent hover:underline"
                  >
                    {copied === src ? "Copied" : "Copy URL"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
