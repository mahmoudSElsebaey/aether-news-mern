import { useEffect } from "react";
import { useLocale } from "@/hooks/useLocale";
import { localizedPath, getDir } from "@/utils/locale";
import type { Locale } from "@/types/article";

const SITE_NAME = "Delta News";
const SITE_URL = typeof window !== "undefined" ? window.location.origin : "https://deltanews.example";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  publishedAt?: string;
  authorName?: string;
  noIndex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function Seo({
  title,
  description = "Independent journalism for a connected world. Sports, technology, business — in Arabic and English.",
  image,
  path = "/",
  type = "website",
  publishedAt,
  authorName,
  noIndex = false,
}: SeoProps) {
  const locale = useLocale();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = `${SITE_URL}${localizedPath(path, locale)}`;

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = locale;
    document.documentElement.dir = getDir(locale);

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex,nofollow" : "index,follow");

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:locale", locale === "ar" ? "ar_AR" : "en_US");
    if (image) upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", canonical);
    const alternates: Locale[] = ["en", "ar"];
    for (const lng of alternates) {
      upsertLink("alternate", `${SITE_URL}${localizedPath(path, lng)}`, lng);
    }
    upsertLink("alternate", `${SITE_URL}${localizedPath(path, "en")}`, "x-default");

    const existing = document.getElementById("delta-jsonld");
    if (existing) existing.remove();

    if (type === "article" && title) {
      const script = document.createElement("script");
      script.id = "delta-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: title,
        description,
        image: image ? [image] : undefined,
        datePublished: publishedAt,
        author: authorName ? { "@type": "Person", name: authorName } : undefined,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
        },
        mainEntityOfPage: canonical,
        inLanguage: locale,
      });
      document.head.appendChild(script);
    }
  }, [fullTitle, description, image, path, type, publishedAt, authorName, noIndex, locale, canonical]);

  return null;
}
