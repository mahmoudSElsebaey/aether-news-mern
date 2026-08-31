import type { ArticleStatus, Locale } from "./article";

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  language?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: ApiMeta;
  message?: string;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  avatar?: string;
  preferredLanguage?: Locale;
  bio?: string;
  createdAt?: string;
}

export interface ApiCategory {
  _id: string;
  slug: string;
  translations: {
    en: { name: string; description?: string; slug: string };
    ar: { name: string; description?: string; slug: string };
  };
  image?: string;
  order?: number;
  isActive?: boolean;
}

export interface ApiAuthor {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
  preferredLanguage?: Locale;
}

export interface ApiArticleTranslation {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ApiArticle {
  _id: string;
  translations: {
    en: ApiArticleTranslation;
    ar: ApiArticleTranslation;
  };
  category: ApiCategory | string;
  author: ApiAuthor | string;
  coverImage: string;
  status: ArticleStatus;
  isFeatured: boolean;
  isTrending: boolean;
  isBreaking: boolean;
  views: number;
  publishedAt: string | null;
  scheduledAt?: string | null;
  readingTime: number;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleListParams {
  language?: Locale;
  category?: string;
  status?: string;
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  search?: string;
  sort?: "latest" | "popular" | "trending";
  page?: number;
  limit?: number;
}
