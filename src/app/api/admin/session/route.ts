import { cookies } from "next/headers"
import { NextResponse } from "next/server"

type UserTokenResponse = {
  status?: string
  data?: {
    permissions?: string[]
    username?: string
    email?: string
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("coreor_access_token")?.value
  const apiBase = process.env.COREOR_API_BASE

  if (!accessToken || !apiBase) {
    return NextResponse.json({ signedIn: false, hasAdminAccess: false, permissions: [] })
  }

  try {
    const response = await fetch(`${apiBase}/v1/users/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
      cache: "no-store",
    })

    const json = (await response.json().catch(() => null)) as UserTokenResponse | null
    const permissions = Array.isArray(json?.data?.permissions) ? json?.data?.permissions : []
    const signedIn = json?.status === "success"
    const hasAdminAccess = permissions.includes("*")

    return NextResponse.json({
      signedIn,
      hasAdminAccess,
      permissions,
      identity: json?.data?.username ?? json?.data?.email ?? null,
    })
  } catch {
    return NextResponse.json({ signedIn: false, hasAdminAccess: false, permissions: [] })
  }
}