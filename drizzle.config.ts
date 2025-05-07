import type { Config } from "drizzle-kit";

const DB_NAME = "nextjs_db";

export default {
  schema: "./app/bookmarks/schema.ts",
  out: "./app/bookmarks/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `${process.env.POSTGRESQL_ENDPOINT}/${DB_NAME}`!,
  },
} satisfies Config
