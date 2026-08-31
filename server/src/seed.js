/**
 * Seed database with demo admin, categories and sample articles.
 * Usage: npm run seed
 */
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Category } from "./models/Category.js";
import { Article } from "./models/Article.js";

async function seed() {
  await connectDB();

  console.log("[seed] Clearing collections...");
  await Promise.all([
    Article.deleteMany({}),
    Category.deleteMany({}),
    User.deleteMany({}),
  ]);

  console.log("[seed] Creating users...");
  const admin = await User.create({
    name: "Admin User",
    email: "admin@delta.news",
    password: "Admin123!",
    role: "admin",
    preferredLanguage: "en",
  });

  const editor = await User.create({
    name: "Sara Al-Hassan",
    email: "editor@delta.news",
    password: "Editor123!",
    role: "editor",
    preferredLanguage: "ar",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  });

  const writer = await User.create({
    name: "James Carter",
    email: "james@delta.news",
    password: "Editor123!",
    role: "editor",
    preferredLanguage: "en",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  });

  console.log("[seed] Creating categories...");
  const categories = await Category.insertMany([
    {
      slug: "sports",
      order: 1,
      translations: {
        en: { name: "Sports", description: "Latest sports news and analysis", slug: "sports" },
        ar: { name: "رياضة", description: "أحدث أخبار الرياضة والتحليلات", slug: "riyada" },
      },
    },
    {
      slug: "football",
      order: 2,
      translations: {
        en: { name: "Football", description: "Football news from around the world", slug: "football" },
        ar: { name: "كرة القدم", description: "أخبار كرة القدم من حول العالم", slug: "kura" },
      },
    },
    {
      slug: "technology",
      order: 3,
      translations: {
        en: { name: "Technology", description: "Tech innovations and digital trends", slug: "technology" },
        ar: { name: "تكنولوجيا", description: "ابتكارات التقنية والاتجاهات الرقمية", slug: "tech" },
      },
    },
    {
      slug: "business",
      order: 4,
      translations: {
        en: { name: "Business", description: "Markets, economy and companies", slug: "business" },
        ar: { name: "أعمال", description: "الأسواق والاقتصاد والشركات", slug: "aamal" },
      },
    },
    {
      slug: "news",
      order: 5,
      translations: {
        en: { name: "General News", description: "World and regional news", slug: "news" },
        ar: { name: "أخبار عامة", description: "أخبار العالم والمنطقة", slug: "akhbar" },
      },
    },
  ]);

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  console.log("[seed] Creating articles...");
  await Article.insertMany([
    {
      translations: {
        en: {
          title: "Champions League Final: Tactical Masterclass Decides the Night",
          excerpt:
            "A disciplined defensive shape and clinical finishing sealed a historic victory.",
          content:
            "<p>In a match defined by tactical discipline rather than pure spectacle, the Champions League final delivered a masterclass in modern football management.</p><p>From the opening whistle, the eventual winners controlled space with a compact mid-block.</p>",
          slug: "champions-league-final-tactical-masterclass",
          seoTitle: "Champions League Final Analysis | Delta News",
          seoDescription: "Tactical breakdown of the Champions League final.",
        },
        ar: {
          title: "نهائي دوري الأبطال: درس تكتيكي يحسم الليلة",
          excerpt: "تنظيم دفاعي منضبط وإنهاء حاسم للمباريات منحا فوزاً تاريخياً.",
          content:
            "<p>في مباراة حسمها الانضباط التكتيكي أكثر من الاستعراض، قدم نهائي دوري أبطال أوروبا درساً في الإدارة الحديثة لكرة القدم.</p>",
          slug: "nahaie-dawri-al-abtal",
          seoTitle: "تحليل نهائي دوري الأبطال | دلتا نيوز",
        },
      },
      category: bySlug.football._id,
      author: editor._id,
      coverImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=675&fit=crop",
      status: "published",
      isFeatured: true,
      isTrending: true,
      isBreaking: true,
      views: 18420,
      publishedAt: new Date("2026-08-30T21:15:00Z"),
      tags: ["champions-league", "tactics", "final"],
    },
    {
      translations: {
        en: {
          title: "AI Chips Race Intensifies as New Data-Centre Demand Surges",
          excerpt:
            "Hyperscalers are locking in multi-year supply deals while startups scramble for remaining capacity.",
          content:
            "<p>The race for advanced AI accelerators has entered a new phase. After two years of constrained supply, the largest cloud providers are signing multi-year purchase agreements.</p>",
          slug: "ai-chips-race-data-centre-demand",
        },
        ar: {
          title: "سباق رقائق الذكاء الاصطناعي يتصاعد مع ارتفاع طلب مراكز البيانات",
          excerpt: "كبار مزودي الحوسبة السحابية يبرمون صفقات توريد متعددة السنوات.",
          content:
            "<p>دخل سباق مسرّعات الذكاء الاصطناعي المتقدمة مرحلة جديدة بعد عامين من محدودية العرض.</p>",
          slug: "sibaq-raqaeq-al-thaka",
        },
      },
      category: bySlug.technology._id,
      author: writer._id,
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop",
      status: "published",
      isFeatured: true,
      isTrending: true,
      views: 12350,
      publishedAt: new Date("2026-08-30T14:30:00Z"),
      tags: ["ai", "chips", "data-centres"],
    },
    {
      translations: {
        en: {
          title: "Central Banks Signal Patience as Inflation Cools Faster Than Expected",
          excerpt: "Markets rally on dovish guidance while policymakers warn against premature victory laps.",
          content:
            "<p>Major central banks struck a carefully balanced tone this week, acknowledging faster-than-expected progress on inflation.</p>",
          slug: "central-banks-patience-inflation-cools",
        },
        ar: {
          title: "البنوك المركزية تشير إلى الصبر مع تراجع التضخم أسرع من المتوقع",
          excerpt: "الأسواق ترتفع مع إشارات تيسيرية بينما يحذر صناع السياسات من الاحتفال المبكر.",
          content: "<p>اتخذت البنوك المركزية الكبرى نبرة متوازنة هذا الأسبوع.</p>",
          slug: "al-bunuk-al-markazia-wal-tadakhum",
        },
      },
      category: bySlug.business._id,
      author: writer._id,
      coverImage:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop",
      status: "published",
      isFeatured: true,
      views: 8920,
      publishedAt: new Date("2026-08-29T11:00:00Z"),
      tags: ["markets", "central-banks", "inflation"],
    },
    {
      translations: {
        en: {
          title: "Olympic Qualification Race Heats Up Across Three Continents",
          excerpt: "Last remaining slots produce dramatic nights as federations push for momentum.",
          content: "<p>With only a handful of Olympic qualification events left, national federations are treating every remaining competition as a final.</p>",
          slug: "olympic-qualification-race-heats-up",
        },
        ar: {
          title: "سباق التأهل الأولمبي يشتعل عبر ثلاث قارات",
          excerpt: "المقاعد الأخيرة تنتج ليالٍ درامية.",
          content: "<p>مع بقاء عدد قليل من فعاليات التأهل الأولمبي، تتعامل الاتحادات الوطنية مع كل منافسة متبقية كأنها نهائي.</p>",
          slug: "sibaq-al-taahol-al-olompi",
        },
      },
      category: bySlug.sports._id,
      author: editor._id,
      coverImage:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=1200&h=675&fit=crop",
      status: "published",
      isTrending: true,
      views: 6540,
      publishedAt: new Date("2026-08-29T08:45:00Z"),
      tags: ["olympics", "qualification"],
    },
    {
      translations: {
        en: {
          title: "Transfer Window Closes with Record Spending in Three Leagues",
          excerpt: "Premier League, Saudi Pro League and Serie A rewrite the summer ledger again.",
          content: "<p>Another summer of extraordinary spending has closed across three major leagues.</p>",
          slug: "transfer-window-record-spending",
        },
        ar: {
          title: "نافذة الانتقالات تُغلق بإنفاق قياسي في ثلاث دوريات",
          excerpt: "الدوري الإنجليزي والدوري السعودي والدوري الإيطالي يعيدون كتابة دفتر الصيف.",
          content: "<p>أُغلق صيف آخر من الإنفاق الاستثنائي في ثلاثة دوريات كبرى.</p>",
          slug: "nafidhat-al-intiqalat",
        },
      },
      category: bySlug.football._id,
      author: editor._id,
      coverImage:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=675&fit=crop",
      status: "published",
      isTrending: true,
      views: 11200,
      publishedAt: new Date("2026-08-28T19:20:00Z"),
      tags: ["transfers", "premier-league"],
    },
  ]);

  console.log("[seed] Done.");
  console.log("  Admin:  admin@delta.news / Admin123!");
  console.log("  Editor: editor@delta.news / Editor123!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
