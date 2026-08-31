import type { Article, Author, Category } from "@/types/article";
import type { ApiArticle, ApiAuthor, ApiCategory } from "@/types/api";

export function mapCategory(c: ApiCategory): Category {
  return {
    id: c._id,
    slug: c.slug,
    translations: {
      en: {
        name: c.translations.en.name,
        description: c.translations.en.description,
      },
      ar: {
        name: c.translations.ar.name,
        description: c.translations.ar.description,
      },
    },
    image: c.image,
  };
}

export function mapAuthor(a: ApiAuthor | string): Author {
  if (typeof a === "string") {
    return { id: a, name: "Unknown" };
  }
  return {
    id: a._id,
    name: a.name,
    avatar: a.avatar,
    bio: a.bio,
  };
}

export function mapArticle(a: ApiArticle): Article {
  const category =
    typeof a.category === "string"
      ? {
          id: a.category,
          slug: "news",
          translations: {
            en: { name: "News" },
            ar: { name: "أخبار" },
          },
        }
      : mapCategory(a.category);

  return {
    id: a._id,
    translations: {
      en: {
        title: a.translations.en.title,
        excerpt: a.translations.en.excerpt || "",
        content: a.translations.en.content || "",
        slug: a.translations.en.slug,
        seoTitle: a.translations.en.seoTitle,
        seoDescription: a.translations.en.seoDescription,
      },
      ar: {
        title: a.translations.ar.title,
        excerpt: a.translations.ar.excerpt || "",
        content: a.translations.ar.content || "",
        slug: a.translations.ar.slug,
        seoTitle: a.translations.ar.seoTitle,
        seoDescription: a.translations.ar.seoDescription,
      },
    },
    category,
    author: mapAuthor(a.author),
    coverImage: a.coverImage || "",
    status: a.status,
    isFeatured: a.isFeatured,
    isTrending: a.isTrending,
    isBreaking: a.isBreaking,
    views: a.views || 0,
    publishedAt: a.publishedAt || a.createdAt || new Date().toISOString(),
    readingTime: a.readingTime || 1,
    tags: a.tags || [],
  };
}
