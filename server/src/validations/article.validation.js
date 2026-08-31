import { z } from "zod";

const translationSchema = z.object({
  title: z.string().min(3).max(220),
  excerpt: z.string().max(500).optional().default(""),
  content: z.string().optional().default(""),
  slug: z.string().min(2).max(220).optional(),
  seoTitle: z.string().max(220).optional().default(""),
  seoDescription: z.string().max(320).optional().default(""),
});

export const createArticleSchema = z.object({
  translations: z.object({
    en: translationSchema,
    ar: translationSchema,
  }),
  category: z.string().min(1),
  coverImage: z.string().url().or(z.literal("")).optional().default(""),
  status: z.enum(["draft", "published", "scheduled"]).optional().default("draft"),
  isFeatured: z.boolean().optional().default(false),
  isTrending: z.boolean().optional().default(false),
  isBreaking: z.boolean().optional().default(false),
  scheduledAt: z.string().datetime().optional().nullable(),
  tags: z.array(z.string()).optional().default([]),
});

export const updateArticleSchema = createArticleSchema.partial();

export const articleQuerySchema = z.object({
  language: z.enum(["en", "ar"]).optional().default("en"),
  category: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled", "all"]).optional().default("published"),
  featured: z.enum(["true", "false"]).optional(),
  trending: z.enum(["true", "false"]).optional(),
  breaking: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
  sort: z.enum(["latest", "popular", "trending"]).optional().default("latest"),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});
