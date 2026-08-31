export type ArticleStatus = "draft" | "published" | "scheduled";

export interface ArticleTranslation {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: string;
  slug: string;
  translations: {
    en: { name: string; description?: string };
    ar: { name: string; description?: string };
  };
  image?: string;
}

export interface Article {
  id: string;
  translations: {
    en: ArticleTranslation;
    ar: ArticleTranslation;
  };
  category: Category;
  author: Author;
  coverImage: string;
  status: ArticleStatus;
  isFeatured: boolean;
  isTrending: boolean;
  isBreaking: boolean;
  views: number;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}

export type Locale = "en" | "ar";
