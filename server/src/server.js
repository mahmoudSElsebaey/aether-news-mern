import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

async function boot() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`[server] Delta News API on http://localhost:${env.port}`);
  });
}

boot().catch((err) => {
  console.error("[server] Failed to start", err);
  process.exit(1);
});
