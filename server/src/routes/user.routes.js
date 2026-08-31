import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.use(protect, authorize("admin"));

router.get("/", userController.listUsers);
router.patch("/:id/role", userController.updateRole);

export default router;
