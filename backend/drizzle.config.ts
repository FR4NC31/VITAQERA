import { defineConfig } from "drizzle-kit";

if (!process.env.NEONDB_URL) {
  throw new Error("NEONDB_URL is required");
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEONDB_URL,
  },
});