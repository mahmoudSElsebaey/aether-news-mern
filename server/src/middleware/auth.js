import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

function extractToken(req) {
  // Prefer Authorization header (localStorage) over cookie — avoids stale cookies
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }
  if (req.cookies?.token) {
    return req.cookies.token;
  }
  return null;
}

export const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    throw new ApiError(401, "Not authenticated");
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }

  const userId = decoded.id || decoded._id;
  if (!userId) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(String(userId));
  if (!user || !user.isActive) {
    throw new ApiError(401, "User not found or inactive");
  }

  req.user = user;
  next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(String(decoded.id || decoded._id));
    if (user?.isActive) req.user = user;
  } catch {
    // ignore
  }
  next();
});

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "Not authorized for this action"));
  }
  next();
};
