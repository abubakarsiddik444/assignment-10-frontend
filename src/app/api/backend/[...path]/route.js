import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createBackendToken } from "@/lib/backend-user";

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
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
