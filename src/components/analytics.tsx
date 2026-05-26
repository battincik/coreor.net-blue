"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const firstRun = useRef(true)

  useEffect(() => {
    if (!googleAnalyticsId || typeof window.gtag !== "function") return

    const pagePath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname

    if (firstRun.current) {
      firstRun.current = false
      return
    }

    window.gtag("config", googleAnalyticsId, {
      page_path: pagePath,
    })
  }, [pathname, searchParams])

  return null
}
