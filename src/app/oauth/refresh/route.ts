import { NextRequest, NextResponse } from "next/server"
import { getCoreorAdminSession, getCoreorTokenUrl } from "@/lib/coreor-auth"

type RefreshResponse = {
  status?: string
  access_token?: string
  refresh_token?: string
  expires_in?: number
  message?: string
}

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("coreor_refresh_token")?.value
  const clientId = process.env.COREOR_OAUTH_CLIENT_ID
  const clientSecret = process.env.COREOR_OAUTH_CLIENT_SECRET

  if (!refreshToken) {
    return NextResponse.json({ error: "missing_refresh_token" }, { status: 401 })
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "oauth_not_configured" }, { status: 500 })
  }

  let refreshResponse: Response

  try {
    refreshResponse = await fetch(getCoreorTokenUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      cache: "no-store",
    })
  } catch {
    return NextResponse.json({ error: "refresh_unavailable" }, { status: 503 })
  }

  const refreshData = (await refreshResponse.json().catch(() => null)) as RefreshResponse | null

  if (
    !refreshResponse.ok ||
    refreshData?.status !== "success" ||
    !refreshData.access_token
  ) {
    const response = NextResponse.json({ error: "refresh_failed" }, { status: 401 })
    response.cookies.delete("coreor_access_token")
    response.cookies.delete("coreor_refresh_token")
    return response
  }

  const session = await getCoreorAdminSession(refreshData.access_token)

  if (session.status !== "authorized") {
    const status =
      session.status === "forbidden" ? 403 : session.status === "error" ? 503 : 401
    const response = NextResponse.json(
      {
        error:
          session.status === "forbidden"
            ? "missing_wildcard_permission"
            : session.status === "error"
              ? "authorization_unavailable"
              : "unauthenticated",
      },
      { status },
    )
    response.cookies.delete("coreor_access_token")
    response.cookies.delete("coreor_refresh_token")
    return response
  }

  const response = NextResponse.json({ status: "success" })
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }
  const expiresIn = Number(refreshData.expires_in)
  const accessMaxAge = Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn : 2592000

  response.cookies.set("coreor_access_token", refreshData.access_token, {
    ...cookieOptions,
    maxAge: accessMaxAge,
  })

  if (refreshData.refresh_token) {
    response.cookies.set("coreor_refresh_token", refreshData.refresh_token, {
      ...cookieOptions,
      maxAge: 2592000,
    })
  }

  return response
}
