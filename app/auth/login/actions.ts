"use server"

import { createSession, deleteSession } from "@/utils/auth";
import { createHash, randomUUID } from "crypto";
import { redirect } from "next/navigation";

// Hash de nuestro secreto usando
// https://hash.online-convert.com/es/generador-sha256
const LOGINSESSIONSECRET = process.env.SESSION_SECRET;
// This login secret should ideally be stored in a users table of a database
// instead of using an environment variable

export async function login(prevState: unknown, data: FormData) {
  const id = randomUUID()
  const hash = createHash("sha256")
  const password = data.get("pwd") as string

  console.log("login", { id, password })

  const hashedPassword = hash.update(password).digest("hex")

  if (hashedPassword !== LOGINSESSIONSECRET) {
    return { error: "Invalid secret" }
  }

  await createSession(id)

  redirect("/auth")
}

export async function logout() {
  deleteSession()
  redirect("/auth")
}
