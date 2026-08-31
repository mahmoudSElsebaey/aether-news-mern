import { Router } from "express";
import * as articleController from "../controllers/article.controller.js";
import { validate } from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";
import {
  createArticleSchema,
  updateArticleSchema,
  articleQuerySchema,
} from "../validations/article.validation.js";

const router = Router();

router.get("/", validate(articleQuerySchema, "query"), articleController.list);
router.get("/id/:id", articleController.getById);
router.get("/:slug", articleController.getBySlug);

router.post(
  "/",
  protect,
  authorize("editor", "admin"),
  validate(createArticleSchema),
  articleController.create
);

router.patch(
  "/:id",
  protect,
  authorize("editor", "admin"),
  validate(updateArticleSchema),
  articleController.update
);

router.delete(
  "/:id",
  protect,
  authorize("editor", "admin"),
  articleController.remove
);

export default router;
