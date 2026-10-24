import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

function createBackendToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }

  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsignedToken = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({
    userId: user.id,
    email: user.email,
    name: user.name,
    image: user.image || "",
    emailVerified: user.emailVerified === true,
    iat: now,
    exp: now + 60 * 60,
  })}`;
  const signature = createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
}

async function proxyRequest(request, context) {
  const { path } = await context.params;
  const targetPath = path.map(encodeURIComponent).join("/");
  const targetUrl = new URL(
    `/${targetPath}${request.nextUrl.search}`,
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  );
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (session?.user) {
      headers.set("authorization", `Bearer ${createBackendToken(session.user)}`);
    }
  } catch (error) {
    console.error("Could not resolve Better Auth session for API request.", error);
    return NextResponse.json(
      { message: "Could not verify your session. Please sign in again." },
      { status: 401 },
    );
  }

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer();
  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
    },
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
