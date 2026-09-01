import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signToken(payload) {
  // Always stringify Mongo ids so verify + findById stay reliable
  const safe = {
    ...payload,
    id: payload.id != null ? String(payload.id) : payload.id,
  };
  return jwt.sign(safe, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

export function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.isProd ? "none" : "lax",
    path: "/",
  });
}
