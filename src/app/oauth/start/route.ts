import { NextRequest, NextResponse } from "next/server"
import { getCoreorIdUrl, sanitizeNextPath } from "@/lib/coreor-auth"

export async function GET(req: NextRequest) {
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const redirectUri = process.env.COREOR_OAUTH_REDIRECT_URI

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "Missing OAuth environment variables" }, { status: 500 })
  }

  const state = crypto.randomUUID()
  const nextPath = sanitizeNextPath(req.nextUrl.searchParams.get("next"))
  const authorizeUrl = new URL("/oauth/authorize", getCoreorIdUrl())

  authorizeUrl.searchParams.set("client_id", clientId)
  authorizeUrl.searchParams.set("redirect_uri", redirectUri)
  authorizeUrl.searchParams.set("response_type", "code")
  authorizeUrl.searchParams.set("scope", process.env.COREOR_OAUTH_SCOPE || "profile email teams")
  authorizeUrl.searchParams.set("state", state)

  const response = NextResponse.redirect(authorizeUrl)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  }

  response.cookies.set("coreor_oauth_state", state, cookieOptions)
  response.cookies.set("coreor_oauth_next", nextPath, cookieOptions)
  return response
}
