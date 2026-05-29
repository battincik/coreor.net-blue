import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const userToken = req.cookies.get("coreor_user_token")?.value
  const nextPath = req.nextUrl.searchParams.get("next") || "/admin/contact"
  const externalAuthorizeBase = "https://account.coreor.net/oauth2/authorize"
  const externalClientId = process.env.COREOR_ACCOUNT_CLIENT_ID || "coreor"
  const redirectUri = process.env.COREOR_OAUTH_REDIRECT_URI

  const state = crypto.randomUUID()
  const responseCookies = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }

  if (!userToken) {
    const authorizeUrl = new URL(externalAuthorizeBase)
    authorizeUrl.searchParams.set("client_id", externalClientId)
    if (redirectUri) {
      authorizeUrl.searchParams.set("redirect_uri", redirectUri)
    }
    authorizeUrl.searchParams.set("state", state)

    const redirectResponse = NextResponse.redirect(authorizeUrl)
    redirectResponse.cookies.set("coreor_oauth_state", state, responseCookies)
    redirectResponse.cookies.set("coreor_oauth_next", nextPath, responseCookies)
    return redirectResponse
  }

  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const apiBase = process.env.COREOR_API_BASE
  const apiRedirectUri = process.env.COREOR_OAUTH_REDIRECT_URI

  if (!clientId || !apiBase || !apiRedirectUri) {
    return NextResponse.json({ error: "Missing OAuth environment variables" }, { status: 500 })
  }

  const checkRes = await fetch(`${apiBase}/v2/oauth2/check-authorization`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ client_id: clientId }),
    cache: "no-store",
  })

  const checkData = await checkRes.json()

  if (checkData.status === "success" && checkData.authorized === true) {
    const authorizeRes = await fetch(`${apiBase}/v2/oauth2/authorize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ client_id: clientId, state, redirect_uri: apiRedirectUri }),
      cache: "no-store",
    })

    const authorizeData = await authorizeRes.json()

    if (authorizeData.status === "success" && authorizeData.data?.redirect_uri) {
      const redirectResponse = NextResponse.redirect(authorizeData.data.redirect_uri)
      redirectResponse.cookies.set("coreor_oauth_state", state, responseCookies)
      redirectResponse.cookies.set("coreor_oauth_next", nextPath, responseCookies)
      return redirectResponse
    }

    return NextResponse.json({ error: authorizeData.message || "OAuth authorize failed" }, { status: 400 })
  }

  const consentUrl = new URL(`/oauth/consent-ui?state=${encodeURIComponent(state)}`, req.url)
  const consentResponse = NextResponse.redirect(consentUrl)
  consentResponse.cookies.set("coreor_oauth_state", state, responseCookies)
  consentResponse.cookies.set("coreor_oauth_next", nextPath, responseCookies)
  return consentResponse
}
