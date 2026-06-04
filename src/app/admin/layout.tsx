import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

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

  const apiBase = process.env.COREOR_API_BASE

  if (!apiBase) {
    redirect("/403")
  }

  const userRes = await fetch(`${apiBase}/v1/users/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
    cache: "no-store",
  })

  const userJson = await userRes.json().catch(() => null)
  const permissions = Array.isArray(userJson?.data?.permissions) ? userJson.data.permissions : []

  if (userJson?.status !== "success") {
    redirect("/login?next=/admin/contact")
  }

  if (!permissions.includes("*")) {
    redirect("/403")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminHeader />
      <div className="relative w-full px-4 pb-6 pt-16 lg:px-6 lg:pt-16">
        <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-85 lg:block">
          <AdminSidebar />
        </aside>
        <main className="min-w-0 lg:ml-85">{children}</main>
      </div>
    </div>
  )
}
