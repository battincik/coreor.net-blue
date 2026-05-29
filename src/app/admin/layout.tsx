import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Admin",
  description: "Coreor internal admin area.",
  path: "/admin",
  pageType: "content",
  noIndex: true,
})

type AdminLayoutProps = {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("coreor_access_token")?.value

  if (!accessToken) {
    redirect("/login?next=/admin/contact")
  }

  return <>{children}</>
}
