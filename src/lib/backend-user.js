import "server-only";

import { createHmac } from "node:crypto";

export function createBackendToken(sessionUser) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }

  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsignedToken = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({
    userId: sessionUser.id,
    email: sessionUser.email,
    name: sessionUser.name,
    image: sessionUser.image || "",
    emailVerified: sessionUser.emailVerified === true,
    iat: now,
    exp: now + 60 * 60,
  })}`;
  const token = `${unsignedToken}.${createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url")}`;
  return token;
}

export async function getBackendUser(sessionUser) {
  const token = createBackendToken(sessionUser);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Could not verify your RecipeHub account role.");
  }

  return data.user;
}
