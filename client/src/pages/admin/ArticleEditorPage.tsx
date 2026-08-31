import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories } from "@/data/categories";
import { authors } from "@/data/authors";
import type { Article, ArticleStatus } from "@/types/article";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { getAdminArticles, setAdminArticles } from "./ArticlesPage";

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

  const [tab, setTab] = useState<LangTab>("en");
  const [en, setEn] = useState<TranslationForm>(emptyTranslation);
  const [ar, setAr] = useState<TranslationForm>(emptyTranslation);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<ArticleStatus>("draft");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    const article = getAdminArticles().find((a) => a.id === id);
    if (!article) return;
    setEn({ ...article.translations.en, seoTitle: article.translations.en.seoTitle || "", seoDescription: article.translations.en.seoDescription || "" });
    setAr({ ...article.translations.ar, seoTitle: article.translations.ar.seoTitle || "", seoDescription: article.translations.ar.seoDescription || "" });
    setCategoryId(article.category.id);
    setCoverImage(article.coverImage);
    setStatus(article.status);
    setIsFeatured(article.isFeatured);
    setIsTrending(article.isTrending);
    setIsBreaking(article.isBreaking);
    setTags(article.tags.join(", "));
  }, [id, isNew]);

  const current = tab === "en" ? en : ar;
  const setCurrent = tab === "en" ? setEn : setAr;

  const updateField = (field: keyof TranslationForm, value: string) => {
    setCurrent((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSave = async (nextStatus?: ArticleStatus) => {
    setSaving(true);
    setMessage("");
    await new Promise((r) => setTimeout(r, 300));

    const cat = categories.find((c) => c.id === categoryId) || categories[0];
    const finalStatus = nextStatus || status;
    const list = getAdminArticles();

    if (isNew) {
      const article: Article = {
        id: `art-${Date.now()}`,
        translations: {
          en: { ...en, slug: en.slug || slugify(en.title) || `article-${Date.now()}` },
          ar: { ...ar, slug: ar.slug || slugify(ar.title) || `maqal-${Date.now()}` },
        },
        category: cat,
        author: authors[0],
        coverImage:
          coverImage ||
          "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=675&fit=crop",
        status: finalStatus,
        isFeatured,
        isTrending,
        isBreaking,
        views: 0,
        publishedAt: finalStatus === "published" ? new Date().toISOString() : new Date().toISOString(),
        readingTime: 3,
        tags: tags
          .split(",")
          .map((x) => x.trim().toLowerCase())
          .filter(Boolean),
      };
      setAdminArticles([article, ...list]);
      setMessage(t("saved"));
      navigate(`/admin/articles/${article.id}/edit`, { replace: true });
    } else {
      const next = list.map((a) =>
        a.id === id
          ? {
              ...a,
              translations: {
                en: { ...en },
                ar: { ...ar },
              },
              category: cat,
              coverImage,
              status: finalStatus,
              isFeatured,
              isTrending,
              isBreaking,
              tags: tags
                .split(",")
                .map((x) => x.trim().toLowerCase())
                .filter(Boolean),
              publishedAt:
                finalStatus === "published" && a.status !== "published"
                  ? new Date().toISOString()
                  : a.publishedAt,
            }
          : a
      );
      setAdminArticles(next);
      setStatus(finalStatus);
      setMessage(t("saved"));
    }
    setSaving(false);
  };

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

      {message && (
        <p className="text-sm text-success bg-success/10 rounded-md px-3 py-2">{message}</p>
      )}

      {/* Language tabs */}
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
                  <option key={c.id} value={c.id}>
                    {c.translations.en.name} / {c.translations.ar.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("coverImage")}>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="field-input"
                dir="ltr"
                placeholder="https://..."
              />
            </Field>
            {coverImage && (
              <img src={coverImage} alt="" className="rounded-md aspect-video object-cover w-full" />
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
        .field-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--color-accent);
        }
        textarea.field-input {
          height: auto;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
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
