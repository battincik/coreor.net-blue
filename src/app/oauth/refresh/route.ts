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

  const tokenCandidates = [
    process.env.COREOR_OAUTH_TOKEN_URL,
    `${apiBase}/v2/oauth2/token`,
    `${apiBase}/oauth2/token`,
    "https://account.coreor.net/oauth2/token",
  ].filter((value, index, arr): value is string => Boolean(value) && arr.indexOf(value) === index)

  let refreshData: any = null
  let refreshError: Record<string, unknown> | null = null

  for (const endpoint of tokenCandidates) {
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
      refreshError = {
        error: "Token endpoint returned non-JSON response",
        status: refreshRes.status,
        endpoint,
        contentType,
        responsePreview: rawBody.slice(0, 300),
      }
      if (refreshRes.status === 404) continue
      return NextResponse.json(refreshError, { status: 502 })
    }

    let parsed: any = null
    try {
      parsed = JSON.parse(rawBody)
    } catch {
      refreshError = {
        error: "Token endpoint returned invalid JSON",
        status: refreshRes.status,
        endpoint,
        responsePreview: rawBody.slice(0, 300),
      }
      if (refreshRes.status === 404) continue
      return NextResponse.json(refreshError, { status: 502 })
    }

    if (parsed?.status === "success" && parsed?.access_token) {
      refreshData = parsed
      break
    }

    refreshError = {
      error: parsed?.message || "Refresh failed",
      status: refreshRes.status,
      endpoint,
      responsePreview: rawBody.slice(0, 300),
    }

    if (refreshRes.status === 404) continue
    return NextResponse.json(refreshError, { status: 401 })
  }

  if (!refreshData) {
    return NextResponse.json(
      refreshError || {
        error: "Refresh failed on all known endpoints",
        triedEndpoints: tokenCandidates,
      },
      { status: 502 },
    )
  }

  if (refreshData.status !== "success" || !refreshData.access_token) {
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
  response.cookies.set("coreor_refresh_token", refreshData.refresh_token, cookieOptions)

  return response
}
