import mongoose from "mongoose";

const articleTranslationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 220 },
    excerpt: { type: String, default: "", maxlength: 500 },
    content: { type: String, default: "" },
    slug: { type: String, required: true, trim: true, lowercase: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    translations: {
      en: { type: articleTranslationSchema, required: true },
      ar: { type: articleTranslationSchema, required: true },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
      index: true,
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isBreaking: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null, index: true },
    scheduledAt: { type: Date, default: null },
    readingTime: { type: Number, default: 1 },
    tags: [{ type: String, trim: true, lowercase: true }],
  },
  { timestamps: true }
);

articleSchema.index({ "translations.en.slug": 1 }, { unique: true });
articleSchema.index({ "translations.ar.slug": 1 }, { unique: true });
articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ category: 1, status: 1, publishedAt: -1 });
articleSchema.index({
  "translations.en.title": "text",
  "translations.en.excerpt": "text",
  "translations.ar.title": "text",
  "translations.ar.excerpt": "text",
  tags: "text",
});

/** Estimate reading time from English content (fallback) */
articleSchema.pre("save", function estimateReadingTime() {
  const text =
    this.translations?.en?.content || this.translations?.ar?.content || "";
  const words = text.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  this.readingTime = Math.max(1, Math.ceil(words / 200));
});

export const Article = mongoose.model("Article", articleSchema);
