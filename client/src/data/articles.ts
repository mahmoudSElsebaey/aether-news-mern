import type { Article } from "@/types/article";
import { categories } from "./categories";
import { authors } from "./authors";

const [sports, football, technology, business, news] = categories;
const [sara, james, layla, omar, nadia] = authors;

export const articles: Article[] = [
  {
    id: "art-1",
    translations: {
      en: {
        title: "Champions League Final: Tactical Masterclass Decides the Night",
        excerpt:
          "A disciplined defensive shape and clinical finishing sealed a historic victory in front of 70,000 fans.",
        content: `<p>In a match defined by tactical discipline rather than pure spectacle, the Champions League final delivered a masterclass in modern football management.</p>
<p>From the opening whistle, the eventual winners controlled space with a compact mid-block, forcing turnovers in dangerous areas and converting two of their three clear chances.</p>
<p>The losing side dominated possession but struggled to break lines. Their full-backs were repeatedly isolated, and the absence of a true number ten left the attacking midfield overcrowded and predictable.</p>
<p>Analysts will debate the substitutions for weeks. The introduction of a third centre-back in the 68th minute effectively killed the game as a contest, allowing the leaders to manage the clock with professional ruthlessness.</p>
<p>Beyond the result, the final highlighted a broader trend: elite European football is increasingly decided by structural organisation rather than individual brilliance alone.</p>`,
        slug: "champions-league-final-tactical-masterclass",
        seoTitle: "Champions League Final Analysis | Aether News",
        seoDescription:
          "Tactical breakdown of the Champions League final and what it means for modern elite football.",
      },
      ar: {
        title: "نهائي دوري الأبطال: درس تكتيكي يحسم الليلة",
        excerpt:
          "تنظيم دفاعي منضبط وإنهاء حاسم للمباريات منحا فوزاً تاريخياً أمام 70 ألف متفرج.",
        content: `<p>في مباراة حسمها الانضباط التكتيكي أكثر من الاستعراض، قدم نهائي دوري أبطال أوروبا درساً في الإدارة الحديثة لكرة القدم.</p>
<p>منذ الصافرة الأولى سيطر الفريق الفائز على المساحات بكتلة وسطية متماسكة، وأجبر الخصم على فقدان الكرة في مناطق خطرة، وحوّل فرصتين من ثلاث فرص واضحة إلى أهداف.</p>
<p>سيطر الفريق الخاسر على الاستحواذ لكنه عجز عن اختراق الخطوط. تُرك ظهيره معزولين مراراً، وغياب صانع ألعاب حقيقي جعل الوسط الهجومي مزدحماً ومتوقعاً.</p>
<p>سيظل المحللون يناقشون التبديلات لأسابيع. إدخال مدافع ثالث في الدقيقة 68 أنهى المباراة عملياً كمنافسة، وسمح للقادة بإدارة الوقت باحترافية باردة.</p>
<p>بعيداً عن النتيجة، أبرز النهائي اتجاهاً أوسع: كرة القدم الأوروبية النخبوية تُحسم بشكل متزايد بالتنظيم الهيكلي أكثر من التألق الفردي وحده.</p>`,
        slug: "نهائي-دوري-الأبطال-درس-تكتيكي",
        seoTitle: "تحليل نهائي دوري الأبطال | أثير نيوز",
        seoDescription: "تحليل تكتيكي لنهائي دوري أبطال أوروبا وما يعنيه لكرة القدم الحديثة.",
      },
    },
    category: football,
    author: omar,
    coverImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: true,
    isTrending: true,
    isBreaking: true,
    views: 18420,
    publishedAt: "2026-08-30T21:15:00Z",
    readingTime: 6,
    tags: ["champions-league", "tactics", "final"],
  },
  {
    id: "art-2",
    translations: {
      en: {
        title: "AI Chips Race Intensifies as New Data-Centre Demand Surges",
        excerpt:
          "Hyperscalers are locking in multi-year supply deals while startups scramble for remaining capacity.",
        content: `<p>The race for advanced AI accelerators has entered a new phase. After two years of constrained supply, the largest cloud providers are signing multi-year purchase agreements that effectively lock out smaller players from the latest generation of chips.</p>
<p>Industry executives describe the current environment as “allocation by relationship.” Priority is given to customers who can commit to multi-gigawatt data-centre roadmaps and who already operate at global scale.</p>
<p>Meanwhile, a parallel market for slightly older but still highly capable silicon is emerging. Several AI startups have pivoted their roadmaps to these more available chips, accepting modest performance trade-offs in exchange for shipping products on schedule.</p>
<p>Regulators on both sides of the Atlantic are watching closely. Questions around fair access, export controls and energy consumption are expected to shape the next round of policy discussions.</p>`,
        slug: "ai-chips-race-data-centre-demand",
        seoTitle: "AI Chips Race and Data Centre Demand | Aether News",
      },
      ar: {
        title: "سباق رقائق الذكاء الاصطناعي يتصاعد مع ارتفاع طلب مراكز البيانات",
        excerpt:
          "كبار مزودي الحوسبة السحابية يبرمون صفقات توريد متعددة السنوات بينما تتنافس الشركات الناشئة على الطاقة المتبقية.",
        content: `<p>دخل سباق مسرّعات الذكاء الاصطناعي المتقدمة مرحلة جديدة. بعد عامين من محدودية العرض، يوقع أكبر مزودي الحوسبة السحابية اتفاقيات شراء متعددة السنوات تُخرج اللاعبين الأصغر عملياً من أحدث أجيال الرقائق.</p>
<p>يصف مدراء في الصناعة البيئة الحالية بأنها «توزيع حسب العلاقة». تُمنح الأولوية للعملاء القادرين على الالتزام بخرائط طريق لمراكز بيانات بمقياس الجيجاواط ويعملون بالفعل على نطاق عالمي.</p>
<p>في الوقت نفسه، يظهر سوق موازٍ لرقائق أقدم قليلاً لكنها لا تزال قادرة جداً. عدّلت عدة شركات ناشئة في الذكاء الاصطناعي خرائط طريقها نحو هذه الرقائق الأكثر توفراً، قابلةً بتنازلات أداء متواضعة مقابل إطلاق المنتجات في مواعيدها.</p>
<p>يراقب المنظمون على جانبي الأطلسي عن كثب. من المتوقع أن تشكل أسئلة الوصول العادل وضوابط التصدير واستهلاك الطاقة الجولة التالية من النقاشات السياسية.</p>`,
        slug: "سباق-رقائق-الذكاء-الاصطناعي",
        seoTitle: "سباق رقائق الذكاء الاصطناعي | أثير نيوز",
      },
    },
    category: technology,
    author: james,
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: true,
    isTrending: true,
    isBreaking: false,
    views: 12350,
    publishedAt: "2026-08-30T14:30:00Z",
    readingTime: 5,
    tags: ["ai", "chips", "data-centres"],
  },
  {
    id: "art-3",
    translations: {
      en: {
        title: "Central Banks Signal Patience as Inflation Cools Faster Than Expected",
        excerpt:
          "Markets rally on dovish guidance while policymakers warn against premature victory laps.",
        content: `<p>Major central banks struck a carefully balanced tone this week, acknowledging faster-than-expected progress on inflation while refusing to lock in a rapid path of rate cuts.</p>
<p>Bond markets interpreted the message as broadly supportive. Equity indices also advanced, led by rate-sensitive sectors.</p>
<p>Behind the scenes, officials remain concerned about services inflation and wage growth that has yet to fully normalise. Several policymakers emphasised that any easing cycle would be data-dependent and gradual.</p>`,
        slug: "central-banks-patience-inflation-cools",
      },
      ar: {
        title: "البنوك المركزية تشير إلى الصبر مع تراجع التضخم أسرع من المتوقع",
        excerpt:
          "الأسواق ترتفع مع إشارات تيسيرية بينما يحذر صناع السياسات من الاحتفال المبكر.",
        content: `<p>اتخذت البنوك المركزية الكبرى نبرة متوازنة هذا الأسبوع، معترفة بتقدم أسرع من المتوقع في التضخم مع رفض الالتزام بمسار سريع لخفض أسعار الفائدة.</p>
<p>فسر سوق السندات الرسالة على أنها داعمة بشكل عام. وارتفعت مؤشرات الأسهم أيضاً بقيادة القطاعات الحساسة لأسعار الفائدة.</p>
<p>خلف الكواليس، لا يزال المسؤولون قلقين بشأن تضخم الخدمات ونمو الأجور الذي لم يعد إلى طبيعته بالكامل بعد. أكد عدة صناع سياسات أن أي دورة تيسير ستكون معتمدة على البيانات وتدريجية.</p>`,
        slug: "البنوك-المركزية-والتضخم",
      },
    },
    category: business,
    author: layla,
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: true,
    isTrending: false,
    isBreaking: false,
    views: 8920,
    publishedAt: "2026-08-29T11:00:00Z",
    readingTime: 4,
    tags: ["markets", "central-banks", "inflation"],
  },
  {
    id: "art-4",
    translations: {
      en: {
        title: "Olympic Qualification Race Heats Up Across Three Continents",
        excerpt:
          "Last remaining slots produce dramatic nights as federations push for Paris legacy momentum.",
        content: `<p>With only a handful of Olympic qualification events left, national federations are treating every remaining competition as a final.</p>
<p>In athletics, swimming and combat sports, the pressure is particularly intense. Athletes who have lived through a full four-year cycle know that a single bad night can end the dream.</p>`,
        slug: "olympic-qualification-race-heats-up",
      },
      ar: {
        title: "سباق التأهل الأولمبي يشتعل عبر ثلاث قارات",
        excerpt:
          "المقاعد الأخيرة تنتج ليالٍ درامية بينما تدفع الاتحادات بزخم إرث باريس.",
        content: `<p>مع بقاء عدد قليل من فعاليات التأهل الأولمبي، تتعامل الاتحادات الوطنية مع كل منافسة متبقية كأنها نهائي.</p>
<p>في ألعاب القوى والسباحة والرياضات القتالية، الضغط شديد بشكل خاص. الرياضيون الذين عاشوا دورة كاملة من أربع سنوات يعلمون أن ليلة سيئة واحدة قد تنهي الحلم.</p>`,
        slug: "سباق-التأهل-الاولمبي",
      },
    },
    category: sports,
    author: sara,
    coverImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: false,
    isTrending: true,
    isBreaking: false,
    views: 6540,
    publishedAt: "2026-08-29T08:45:00Z",
    readingTime: 3,
    tags: ["olympics", "qualification"],
  },
  {
    id: "art-5",
    translations: {
      en: {
        title: "Transfer Window Closes with Record Spending in Three Leagues",
        excerpt:
          "Premier League, Saudi Pro League and Serie A rewrite the summer ledger again.",
        content: `<p>Another summer of extraordinary spending has closed. Three leagues in particular reshaped the market: the Premier League continued its domestic arms race, the Saudi Pro League secured several marquee names, and Serie A surprised with targeted high-value arrivals.</p>`,
        slug: "transfer-window-record-spending",
      },
      ar: {
        title: "نافذة الانتقالات تُغلق بإنفاق قياسي في ثلاث دوريات",
        excerpt:
          "الدوري الإنجليزي والدوري السعودي والدوري الإيطالي يعيدون كتابة دفتر الصيف مجدداً.",
        content: `<p>أُغلق صيف آخر من الإنفاق الاستثنائي. ثلاثة دوريات على وجه الخصوص أعادت تشكيل السوق: واصل الدوري الإنجليزي سباق التسلح المحلي، وأمّن الدوري السعودي عدة أسماء كبيرة، وأدهش الدوري الإيطالي بصفقات مستهدفة عالية القيمة.</p>`,
        slug: "نافذة-الانتقالات-إنفاق-قياسي",
      },
    },
    category: football,
    author: omar,
    coverImage:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: false,
    isTrending: true,
    isBreaking: false,
    views: 11200,
    publishedAt: "2026-08-28T19:20:00Z",
    readingTime: 4,
    tags: ["transfers", "premier-league"],
  },
  {
    id: "art-6",
    translations: {
      en: {
        title: "Open-Source Models Close Gap on Closed AI Systems",
        excerpt:
          "New benchmarks show open weights matching proprietary performance on key reasoning tasks.",
        content: `<p>A fresh round of independent evaluations suggests that leading open-weight models are now within striking distance of the best closed systems on several reasoning and coding benchmarks.</p>
<p>The implications for enterprises are significant: more organisations may choose to run capable models on their own infrastructure rather than rely exclusively on API providers.</p>`,
        slug: "open-source-models-close-gap-ai",
      },
      ar: {
        title: "النماذج مفتوحة المصدر تضيّق الفجوة مع أنظمة الذكاء الاصطناعي المغلقة",
        excerpt:
          "معايير جديدة تُظهر أوزاناً مفتوحة تطابق أداء الأنظمة الخاصة في مهام استدلال رئيسية.",
        content: `<p>تشير جولة جديدة من التقييمات المستقلة إلى أن أبرز النماذج ذات الأوزان المفتوحة باتت قريبة جداً من أفضل الأنظمة المغلقة في عدة معايير للاستدلال والبرمجة.</p>
<p>التداعيات على المؤسسات كبيرة: قد تختار المزيد من المنظمات تشغيل نماذج قادرة على بنيتها التحتية الخاصة بدلاً من الاعتماد حصرياً على مزودي واجهات البرمجة.</p>`,
        slug: "نماذج-مفتوحة-المصدر-الذكاء-الاصطناعي",
      },
    },
    category: technology,
    author: james,
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    views: 5430,
    publishedAt: "2026-08-28T10:00:00Z",
    readingTime: 5,
    tags: ["open-source", "ai", "models"],
  },
  {
    id: "art-7",
    translations: {
      en: {
        title: "Regional Stock Markets Eye Record Highs on Energy Rebound",
        excerpt:
          "Energy and financials lead gains as commodity prices stabilise after a volatile quarter.",
        content: `<p>Regional equity markets are approaching multi-year highs, driven by a rebound in energy prices and renewed interest in financial stocks.</p>`,
        slug: "regional-stocks-energy-rebound",
      },
      ar: {
        title: "أسواق الأسهم الإقليمية تترقب مستويات قياسية مع انتعاش الطاقة",
        excerpt:
          "الطاقة والمالية تقودان المكاسب مع استقرار أسعار السلع بعد ربع متقلب.",
        content: `<p>تقترب أسواق الأسهم الإقليمية من مستويات قياسية متعددة السنوات، مدفوعة بانتعاش أسعار الطاقة وتجدد الاهتمام بأسهم القطاع المالي.</p>`,
        slug: "أسواق-الأسهم-وانتعاش-الطاقة",
      },
    },
    category: business,
    author: layla,
    coverImage:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    views: 4210,
    publishedAt: "2026-08-27T15:40:00Z",
    readingTime: 3,
    tags: ["markets", "energy"],
  },
  {
    id: "art-8",
    translations: {
      en: {
        title: "National Team Camp Begins with Fresh Faces and New Formation",
        excerpt:
          "Coach experiments with a fluid 3-4-3 as key veterans recover from injury.",
        content: `<p>The national team’s latest training camp opened with several uncapped players and a clear tactical experiment: a more fluid 3-4-3 that aims to overload wide areas.</p>`,
        slug: "national-team-camp-new-formation",
      },
      ar: {
        title: "معسكر المنتخب يبدأ بوجوه جديدة وتشكيلة مستحدثة",
        excerpt:
          "المدرب يجرب 3-4-3 مرنة بينما يتعافى نجوم أساسيون من الإصابات.",
        content: `<p>افتتح أحدث معسكر للمنتخب الوطني بوجود لاعبين عدة بلا مشاركات دولية وتجربة تكتيكية واضحة: تشكيلة 3-4-3 أكثر مرونة تهدف إلى زيادة العدد في المناطق الجانبية.</p>`,
        slug: "معسكر-المنتخب-تشكيلة-جديدة",
      },
    },
    category: football,
    author: sara,
    coverImage:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: false,
    isTrending: false,
    isBreaking: true,
    views: 9870,
    publishedAt: "2026-08-31T07:10:00Z",
    readingTime: 3,
    tags: ["national-team", "tactics"],
  },
  {
    id: "art-9",
    translations: {
      en: {
        title: "Climate Tech Funding Rebounds After Two Quiet Quarters",
        excerpt:
          "Investors return to grid, storage and industrial decarbonisation plays.",
        content: `<p>After a subdued first half of the year, climate technology startups are seeing renewed investor interest, particularly in grid infrastructure, long-duration storage and hard-to-abate industrial sectors.</p>`,
        slug: "climate-tech-funding-rebounds",
      },
      ar: {
        title: "تمويل تقنيات المناخ ينتعش بعد ربعين هادئين",
        excerpt:
          "المستثمرون يعودون إلى مشاريع الشبكة والتخزين وإزالة الكربون الصناعي.",
        content: `<p>بعد نصف عام هادئ، تشهد الشركات الناشئة في تقنيات المناخ اهتماماً متجدداً من المستثمرين، خاصة في بنية الشبكة والتخزين طويل الأمد والقطاعات الصناعية صعبة الانبعاثات.</p>`,
        slug: "تمويل-تقنيات-المناخ",
      },
    },
    category: technology,
    author: nadia,
    coverImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    views: 3180,
    publishedAt: "2026-08-26T12:00:00Z",
    readingTime: 4,
    tags: ["climate", "funding", "startups"],
  },
  {
    id: "art-10",
    translations: {
      en: {
        title: "Diplomatic Summit Seeks Path Out of Regional Stalemate",
        excerpt:
          "Envoys emphasise incremental confidence-building over grand bargains.",
        content: `<p>Diplomats gathered for a closed-door summit aimed at reducing tensions, focusing on practical confidence-building measures rather than comprehensive final-status talks.</p>`,
        slug: "diplomatic-summit-regional-stalemate",
      },
      ar: {
        title: "قمة دبلوماسية تبحث مخرجاً من الجمود الإقليمي",
        excerpt:
          "المبعوثون يؤكدون على بناء الثقة التدريجي بدلاً من الصفقات الكبرى.",
        content: `<p>اجتمع دبلوماسيون في قمة مغلقة تهدف إلى خفض التوترات، مع التركيز على إجراءات عملية لبناء الثقة بدلاً من محادثات شاملة حول الوضع النهائي.</p>`,
        slug: "قمة-دبلوماسية-الجمود-الاقليمي",
      },
    },
    category: news,
    author: nadia,
    coverImage:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop",
    status: "published",
    isFeatured: true,
    isTrending: false,
    isBreaking: false,
    views: 7650,
    publishedAt: "2026-08-30T09:00:00Z",
    readingTime: 5,
    tags: ["diplomacy", "region"],
  },
];

export function getArticleBySlug(slug: string, locale: "en" | "ar" = "en"): Article | undefined {
  return articles.find((a) => a.translations[locale].slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category.slug === categorySlug && a.status === "published");
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.isFeatured && a.status === "published");
}

export function getTrendingArticles(): Article[] {
  return articles
    .filter((a) => a.isTrending && a.status === "published")
    .sort((a, b) => b.views - a.views);
}

export function getBreakingArticles(): Article[] {
  return articles.filter((a) => a.isBreaking && a.status === "published");
}

export function getLatestArticles(limit = 12): Article[] {
  return [...articles]
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function searchArticles(query: string, locale: "en" | "ar" = "en"): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return articles.filter((a) => {
    const t = a.translations[locale];
    return (
      t.title.toLowerCase().includes(q) ||
      t.excerpt.toLowerCase().includes(q) ||
      a.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}
