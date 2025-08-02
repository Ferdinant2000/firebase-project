import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("firebaseToken")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
