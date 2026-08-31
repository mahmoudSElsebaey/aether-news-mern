import { Router } from "express";
import { z } from "zod";
import * as bookmarkController from "../controllers/bookmark.controller.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = Router();

const addSchema = z.object({
  articleId: z.string().min(1),
});

router.use(protect);

router.get("/", bookmarkController.list);
router.post("/", validate(addSchema), bookmarkController.add);
router.delete("/:articleId", bookmarkController.remove);

export default router;
