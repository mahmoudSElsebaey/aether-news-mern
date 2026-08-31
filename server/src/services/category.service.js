import slugify from "slugify";
import { Category } from "../models/Category.js";
import { ApiError } from "../utils/ApiError.js";

function makeSlug(text) {
  return slugify(text, { lower: true, strict: true }) || `cat-${Date.now()}`;
}

export async function listCategories({ activeOnly = true } = {}) {
  const filter = activeOnly ? { isActive: true } : {};
  return Category.find(filter).sort({ order: 1, createdAt: 1 }).lean();
}

export async function getCategoryBySlug(slug) {
  const category = await Category.findOne({
    $or: [{ slug }, { "translations.en.slug": slug }, { "translations.ar.slug": slug }],
  });
  if (!category) throw new ApiError(404, "Category not found");
  return category;
}

export async function createCategory(data) {
  const enSlug = data.translations.en.slug || makeSlug(data.translations.en.name);
  const arSlug = data.translations.ar.slug || makeSlug(data.translations.ar.name) + "-ar";
  const canonical = data.slug || enSlug;

  const exists = await Category.findOne({ slug: canonical });
  if (exists) throw new ApiError(409, "Category slug already exists");

  return Category.create({
    ...data,
    slug: canonical,
    translations: {
      en: { ...data.translations.en, slug: enSlug },
      ar: { ...data.translations.ar, slug: arSlug },
    },
  });
}

export async function updateCategory(id, data) {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  if (data.translations) {
    category.translations = {
      en: { ...category.translations.en.toObject(), ...data.translations.en },
      ar: { ...category.translations.ar.toObject(), ...data.translations.ar },
    };
  }
  if (data.slug) category.slug = data.slug;
  if (data.image !== undefined) category.image = data.image;
  if (data.order !== undefined) category.order = data.order;
  if (data.isActive !== undefined) category.isActive = data.isActive;

  await category.save();
  return category;
}

export async function deleteCategory(id) {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");
  return true;
}
