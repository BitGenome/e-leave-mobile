import { defineConfig } from "drizzle-kit";
import { type Config } from "drizzle-kit";

export default defineConfig({
  schema: "./api/database/schema.ts",
  dialect: "sqlite",
  driver: "expo",
  migrations: {
    prefix: "supabase",
  },
}) satisfies Config;
