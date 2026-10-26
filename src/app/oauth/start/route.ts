import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const nextPath = req.nextUrl.searchParams.get("next") || "/admin/contact"
  const idBase = (process.env.COREOR_ID_BASE || "https://id.coreor.net").replace(/\/$/, "")
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID || "coreor"
  const redirectUri = process.env.COREOR_OAUTH_REDIRECT_URI
  const scope = process.env.COREOR_OAUTH_SCOPE || "profile email"

  if (!redirectUri) {
    return NextResponse.json({ error: "Missing COREOR_OAUTH_REDIRECT_URI" }, { status: 500 })
  }

  const state = crypto.randomUUID()
  const authorizeUrl = new URL("/oauth/authorize", idBase)
  authorizeUrl.searchParams.set("client_id", clientId)
  authorizeUrl.searchParams.set("redirect_uri", redirectUri)
  authorizeUrl.searchParams.set("response_type", "code")
  authorizeUrl.searchParams.set("scope", scope)
  authorizeUrl.searchParams.set("state", state)

  const response = NextResponse.redirect(authorizeUrl)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }

  response.cookies.set("coreor_oauth_state", state, cookieOptions)
  response.cookies.set("coreor_oauth_next", nextPath, cookieOptions)
  return response
}
