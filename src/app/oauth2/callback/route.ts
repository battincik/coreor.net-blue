import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const redirectUrl = new URL(`/oauth/callback${req.nextUrl.search}`, req.url)
  return NextResponse.redirect(redirectUrl)
}
