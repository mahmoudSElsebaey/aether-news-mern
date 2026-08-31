import { z } from "zod";

const catTranslation = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(300).optional().default(""),
  slug: z.string().min(2).max(80).optional(),
});

export const createCategorySchema = z.object({
  translations: z.object({
    en: catTranslation,
    ar: catTranslation,
  }),
  slug: z.string().min(2).max(80).optional(),
  image: z.string().optional().default(""),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const updateCategorySchema = createCategorySchema.partial();
