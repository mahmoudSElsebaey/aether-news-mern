import slugify from "slugify";
import { Article } from "../models/Article.js";
import { Category } from "../models/Category.js";
import { ApiError } from "../utils/ApiError.js";

function makeSlug(text) {
  return slugify(text, { lower: true, strict: true, locale: "en" }) || `article-${Date.now()}`;
}

function ensureSlugs(translations) {
  const en = { ...translations.en };
  const ar = { ...translations.ar };
  if (!en.slug) en.slug = makeSlug(en.title);
  if (!ar.slug) ar.slug = makeSlug(ar.title) + "-ar";
  return { en, ar };
}

const populateFields = [
  { path: "category", select: "slug translations image order" },
  { path: "author", select: "name avatar bio preferredLanguage" },
];

export async function listArticles(query) {
  const {
    language = "en",
    category,
    status = "published",
    featured,
    trending,
    breaking,
    search,
    sort = "latest",
    page = 1,
    limit = 12,
  } = query;

  const filter = {};

  if (status !== "all") filter.status = status;
  if (featured === "true") filter.isFeatured = true;
  if (trending === "true") filter.isTrending = true;
  if (breaking === "true") filter.isBreaking = true;

  if (category) {
    const cat = await Category.findOne({
      $or: [{ slug: category }, { "translations.en.slug": category }, { "translations.ar.slug": category }],
    });
    if (cat) filter.category = cat._id;
    else filter.category = null; // force empty
  }

  if (search) {
    filter.$text = { $search: search };
  }

  let sortOption = { publishedAt: -1 };
  if (sort === "popular") sortOption = { views: -1 };
  if (sort === "trending") {
    filter.isTrending = true;
    sortOption = { views: -1 };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Article.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate(populateFields)
      .lean(),
    Article.countDocuments(filter),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      language,
    },
  };
}

export async function getArticleBySlug(slug, { incrementViews = false } = {}) {
  const article = await Article.findOne({
    $or: [{ "translations.en.slug": slug }, { "translations.ar.slug": slug }],
  }).populate(populateFields);

  if (!article) throw new ApiError(404, "Article not found");

  if (incrementViews && article.status === "published") {
    article.views += 1;
    await article.save();
  }

  return article;
}

export async function getArticleById(id) {
  const article = await Article.findById(id).populate(populateFields);
  if (!article) throw new ApiError(404, "Article not found");
  return article;
}

export async function createArticle(data, authorId) {
  const category = await Category.findById(data.category);
  if (!category) throw new ApiError(400, "Invalid category");

  const translations = ensureSlugs(data.translations);

  // uniqueness check
  const clash = await Article.findOne({
    $or: [
      { "translations.en.slug": translations.en.slug },
      { "translations.ar.slug": translations.ar.slug },
    ],
  });
  if (clash) throw new ApiError(409, "Article slug already exists");

  const payload = {
    ...data,
    translations,
    author: authorId,
    publishedAt:
      data.status === "published"
        ? new Date()
        : data.scheduledAt
          ? new Date(data.scheduledAt)
          : null,
  };

  const article = await Article.create(payload);
  return Article.findById(article._id).populate(populateFields);
}

export async function updateArticle(id, data) {
  const article = await Article.findById(id);
  if (!article) throw new ApiError(404, "Article not found");

  if (data.category) {
    const category = await Category.findById(data.category);
    if (!category) throw new ApiError(400, "Invalid category");
    article.category = data.category;
  }

  if (data.translations) {
    const merged = {
      en: { ...article.translations.en.toObject?.() || article.translations.en, ...data.translations.en },
      ar: { ...article.translations.ar.toObject?.() || article.translations.ar, ...data.translations.ar },
    };
    article.translations = ensureSlugs(merged);
  }

  const fields = [
    "coverImage",
    "status",
    "isFeatured",
    "isTrending",
    "isBreaking",
    "tags",
    "scheduledAt",
  ];
  for (const f of fields) {
    if (data[f] !== undefined) article[f] = data[f];
  }

  if (data.status === "published" && !article.publishedAt) {
    article.publishedAt = new Date();
  }

  await article.save();
  return Article.findById(article._id).populate(populateFields);
}

export async function deleteArticle(id) {
  const article = await Article.findByIdAndDelete(id);
  if (!article) throw new ApiError(404, "Article not found");
  return true;
}
