import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import { validate } from "../middleware/validate.js";
import { protect, authorize } from "../middleware/auth.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

const router = Router();

router.get("/", categoryController.list);
router.get("/:slug", categoryController.getBySlug);

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createCategorySchema),
  categoryController.create
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateCategorySchema),
  categoryController.update
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  categoryController.remove
);

export default router;
