import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    const accessToken = request.cookies.get("coreor_access_token")?.value

    if (!accessToken) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("next", `${pathname}${search}`)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
