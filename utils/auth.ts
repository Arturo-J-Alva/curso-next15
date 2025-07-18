"server-only"

import { cookies } from "next/headers"

import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.SESSION_SECRET

if (!secretKey && process.env.NODE_ENV !== "development") {
  throw new Error("[session]: please set a valid value for SESSION_SECRET")
}

const encodedSecretKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
  userId: string
}

export async function encrypt(
  payload: SessionPayload,
  expirationTime?: number | string | Date,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime ?? "7d")
    .sign(encodedSecretKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedSecretKey, {
      algorithms: ["HS256"],//HS256 is based on SHA256, but adds authentication 
    })                      //functionality through the use of a shared secret key.

    return payload
  } catch (error) {
    console.log("Failed to verify session", error)
  }
}

export const COOKIE_NAME = "__session__"

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
  const session = await encrypt({ userId }, "7d")
  const _cookies = await cookies()

  _cookies.set(COOKIE_NAME, session, {
    httpOnly: true, // This flag helps mitigate the risk of client-side script accessing the protected cookie
    secure: true, // Use secure cookies in production, but in localhost it will be false
    expires: expiresAt, // Set the cookie to expire in 7 days
    sameSite: "lax", // Helps protect against CSRF attacks
    // lax: Cookies are sent with same-site requests and cross-origin GET requests
    // strict: Cookies are only sent in a first-party context (same site),
    // This means that only our domain can access cookies, not any subdomains we own or other domains. 
    // If you need to share between domains and subdomains, use "lax"
    // none: Cookies are sent in all contexts, i.e. sending cross-origin is allowed
    path: "/", // The cookie will be sent to the server for all requests to this path
  })
}

export async function deleteSession() {
  const _cookies = await cookies()
  _cookies.delete(COOKIE_NAME)
}

export async function isSessionValid(
  cookieValue: string | undefined | null,
): Promise<boolean> {
  if (!cookieValue) {
    return false
  }

  const session = await decrypt(cookieValue)

  return Boolean(session)
}
