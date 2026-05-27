"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isAdminRoute ? <Navbar /> : null}
      <main className="flex-1">{children}</main>
      {!isAdminRoute ? <Footer /> : null}
    </div>
  )
}
