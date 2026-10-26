import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getCoreorAdminSession } from "@/lib/coreor-auth"

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("coreor_access_token")?.value
  const session = await getCoreorAdminSession(accessToken)

  if (session.status === "authorized") {
    return NextResponse.json({
      signedIn: true,
      hasAdminAccess: true,
      permissions: session.permissions,
      identity: session.identity,
    })
  }

  if (session.status === "forbidden") {
    return NextResponse.json(
      {
        signedIn: true,
        hasAdminAccess: false,
        permissions: session.permissions,
        identity: session.identity,
      },
      { status: 403 },
    )
  }

  if (session.status === "error") {
    return NextResponse.json(
      {
        signedIn: false,
        hasAdminAccess: false,
        permissions: [],
        identity: null,
        error: "authorization_unavailable",
      },
      { status: 503 },
    )
  }

  return NextResponse.json(
    {
      signedIn: false,
      hasAdminAccess: false,
      permissions: [],
      identity: null,
    },
    { status: 401 },
  )
}
