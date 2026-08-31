import type { Category } from "@/types/article";

export const categories: Category[] = [
  {
    id: "cat-sports",
    slug: "sports",
    translations: {
      en: { name: "Sports", description: "Latest sports news and analysis" },
      ar: { name: "رياضة", description: "أحدث أخبار الرياضة والتحليلات" },
    },
  },
  {
    id: "cat-football",
    slug: "football",
    translations: {
      en: { name: "Football", description: "Football news from around the world" },
      ar: { name: "كرة القدم", description: "أخبار كرة القدم من حول العالم" },
    },
  },
  {
    id: "cat-technology",
    slug: "technology",
    translations: {
      en: { name: "Technology", description: "Tech innovations and digital trends" },
      ar: { name: "تكنولوجيا", description: "ابتكارات التقنية والاتجاهات الرقمية" },
    },
  },
  {
    id: "cat-business",
    slug: "business",
    translations: {
      en: { name: "Business", description: "Markets, economy and companies" },
      ar: { name: "أعمال", description: "الأسواق والاقتصاد والشركات" },
    },
  },
  {
    id: "cat-news",
    slug: "news",
    translations: {
      en: { name: "General News", description: "World and regional news" },
      ar: { name: "أخبار عامة", description: "أخبار العالم والمنطقة" },
    },
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
