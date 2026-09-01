import mongoose from "mongoose";
import { env } from "./env.js";

let connecting = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connecting) return connecting;

  mongoose.set("strictQuery", true);

  connecting = mongoose
    .connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })
    .then((conn) => {
      console.log(`[db] Connected: ${conn.connection.name}`);
      connecting = null;
      return conn.connection;
    })
    .catch((err) => {
      connecting = null;
      throw err;
    });

  return connecting;
}
