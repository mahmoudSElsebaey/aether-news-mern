import { Router } from "express";
import { Article } from "../models/Article.js";
import { Category } from "../models/Category.js";
import { env } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

/** Public site origin for absolute URLs in sitemap */
function siteOrigin() {
  return env.clientUrl.replace(/\/$/, "");
}

router.get(
  "/sitemap.xml",
  asyncHandler(async (req, res) => {
    const origin = siteOrigin();
    const [articles, categories] = await Promise.all([
      Article.find({ status: "published" })
        .select("translations.en.slug translations.ar.slug updatedAt publishedAt")
        .lean(),
      Category.find({ isActive: true }).select("slug").lean(),
    ]);

    const urls = [];

    for (const lang of ["en", "ar"]) {
      urls.push({
        loc: `${origin}/${lang}`,
        changefreq: "hourly",
        priority: "1.0",
      });
      urls.push({
        loc: `${origin}/${lang}/news`,
        changefreq: "hourly",
        priority: "0.9",
      });
      for (const cat of categories) {
        urls.push({
          loc: `${origin}/${lang}/${cat.slug}`,
          changefreq: "daily",
          priority: "0.8",
        });
      }
      for (const article of articles) {
        const slug = article.translations?.[lang]?.slug;
        if (!slug) continue;
        urls.push({
          loc: `${origin}/${lang}/article/${encodeURIComponent(slug)}`,
          lastmod: (article.updatedAt || article.publishedAt || new Date()).toISOString(),
          changefreq: "weekly",
          priority: "0.7",
        });
      }
    }

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.type("application/xml").send(body);
  })
);

router.get("/robots.txt", (req, res) => {
  const origin = siteOrigin();
  res.type("text/plain").send(
    `User-agent: *
Allow: /
Allow: /en/
Allow: /ar/
Disallow: /admin/

Sitemap: ${origin}/api/sitemap.xml
`
  );
});

export default router;
