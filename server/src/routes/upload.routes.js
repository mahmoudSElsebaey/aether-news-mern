import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";
import { fileURLToPath } from "url";
import { protect, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { success } from "../utils/response.js";
import { cloudinary, hasCloudinary } from "../config/cloudinary.js";
import { env } from "../config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Prefer local uploads dir; on Vercel (read-only) fall back to OS temp */
function resolveUploadDir() {
  const local = path.join(__dirname, "../../uploads");
  try {
    if (!fs.existsSync(local)) fs.mkdirSync(local, { recursive: true });
    fs.accessSync(local, fs.constants.W_OK);
    return local;
  } catch {
    const tmp = path.join(os.tmpdir(), "delta-news-uploads");
    try {
      if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });
    } catch {
      /* ignore */
    }
    return tmp;
  }
}

const uploadDir = resolveUploadDir();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

const router = Router();

router.post(
  "/",
  protect,
  authorize("editor", "admin"),
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "No image uploaded");

    if (hasCloudinary) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: env.cloudinary.folder,
        resource_type: "image",
      });
      fs.unlink(req.file.path, () => {});
      return success(res, {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        provider: "cloudinary",
      });
    }

    const url = `/uploads/${req.file.filename}`;
    return success(res, {
      url,
      filename: req.file.filename,
      provider: "local",
    });
  })
);

router.get(
  "/",
  protect,
  authorize("editor", "admin"),
  asyncHandler(async (req, res) => {
    if (hasCloudinary) {
      try {
        const result = await cloudinary.search
          .expression(`folder:${env.cloudinary.folder}/*`)
          .sort_by("created_at", "desc")
          .max_results(30)
          .execute();

        const items = (result.resources || []).map((r) => ({
          id: r.public_id,
          url: r.secure_url,
          width: r.width,
          height: r.height,
          format: r.format,
          createdAt: r.created_at,
          provider: "cloudinary",
        }));
        return success(res, items, { provider: "cloudinary", total: items.length });
      } catch (err) {
        console.error("[upload] cloudinary list failed", err);
        return success(res, [], { provider: "cloudinary", total: 0 });
      }
    }

    let files = [];
    try {
      files = fs
        .readdirSync(uploadDir)
        .filter((f) => !f.startsWith("."))
        .map((f) => {
          const stat = fs.statSync(path.join(uploadDir, f));
          return {
            id: f,
            url: `/uploads/${f}`,
            createdAt: stat.mtime.toISOString(),
            provider: "local",
          };
        })
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .slice(0, 30);
    } catch {
      files = [];
    }

    return success(res, files, { provider: "local", total: files.length });
  })
);

export default router;
