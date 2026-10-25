import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("coreor_refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({ error: "Missing refresh token" }, { status: 401 })
  }

  const apiBase = process.env.COREOR_API_BASE
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const clientSecret = process.env.COREOR_OAUTH_CLIENT_SECRET

  if (!apiBase || !clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing OAuth environment variables" }, { status: 500 })
  }

  const endpoint = process.env.COREOR_OAUTH_TOKEN_URL || `${apiBase}/oauth2/token`
  const refreshRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  })

  const contentType = refreshRes.headers.get("content-type") || ""
  const rawBody = await refreshRes.text()
  if (!contentType.includes("application/json")) {
    return NextResponse.json({
      error: "Token endpoint returned non-JSON response",
      status: refreshRes.status,
      endpoint,
      contentType,
      responsePreview: rawBody.slice(0, 300),
    }, { status: 502 })
  }

  let refreshData: any
  try {
    refreshData = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({
      error: "Token endpoint returned invalid JSON",
      status: refreshRes.status,
      endpoint,
      responsePreview: rawBody.slice(0, 300),
    }, { status: 502 })
  }

  if (!refreshRes.ok || refreshData.status !== "success" || !refreshData.access_token) {
    return NextResponse.json({ error: refreshData.message || "Refresh failed" }, { status: 401 })
  }

  const response = NextResponse.json({ status: "success" })
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }

  response.cookies.set("coreor_access_token", refreshData.access_token, cookieOptions)
  if (refreshData.refresh_token) response.cookies.set("coreor_refresh_token", refreshData.refresh_token, cookieOptions)

  return response
}
