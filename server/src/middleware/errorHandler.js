import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";

export function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  // Zod validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal server error";

  if (!env.isProd && !err.isOperational) {
    console.error(err);
  }

  return res.status(status).json({
    success: false,
    message,
    ...(err.errors ? { errors: err.errors } : {}),
    ...(!env.isProd && !err.isOperational ? { stack: err.stack } : {}),
  });
}
