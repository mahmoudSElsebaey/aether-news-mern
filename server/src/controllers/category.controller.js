import * as categoryService from "../services/category.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success, created } from "../utils/response.js";

export const list = asyncHandler(async (req, res) => {
  const activeOnly = req.query.all !== "true";
  const categories = await categoryService.listCategories({ activeOnly });
  return success(res, categories);
});

export const getBySlug = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);
  return success(res, category);
});

export const create = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return created(res, category);
});

export const update = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  return success(res, category);
});

export const remove = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  return success(res, { message: "Category deleted" });
});
