import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const userToken = req.cookies.get("coreor_user_token")?.value
  const expectedState = req.cookies.get("coreor_oauth_state")?.value
  const { state } = await req.json()

  if (!userToken) {
    return NextResponse.json({ error: "Missing user token" }, { status: 401 })
  }

  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 })
  }

  const apiBase = process.env.COREOR_API_BASE
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const redirectUri = process.env.COREOR_OAUTH_REDIRECT_URI

  if (!apiBase || !clientId || !redirectUri) {
    return NextResponse.json({ error: "Missing OAuth environment variables" }, { status: 500 })
  }

  const authorizeRes = await fetch(`${apiBase}/v2/oauth2/authorize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({
      client_id: clientId,
      approve: true,
      state,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  })

  const authorizeData = await authorizeRes.json()
  if (authorizeData.status === "success" && authorizeData.data?.redirect_uri) {
    return NextResponse.json({ redirect: authorizeData.data.redirect_uri })
  }

  return NextResponse.json({ error: authorizeData.message || "Authorization failed" }, { status: 400 })
}
