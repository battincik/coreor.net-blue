import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getCoreorAdminSession } from "./src/lib/coreor-auth"

function loginResponse(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const loginUrl = new URL("/login", request.url)
  loginUrl.searchParams.set("next", `${pathname}${search}`)

  const response = NextResponse.redirect(loginUrl)
  response.cookies.delete("coreor_access_token")
  response.cookies.delete("coreor_refresh_token")
  return response
}

function forbiddenResponse(request: NextRequest) {
  return NextResponse.redirect(new URL("/403", request.url))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminApi = pathname.startsWith("/api/admin")
  const accessToken = request.cookies.get("coreor_access_token")?.value

  if (!accessToken) {
    if (isAdminApi) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 })
    }

    return loginResponse(request)
  }

  const session = await getCoreorAdminSession(accessToken)

  if (session.status === "authorized") {
    return NextResponse.next()
  }

  if (session.status === "unauthenticated") {
    if (isAdminApi) {
      const response = NextResponse.json({ error: "unauthenticated" }, { status: 401 })
      response.cookies.delete("coreor_access_token")
      response.cookies.delete("coreor_refresh_token")
      return response
    }

    return loginResponse(request)
  }

  if (session.status === "forbidden") {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "forbidden", requiredPermission: "*" },
        { status: 403 },
      )
    }

    return forbiddenResponse(request)
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "authorization_unavailable" }, { status: 503 })
  }

  return forbiddenResponse(request)
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
