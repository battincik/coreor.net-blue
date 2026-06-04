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

  if (!apiBase || !clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing OAuth environment variables" }, { status: 500 })
  }

  const tokenCandidates = [
    process.env.COREOR_OAUTH_TOKEN_URL,
    `${apiBase}/v2/oauth2/token`,
    `${apiBase}/oauth2/token`,
    "https://account.coreor.net/oauth2/token",
  ].filter((value, index, arr): value is string => Boolean(value) && arr.indexOf(value) === index)

  let tokenData: any = null
  let tokenError: Record<string, unknown> | null = null

  for (const endpoint of tokenCandidates) {
    const tokenRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      cache: "no-store",
    })

    const contentType = tokenRes.headers.get("content-type") || ""
    const rawBody = await tokenRes.text()

    if (!contentType.includes("application/json")) {
      tokenError = {
        error: "Token endpoint returned non-JSON response",
        status: tokenRes.status,
        endpoint,
        contentType,
        responsePreview: rawBody.slice(0, 300),
      }
      if (tokenRes.status === 404) continue
      return NextResponse.json(tokenError, { status: 502 })
    }

    let parsed: any = null
    try {
      parsed = JSON.parse(rawBody)
    } catch {
      tokenError = {
        error: "Token endpoint returned invalid JSON",
        status: tokenRes.status,
        endpoint,
        responsePreview: rawBody.slice(0, 300),
      }
      if (tokenRes.status === 404) continue
      return NextResponse.json(tokenError, { status: 502 })
    }

    if (parsed?.status === "success" && parsed?.access_token) {
      tokenData = parsed
      break
    }

    tokenError = {
      error: parsed?.message || "Token exchange failed",
      status: tokenRes.status,
      endpoint,
      responsePreview: rawBody.slice(0, 300),
    }

    if (tokenRes.status === 404) continue
    return NextResponse.json(tokenError, { status: 400 })
  }

  if (!tokenData) {
    return NextResponse.json(
      tokenError || {
        error: "Token exchange failed on all known endpoints",
        triedEndpoints: tokenCandidates,
      },
      { status: 502 },
    )
  }

  if (tokenData.status !== "success" || !tokenData.access_token) {
    return NextResponse.json({ error: tokenData.message || "Token exchange failed" }, { status: 400 })
  }

  // Validate authorization on API side instead of relying on local state cookie checks.
  const authCheckRes = await fetch(`${apiBase}/v2/oauth2/check-authorization`, {
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
  let authCheckData: any = null

  if (authCheckType.includes("application/json")) {
    try {
      authCheckData = JSON.parse(authCheckRaw)
    } catch {
      return NextResponse.json(
        {
          error: "Authorization check returned invalid JSON",
          status: authCheckRes.status,
          endpoint: `${apiBase}/v2/oauth2/check-authorization`,
          responsePreview: authCheckRaw.slice(0, 300),
        },
        { status: 502 },
      )
    }
  } else {
    return NextResponse.json(
      {
        error: "Authorization check returned non-JSON response",
        status: authCheckRes.status,
        endpoint: `${apiBase}/v2/oauth2/check-authorization`,
        contentType: authCheckType,
        responsePreview: authCheckRaw.slice(0, 300),
      },
      { status: 502 },
    )
  }

  if (authCheckData.status !== "success" || authCheckData.authorized !== true) {
    return NextResponse.json(
      { error: authCheckData.message || "Authorization verification failed" },
      { status: 401 },
    )
  }

  const response = NextResponse.redirect(new URL(nextPath, req.url))
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }

  response.cookies.set("coreor_access_token", tokenData.access_token, cookieOptions)
  response.cookies.set("coreor_refresh_token", tokenData.refresh_token, cookieOptions)
  response.cookies.delete("coreor_oauth_state")
  response.cookies.delete("coreor_oauth_next")

  return response
}
