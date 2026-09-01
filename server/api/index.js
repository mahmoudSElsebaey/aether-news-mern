/**
 * Vercel Serverless entry for Express.
 * Root Directory of the Vercel project must be `server`.
 */
import { connectDB } from "../src/config/db.js";

let appPromise;

async function getApp() {
  if (!appPromise) {
    appPromise = import("../src/app.js").then((m) => m.default);
  }
  return appPromise;
}

export default async function handler(req, res) {
  try {
    await connectDB();
    const app = await getApp();
    return app(req, res);
  } catch (err) {
    console.error("[vercel-api] crash", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          message: "Serverless function failed",
          detail: err?.message || String(err),
        })
      );
    }
  }
}
