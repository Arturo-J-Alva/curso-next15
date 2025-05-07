import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import dotenv from "dotenv"
import * as schema from "./schema"

dotenv.config()

// Check .env
if (!process.env.POSTGRESQL_ENDPOINT) {
  throw new Error("POSTGRESQL_ENDPOINT env var is not set")
}

const DB_NAME = "nextjs_db";

export const client = postgres(`${process.env.POSTGRESQL_ENDPOINT}/${DB_NAME}`);

export const orm = drizzle(client, {
  schema,
})
