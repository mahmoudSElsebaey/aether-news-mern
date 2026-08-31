import type { Article, Author, Category, Locale } from "@/types/article";

/** Map backend Mongo documents to frontend Article shape */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCategory(raw: any): Category {
  return {
    id: String(raw._id || raw.id),
    slug: raw.slug,
    translations: {
      en: {
        name: raw.translations?.en?.name || "",
        description: raw.translations?.en?.description || "",
      },
      ar: {
        name: raw.translations?.ar?.name || "",
        description: raw.translations?.ar?.description || "",
      },
    },
    image: raw.image || "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapAuthor(raw: any): Author {
  if (!raw) {
    return { id: "unknown", name: "Unknown" };
  }
  return {
    id: String(raw._id || raw.id),
    name: raw.name || "Unknown",
    avatar: raw.avatar || "",
    bio: raw.bio || "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapArticle(raw: any): Article {
  const en = raw.translations?.en || {};
  const ar = raw.translations?.ar || {};

  return {
    id: String(raw._id || raw.id),
    translations: {
      en: {
        title: en.title || "",
        excerpt: en.excerpt || "",
        content: en.content || "",
        slug: en.slug || "",
        seoTitle: en.seoTitle || "",
        seoDescription: en.seoDescription || "",
      },
      ar: {
        title: ar.title || "",
        excerpt: ar.excerpt || "",
        content: ar.content || "",
        slug: ar.slug || "",
        seoTitle: ar.seoTitle || "",
        seoDescription: ar.seoDescription || "",
      },
    },
    category: mapCategory(
      typeof raw.category === "object" && raw.category
        ? raw.category
        : { _id: raw.category, slug: "news", translations: { en: { name: "News" }, ar: { name: "أخبار" } } }
    ),
    author: mapAuthor(raw.author),
    coverImage: raw.coverImage || "",
    status: raw.status || "draft",
    isFeatured: !!raw.isFeatured,
    isTrending: !!raw.isTrending,
    isBreaking: !!raw.isBreaking,
    views: raw.views || 0,
    publishedAt: raw.publishedAt
      ? new Date(raw.publishedAt).toISOString()
      : new Date(raw.createdAt || Date.now()).toISOString(),
    readingTime: raw.readingTime || 1,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
  };
}

export function pickLocale(lang: string): Locale {
  return lang?.startsWith("ar") ? "ar" : "en";
}
