import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/auth") && cookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

}
