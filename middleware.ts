import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!token;

  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/new-appointment") ||
    req.nextUrl.pathname.startsWith("/appointments") ||
    req.nextUrl.pathname.startsWith("/profile");

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
