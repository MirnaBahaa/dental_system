import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Add project-specific proxy logic here:
  // - Trailing slash redirects
  // - www / non-www normalization
  // - Geo-based redirects
  // - Auth guards

  return NextResponse.next();
}

export const config = {
  // Skip proxy for static assets and API routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api).*)"]
};
