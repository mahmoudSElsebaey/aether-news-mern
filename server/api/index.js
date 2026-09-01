/**
 * Vercel Serverless entry for Express.
 * Project root for the API deployment should be the `server` folder.
 */
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error("[api] DB connection failed", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        message: "Database connection failed",
        detail: err?.message || String(err),
      })
    );
    return;
  }

  return app(req, res);
}

export default handler;
