import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }
  const session = request.cookies.get("admin_session")?.value;
  if (!process.env.ADMIN_TOKEN || session !== process.env.ADMIN_TOKEN) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
