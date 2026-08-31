import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as articlesApi from "@/services/articles.api";
import * as categoriesApi from "@/services/categories.api";
import { uploadImage, resolveMediaUrl } from "@/services/upload.api";
import type { ArticleStatus } from "@/types/article";
import type { ApiCategory } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Spinner";
import { cn } from "@/utils/cn";

type LangTab = "en" | "ar";

interface TranslationForm {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
}

const emptyTranslation = (): TranslationForm => ({
  title: "",
  excerpt: "",
  content: "",
  slug: "",
  seoTitle: "",
  seoDescription: "",
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<LangTab>("en");
  const [en, setEn] = useState<TranslationForm>(emptyTranslation);
  const [ar, setAr] = useState<TranslationForm>(emptyTranslation);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverMode, setCoverMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<ArticleStatus>("draft");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    categoriesApi.fetchCategories(true).then((cats) => {
      setCategories(cats);
      if (!categoryId && cats[0]) setCategoryId(cats[0]._id);
    });
  }, [categoryId]);

  useEffect(() => {
    if (isNew) return;
    let cancelled = false;
    (async () => {
      try {
        const article = await articlesApi.fetchArticleById(id!);
        if (cancelled) return;
        setEn({
          title: article.translations.en.title,
          excerpt: article.translations.en.excerpt || "",
          content: article.translations.en.content || "",
          slug: article.translations.en.slug,
          seoTitle: article.translations.en.seoTitle || "",
          seoDescription: article.translations.en.seoDescription || "",
        });
        setAr({
          title: article.translations.ar.title,
          excerpt: article.translations.ar.excerpt || "",
          content: article.translations.ar.content || "",
          slug: article.translations.ar.slug,
          seoTitle: article.translations.ar.seoTitle || "",
          seoDescription: article.translations.ar.seoDescription || "",
        });
        const catId =
          typeof article.category === "string" ? article.category : article.category._id;
        setCategoryId(catId);
        setCoverImage(article.coverImage || "");
        setStatus(article.status);
        setIsFeatured(article.isFeatured);
        setIsTrending(article.isTrending);
        setIsBreaking(article.isBreaking);
        setTags((article.tags || []).join(", "));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load article");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isNew]);

  const current = tab === "en" ? en : ar;
  const setCurrent = tab === "en" ? setEn : setAr;

  const updateField = (field: keyof TranslationForm, value: string) => {
    setCurrent((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) next.slug = slugify(value);
      return next;
    });
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setCoverImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const buildPayload = (finalStatus: ArticleStatus) => ({
    translations: {
      en: { ...en, slug: en.slug || slugify(en.title) || undefined },
      ar: { ...ar, slug: ar.slug || slugify(ar.title) || undefined },
    },
    category: categoryId,
    coverImage: coverImage || "",
    status: finalStatus,
    isFeatured,
    isTrending,
    isBreaking,
    tags: tags
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean),
  });

  const handleSave = async (nextStatus?: ArticleStatus) => {
    setSaving(true);
    setMessage("");
    setError("");
    const finalStatus = nextStatus || status;
    try {
      const payload = buildPayload(finalStatus);
      if (isNew) {
        const created = await articlesApi.createArticle(payload);
        setMessage(t("saved"));
        navigate(`/admin/articles/${created._id}/edit`, { replace: true });
      } else {
        await articlesApi.updateArticle(id!, payload);
        setStatus(finalStatus);
        setMessage(t("saved"));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;

  const previewSrc = resolveMediaUrl(coverImage);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin/articles" className="text-sm text-accent hover:underline">
            ← {t("articleList")}
          </Link>
          <h1 className="text-2xl font-bold text-primary mt-1">
            {isNew ? t("createArticle") : t("editArticle")}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")} isLoading={saving}>
            {t("saveDraft")}
          </Button>
          <Button variant="accent" onClick={() => handleSave("published")} isLoading={saving}>
            {t("publish")}
          </Button>
        </div>
      </div>

      {message && <p className="text-sm text-success bg-success/10 rounded-md px-3 py-2">{message}</p>}
      {error && <p className="text-sm text-error bg-error/10 rounded-md px-3 py-2">{error}</p>}

      <div className="flex rounded-md border border-border overflow-hidden w-fit">
        {(["en", "ar"] as LangTab[]).map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => setTab(lng)}
            className={cn(
              "px-4 h-10 text-sm font-medium transition-colors",
              tab === lng ? "bg-primary text-white" : "bg-card text-muted hover:bg-surface"
            )}
          >
            {lng === "en" ? t("english") : t("arabic")}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 rounded-xl border border-border bg-card p-5">
          <Field label={t("titleField")} required>
            <input
              value={current.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="field-input"
              dir={tab === "ar" ? "rtl" : "ltr"}
            />
          </Field>
          <Field label={t("slugField")}>
            <input
              value={current.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="field-input font-mono text-sm"
              dir="ltr"
            />
          </Field>
          <Field label={t("excerptField")}>
            <textarea
              value={current.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              rows={3}
              className="field-input resize-y"
              dir={tab === "ar" ? "rtl" : "ltr"}
            />
          </Field>
          <Field label={t("contentField")}>
            <textarea
              value={current.content}
              onChange={(e) => updateField("content", e.target.value)}
              rows={12}
              className="field-input resize-y font-mono text-sm"
              dir={tab === "ar" ? "rtl" : "ltr"}
              placeholder="HTML content supported"
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={t("seoTitle")}>
              <input
                value={current.seoTitle}
                onChange={(e) => updateField("seoTitle", e.target.value)}
                className="field-input"
                dir={tab === "ar" ? "rtl" : "ltr"}
              />
            </Field>
            <Field label={t("seoDescription")}>
              <input
                value={current.seoDescription}
                onChange={(e) => updateField("seoDescription", e.target.value)}
                className="field-input"
                dir={tab === "ar" ? "rtl" : "ltr"}
              />
            </Field>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <Field label={t("status")}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                className="field-input"
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="scheduled">scheduled</option>
              </select>
            </Field>
            <Field label={t("category")}>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="field-input"
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.translations.en.name} / {c.translations.ar.name}
                  </option>
                ))}
              </select>
            </Field>

            <div>
              <p className="mb-1.5 text-sm font-medium text-primary">{t("coverImage")}</p>
              <div className="flex rounded-md border border-border overflow-hidden mb-2">
                <button
                  type="button"
                  onClick={() => setCoverMode("url")}
                  className={cn(
                    "flex-1 h-9 text-xs font-medium",
                    coverMode === "url" ? "bg-primary text-white" : "bg-surface text-muted"
                  )}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setCoverMode("upload")}
                  className={cn(
                    "flex-1 h-9 text-xs font-medium",
                    coverMode === "upload" ? "bg-primary text-white" : "bg-surface text-muted"
                  )}
                >
                  Upload
                </button>
              </div>

              {coverMode === "url" ? (
                <input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="field-input"
                  dir="ltr"
                  placeholder="https://... or /uploads/..."
                />
              ) : (
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    isLoading={uploading}
                    onClick={() => fileRef.current?.click()}
                  >
                    {uploading ? "Uploading…" : "Choose image"}
                  </Button>
                </div>
              )}
            </div>

            {previewSrc && (
              <img
                src={previewSrc}
                alt=""
                className="rounded-md aspect-video object-cover w-full border border-border"
              />
            )}

            <Field label={t("tags")}>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="field-input"
                dir="ltr"
              />
            </Field>
            <div className="space-y-2 pt-2">
              <Toggle label={t("featured")} checked={isFeatured} onChange={setIsFeatured} />
              <Toggle label={t("trending")} checked={isTrending} onChange={setIsTrending} />
              <Toggle label={t("breaking")} checked={isBreaking} onChange={setIsBreaking} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          height: 2.5rem;
          border-radius: 0.375rem;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          padding: 0 0.75rem;
          font-size: 0.875rem;
        }
        .field-input:focus { outline: none; box-shadow: 0 0 0 2px var(--color-accent); }
        textarea.field-input { height: auto; padding-top: 0.5rem; padding-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-primary">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="text-sm text-primary">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-accent" : "bg-border"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 start-0.5 size-5 rounded-full bg-white transition-transform",
            checked && "translate-x-5 rtl:-translate-x-5"
          )}
        />
      </button>
    </label>
  );
}
