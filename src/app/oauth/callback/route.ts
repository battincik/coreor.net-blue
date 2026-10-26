import { NextRequest, NextResponse } from "next/server"
import {
  getCoreorAdminSession,
  getCoreorTokenUrl,
  sanitizeNextPath,
} from "@/lib/coreor-auth"

type TokenResponse = {
  status?: string
  access_token?: string
  refresh_token?: string
  expires_in?: number
  message?: string
}

function clearOAuthCookies(response: NextResponse) {
  response.cookies.delete("coreor_oauth_state")
  response.cookies.delete("coreor_oauth_next")
  response.cookies.delete("coreor_user_token")
  return response
}

function oauthError(req: NextRequest, reason: string) {
  return clearOAuthCookies(
    NextResponse.redirect(new URL(`/403?reason=${encodeURIComponent(reason)}`, req.url)),
  )
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")
  const state = req.nextUrl.searchParams.get("state")
  const expectedState = req.cookies.get("coreor_oauth_state")?.value
  const nextPath = sanitizeNextPath(req.cookies.get("coreor_oauth_next")?.value)
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const clientSecret = process.env.COREOR_OAUTH_CLIENT_SECRET
  const redirectUri = process.env.COREOR_OAUTH_REDIRECT_URI

  if (!code || !state || !expectedState || state !== expectedState) {
    return oauthError(req, "invalid_oauth_state")
  }

  if (!clientId || !clientSecret || !redirectUri) {
    return oauthError(req, "oauth_not_configured")
  }

  let tokenResponse: Response

  try {
    tokenResponse = await fetch(getCoreorTokenUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    })
  } catch {
    return oauthError(req, "token_exchange_unavailable")
  }

  const tokenData = (await tokenResponse.json().catch(() => null)) as TokenResponse | null

  if (
    !tokenResponse.ok ||
    tokenData?.status !== "success" ||
    !tokenData.access_token
  ) {
    return oauthError(req, "token_exchange_failed")
  }

  const session = await getCoreorAdminSession(tokenData.access_token)

  if (session.status === "forbidden") {
    return oauthError(req, "missing_wildcard_permission")
  }

  if (session.status === "unauthenticated") {
    return oauthError(req, "identity_verification_failed")
  }

  if (session.status === "error") {
    return oauthError(req, "authorization_unavailable")
  }

  const response = NextResponse.redirect(new URL(nextPath, req.url))
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }
  const expiresIn = Number(tokenData.expires_in)
  const accessMaxAge = Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn : 2592000

  response.cookies.set("coreor_access_token", tokenData.access_token, {
    ...cookieOptions,
    maxAge: accessMaxAge,
  })

  if (tokenData.refresh_token) {
    response.cookies.set("coreor_refresh_token", tokenData.refresh_token, {
      ...cookieOptions,
      maxAge: 2592000,
    })
  }

  return clearOAuthCookies(response)
}
