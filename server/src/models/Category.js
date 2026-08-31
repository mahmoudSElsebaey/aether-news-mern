import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    slug: { type: String, required: true, trim: true, lowercase: true },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    translations: {
      en: { type: translationSchema, required: true },
      ar: { type: translationSchema, required: true },
    },
    /** Canonical slug used in API routes (usually English) */
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ "translations.en.slug": 1 });
categorySchema.index({ "translations.ar.slug": 1 });

export const Category = mongoose.model("Category", categorySchema);
