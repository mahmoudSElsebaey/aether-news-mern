import * as articleService from "../services/article.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success, created } from "../utils/response.js";

export const list = asyncHandler(async (req, res) => {
  const query = req.validatedQuery || req.query;
  const result = await articleService.listArticles(query);
  return success(res, result.items, result.meta);
});

export const getBySlug = asyncHandler(async (req, res) => {
  const article = await articleService.getArticleBySlug(req.params.slug, {
    incrementViews: true,
  });
  return success(res, article);
});

export const getById = asyncHandler(async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);
  return success(res, article);
});

export const create = asyncHandler(async (req, res) => {
  const article = await articleService.createArticle(req.body, req.user._id);
  return created(res, article);
});

export const update = asyncHandler(async (req, res) => {
  const article = await articleService.updateArticle(req.params.id, req.body);
  return success(res, article);
});

export const remove = asyncHandler(async (req, res) => {
  await articleService.deleteArticle(req.params.id);
  return success(res, { message: "Article deleted" });
});
