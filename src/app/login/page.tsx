import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { buildSiteMetadata } from "@/lib/seo"
import { sanitizeNextPath } from "@/lib/coreor-auth"

export const metadata: Metadata = buildSiteMetadata({
  title: "Admin Login",
  description: "Secure sign-in for Coreor admin pages through Coreor ID.",
  path: "/login",
  pageType: "content",
  noIndex: true,
})

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const nextPath = sanitizeNextPath(params.next)
  redirect(`/oauth/start?next=${encodeURIComponent(nextPath)}`)
}
