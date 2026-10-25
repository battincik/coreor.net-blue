import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")
  const nextPath = req.cookies.get("coreor_oauth_next")?.value || "/admin/contact"

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 })
  }

  const apiBase = process.env.COREOR_API_BASE
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const clientSecret = process.env.COREOR_OAUTH_CLIENT_SECRET
  const redirectUri = process.env.COREOR_OAUTH_REDIRECT_URI

  if (!apiBase || !clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: "Missing OAuth environment variables" }, { status: 500 })
  }

  const tokenEndpoint = process.env.COREOR_OAUTH_TOKEN_URL || `${apiBase}/oauth2/token`
  const tokenRes = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  })

  const contentType = tokenRes.headers.get("content-type") || ""
  const rawBody = await tokenRes.text()
  if (!contentType.includes("application/json")) {
    return NextResponse.json({
      error: "Token endpoint returned non-JSON response",
      status: tokenRes.status,
      endpoint: tokenEndpoint,
      contentType,
      responsePreview: rawBody.slice(0, 300),
    }, { status: 502 })
  }

  let tokenData: any
  try {
    tokenData = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({
      error: "Token endpoint returned invalid JSON",
      status: tokenRes.status,
      endpoint: tokenEndpoint,
      responsePreview: rawBody.slice(0, 300),
    }, { status: 502 })
  }

  if (!tokenRes.ok || tokenData.status !== "success" || !tokenData.access_token) {
    return NextResponse.json({ error: tokenData.message || "Token exchange failed" }, { status: 400 })
  }

  const authCheckEndpoint = `${apiBase}/oauth2/check-authorization`
  const authCheckRes = await fetch(authCheckEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.access_token}`,
    },
    body: JSON.stringify({ client_id: clientId }),
    cache: "no-store",
  })

  const authCheckType = authCheckRes.headers.get("content-type") || ""
  const authCheckRaw = await authCheckRes.text()
  if (!authCheckType.includes("application/json")) {
    return NextResponse.json({
      error: "Authorization check returned non-JSON response",
      status: authCheckRes.status,
      endpoint: authCheckEndpoint,
      contentType: authCheckType,
      responsePreview: authCheckRaw.slice(0, 300),
    }, { status: 502 })
  }

  let authCheckData: any
  try {
    authCheckData = JSON.parse(authCheckRaw)
  } catch {
    return NextResponse.json({
      error: "Authorization check returned invalid JSON",
      status: authCheckRes.status,
      endpoint: authCheckEndpoint,
      responsePreview: authCheckRaw.slice(0, 300),
    }, { status: 502 })
  }

  if (authCheckData.status !== "success" || authCheckData.authorized !== true) {
    return NextResponse.json({ error: authCheckData.message || "Authorization verification failed" }, { status: 401 })
  }

  const response = NextResponse.redirect(new URL(nextPath, req.url))
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }

  response.cookies.set("coreor_access_token", tokenData.access_token, cookieOptions)
  if (tokenData.refresh_token) response.cookies.set("coreor_refresh_token", tokenData.refresh_token, cookieOptions)
  response.cookies.delete("coreor_oauth_state")
  response.cookies.delete("coreor_oauth_next")

  return response
}
