/**
 * Seed database with demo users, categories and sample articles.
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

  const articles = [
    {
      en: {
        title: "Champions League Final: Tactical Masterclass Decides the Night",
        excerpt: "A disciplined defensive shape and clinical finishing sealed a historic victory.",
        content: "<p>In a match defined by tactical discipline rather than pure spectacle, the Champions League final delivered a masterclass in modern football management.</p><p>From the opening whistle, the eventual winners controlled space with a compact mid-block that frustrated every progressive run.</p>",
        slug: "champions-league-final-tactical-masterclass",
        seoTitle: "Champions League Final Analysis | Delta News",
      },
      ar: {
        title: "نهائي دوري الأبطال: درس تكتيكي يحسم الليلة",
        excerpt: "تنظيم دفاعي منضبط وإنهاء حاسم منحا فوزاً تاريخياً.",
        content: "<p>في مباراة حسمها الانضباط التكتيكي أكثر من الاستعراض، قدم نهائي دوري أبطال أوروبا درساً في الإدارة الحديثة لكرة القدم.</p>",
        slug: "nahaie-dawri-al-abtal",
        seoTitle: "تحليل نهائي دوري الأبطال | دلتا نيوز",
      },
      category: "football",
      author: editor,
      cover: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=675&fit=crop",
      flags: { featured: true, trending: true, breaking: true },
      views: 18420,
      publishedAt: "2026-08-30T21:15:00Z",
      tags: ["champions-league", "tactics", "final"],
    },
    {
      en: {
        title: "AI Chips Race Intensifies as New Data-Centre Demand Surges",
        excerpt: "Hyperscalers are locking in multi-year supply deals while startups scramble for capacity.",
        content: "<p>The race for advanced AI accelerators has entered a new phase. After two years of constrained supply, the largest cloud providers are signing multi-year purchase agreements that reshape the semiconductor pipeline.</p>",
        slug: "ai-chips-race-data-centre-demand",
      },
      ar: {
        title: "سباق رقائق الذكاء الاصطناعي يتصاعد مع ارتفاع طلب مراكز البيانات",
        excerpt: "كبار مزودي الحوسبة السحابية يبرمون صفقات توريد متعددة السنوات.",
        content: "<p>دخل سباق مسرّعات الذكاء الاصطناعي المتقدمة مرحلة جديدة بعد عامين من محدودية العرض.</p>",
        slug: "sibaq-raqaeq-al-thaka",
      },
      category: "technology",
      author: writer,
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop",
      flags: { featured: true, trending: true },
      views: 12350,
      publishedAt: "2026-08-30T14:30:00Z",
      tags: ["ai", "chips", "data-centres"],
    },
    {
      en: {
        title: "Central Banks Signal Patience as Inflation Cools Faster Than Expected",
        excerpt: "Markets rally on dovish guidance while policymakers warn against premature victory laps.",
        content: "<p>Major central banks struck a carefully balanced tone this week, acknowledging faster-than-expected progress on inflation without committing to an aggressive easing path.</p>",
        slug: "central-banks-patience-inflation-cools",
      },
      ar: {
        title: "البنوك المركزية تشير إلى الصبر مع تراجع التضخم أسرع من المتوقع",
        excerpt: "الأسواق ترتفع مع إشارات تيسيرية بينما يحذر صناع السياسات من الاحتفال المبكر.",
        content: "<p>اتخذت البنوك المركزية الكبرى نبرة متوازنة هذا الأسبوع مع تقدم أسرع من المتوقع في كبح التضخم.</p>",
        slug: "al-bunuk-al-markazia-wal-tadakhum",
      },
      category: "business",
      author: writer,
      cover: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop",
      flags: { featured: true },
      views: 8920,
      publishedAt: "2026-08-29T11:00:00Z",
      tags: ["markets", "central-banks", "inflation"],
    },
    {
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
      category: "sports",
      author: editor,
      cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=1200&h=675&fit=crop",
      flags: { trending: true },
      views: 6540,
      publishedAt: "2026-08-29T08:45:00Z",
      tags: ["olympics", "qualification"],
    },
    {
      en: {
        title: "Transfer Window Closes with Record Spending in Three Leagues",
        excerpt: "Premier League, Saudi Pro League and Serie A rewrite the summer ledger again.",
        content: "<p>Another summer of extraordinary spending has closed across three major leagues, reshaping squads and financial benchmarks.</p>",
        slug: "transfer-window-record-spending",
      },
      ar: {
        title: "نافذة الانتقالات تُغلق بإنفاق قياسي في ثلاث دوريات",
        excerpt: "الدوري الإنجليزي والسعودي والإيطالي يعيدون كتابة دفتر الصيف.",
        content: "<p>أُغلق صيف آخر من الإنفاق الاستثنائي في ثلاثة دوريات كبرى.</p>",
        slug: "nafidhat-al-intiqalat",
      },
      category: "football",
      author: editor,
      cover: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=675&fit=crop",
      flags: { trending: true },
      views: 11200,
      publishedAt: "2026-08-28T19:20:00Z",
      tags: ["transfers", "premier-league"],
    },
    {
      en: {
        title: "Cairo Tech Corridor Attracts Record Venture Funding in H1",
        excerpt: "Egyptian startups raise more capital as regional funds deepen MENA bets.",
        content: "<p>Venture activity across Cairo’s tech corridor accelerated in the first half of the year, with fintech, logistics and climate-tech rounds leading the volume.</p>",
        slug: "cairo-tech-corridor-venture-funding",
      },
      ar: {
        title: "ممر القاهرة التقني يجذب تمويلاً استثمارياً قياسياً في النصف الأول",
        excerpt: "شركات مصرية ناشئة تجمع رأس مال أكبر مع تعمق صناديق المنطقة.",
        content: "<p>تسارع نشاط رأس المال المغامر في ممر التقنية بالقاهرة خلال النصف الأول من العام.</p>",
        slug: "tamwil-sharikat-al-qahira",
      },
      category: "technology",
      author: writer,
      cover: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=675&fit=crop",
      flags: { featured: true },
      views: 7340,
      publishedAt: "2026-08-28T10:00:00Z",
      tags: ["startups", "egypt", "venture"],
    },
    {
      en: {
        title: "North Africa Energy Deals Signal New Export Routes to Europe",
        excerpt: "Pipeline and green-hydrogen talks reshape the Mediterranean energy map.",
        content: "<p>Governments and utilities across North Africa advanced several export-oriented energy agreements this month, linking renewable capacity with European demand.</p>",
        slug: "north-africa-energy-export-routes",
      },
      ar: {
        title: "صفقات طاقة في شمال أفريقيا ترسم مسارات تصدير جديدة لأوروبا",
        excerpt: "محادثات خطوط الأنابيب والهيدروجين الأخضر تعيد رسم خريطة المتوسط.",
        content: "<p>تقدّمت حكومات ومرافق في شمال أفريقيا بعدة اتفاقيات طاقة موجّهة للتصدير هذا الشهر.</p>",
        slug: "taqa-shamal-afriqya",
      },
      category: "business",
      author: writer,
      cover: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=675&fit=crop",
      flags: { trending: true },
      views: 5680,
      publishedAt: "2026-08-27T16:40:00Z",
      tags: ["energy", "north-africa", "export"],
    },
    {
      en: {
        title: "Regional Summit Focuses on Climate Resilience and Water Security",
        excerpt: "Leaders push coordinated investment after a season of extreme heat and scarcity alerts.",
        content: "<p>A regional summit closed with commitments to share climate data and accelerate water infrastructure projects across arid zones.</p>",
        slug: "regional-summit-climate-water-security",
      },
      ar: {
        title: "قمة إقليمية تركز على المرونة المناخية وأمن المياه",
        excerpt: "القادة يدفعون باستثمار منسّق بعد موسم من الحر الشديد وتنبيهات الشح.",
        content: "<p>اختُتمت قمة إقليمية بالتزامات لتبادل بيانات المناخ وتسريع مشاريع البنية التحتية للمياه.</p>",
        slug: "qimma-manakhiya-wa-miyah",
      },
      category: "news",
      author: editor,
      cover: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop",
      flags: { featured: true, breaking: true },
      views: 9410,
      publishedAt: "2026-08-27T09:15:00Z",
      tags: ["climate", "water", "diplomacy"],
    },
    {
      en: {
        title: "Women’s Basketball League Draws Record Attendance in Season Opener",
        excerpt: "Sold-out arenas mark a turning point for the professional game in the region.",
        content: "<p>Opening weekend crowds set a new attendance benchmark, with broadcasters expanding live coverage into additional markets.</p>",
        slug: "womens-basketball-record-attendance",
      },
      ar: {
        title: "دوري كرة السلة للسيدات يحقق حضوراً قياسياً في افتتاح الموسم",
        excerpt: "قاعات ممتلئة تمثّل نقطة تحول للعبة الاحترافية في المنطقة.",
        content: "<p>سجّلت جماهير عطلة الافتتاح معيار حضور جديداً مع توسّع التغطية التلفزيونية.</p>",
        slug: "douri-salla-sayidat",
      },
      category: "sports",
      author: editor,
      cover: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=675&fit=crop",
      flags: { trending: true },
      views: 4820,
      publishedAt: "2026-08-26T18:00:00Z",
      tags: ["basketball", "attendance"],
    },
    {
      en: {
        title: "Open-Source Models Reshape Enterprise AI Procurement",
        excerpt: "CIOs balance cost, control and compliance as alternatives to closed APIs mature.",
        content: "<p>Enterprise buyers are rewriting AI roadmaps around hybrid stacks that mix proprietary services with open-weight models hosted in-region.</p>",
        slug: "open-source-models-enterprise-ai",
      },
      ar: {
        title: "النماذج مفتوحة المصدر تعيد تشكيل مشتريات الذكاء الاصطناعي للمؤسسات",
        excerpt: "مدراء التقنية يوازنون بين التكلفة والسيطرة والامتثال.",
        content: "<p>يعيد مشترو المؤسسات كتابة خرائط طريق الذكاء الاصطناعي حول بنى هجينة تجمع الخدمات المغلقة والنماذج المفتوحة.</p>",
        slug: "namazij-maftuha-lil-muassasat",
      },
      category: "technology",
      author: writer,
      cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop",
      flags: {},
      views: 6100,
      publishedAt: "2026-08-26T12:30:00Z",
      tags: ["open-source", "enterprise", "ai"],
    },
    {
      en: {
        title: "Shipping Costs Ease on Key Asia–Mediterranean Lanes",
        excerpt: "Freight indices cool as capacity returns and port congestion moderates.",
        content: "<p>Container rates on several Asia–Mediterranean lanes declined for a third consecutive week, offering relief to importers ahead of peak season.</p>",
        slug: "shipping-costs-asia-mediterranean",
      },
      ar: {
        title: "تكاليف الشحن تنخفض على خطوط آسيا–المتوسط الرئيسية",
        excerpt: "مؤشرات الشحن تهدأ مع عودة السعة وتراجع ازدحام الموانئ.",
        content: "<p>انخفضت أسعار الحاويات على عدة خطوط بين آسيا والمتوسط للأسبوع الثالث على التوالي.</p>",
        slug: "takaleef-al-shahn-al-mutawassit",
      },
      category: "business",
      author: writer,
      cover: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1200&h=675&fit=crop",
      flags: {},
      views: 3950,
      publishedAt: "2026-08-25T15:10:00Z",
      tags: ["shipping", "trade", "logistics"],
    },
    {
      en: {
        title: "Cultural Festival Circuit Returns with Cross-Border Lineups",
        excerpt: "Music and film events reconnect audiences from Cairo to Tunis and Casablanca.",
        content: "<p>Organizers unveiled a denser autumn calendar of festivals designed to move artists and audiences across North African capitals.</p>",
        slug: "cultural-festival-circuit-returns",
      },
      ar: {
        title: "دائرة المهرجانات الثقافية تعود بعروض عابرة للحدود",
        excerpt: "فعاليات موسيقى وسينما تعيد ربط الجمهور من القاهرة إلى تونس والدار البيضاء.",
        content: "<p>كشف المنظّمون عن روزنامة خريف أكثر كثافة لمهرجانات تنقل الفنانين والجمهور عبر عواصم شمال أفريقيا.</p>",
        slug: "mahrajanat-thaqafiya",
      },
      category: "news",
      author: editor,
      cover: "https://images.unsplash.com/photo-1459749411175-04bf529277ce?w=1200&h=675&fit=crop",
      flags: { featured: true },
      views: 5210,
      publishedAt: "2026-08-25T08:00:00Z",
      tags: ["culture", "festivals", "region"],
    },
  ];

  console.log("[seed] Creating articles...");
  await Article.insertMany(
    articles.map((a) => ({
      translations: {
        en: {
          title: a.en.title,
          excerpt: a.en.excerpt,
          content: a.en.content,
          slug: a.en.slug,
          seoTitle: a.en.seoTitle || `${a.en.title} | Delta News`,
          seoDescription: a.en.excerpt,
        },
        ar: {
          title: a.ar.title,
          excerpt: a.ar.excerpt,
          content: a.ar.content,
          slug: a.ar.slug,
          seoTitle: a.ar.seoTitle || `${a.ar.title} | دلتا نيوز`,
          seoDescription: a.ar.excerpt,
        },
      },
      category: bySlug[a.category]._id,
      author: a.author._id,
      coverImage: a.cover,
      status: "published",
      isFeatured: !!a.flags.featured,
      isTrending: !!a.flags.trending,
      isBreaking: !!a.flags.breaking,
      views: a.views,
      publishedAt: new Date(a.publishedAt),
      tags: a.tags,
    }))
  );

  console.log(`[seed] Done. ${articles.length} articles.`);
  console.log("  Admin:  admin@delta.news / Admin123!");
  console.log("  Editor: editor@delta.news / Editor123!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
