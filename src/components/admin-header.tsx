"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Mail } from "lucide-react"

type AdminSessionState = {
  signedIn: boolean
  hasAdminAccess: boolean
  identity: string | null
}

export function AdminHeader() {
  const [sessionLoading, setSessionLoading] = useState(true)
  const [session, setSession] = useState<AdminSessionState>({
    signedIn: false,
    hasAdminAccess: false,
    identity: null,
  })

  useEffect(() => {
    let cancelled = false

    const loadSession = async () => {
      try {
        const response = await fetch("/api/admin/session", {
          headers: {
            Accept: "application/json",
          },
        })

        const json = await response.json()
        if (cancelled) return

        setSession({
          signedIn: Boolean(json?.signedIn),
          hasAdminAccess: Boolean(json?.hasAdminAccess),
          identity: typeof json?.identity === "string" && json.identity.trim() ? json.identity : null,
        })
      } catch {
        if (cancelled) return
        setSession({ signedIn: false, hasAdminAccess: false, identity: null })
      } finally {
        if (!cancelled) setSessionLoading(false)
      }
    }

    void loadSession()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-4 lg:px-6">
        <Link href="/admin/contact" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">Admin Area</p>
            <p className="text-xs text-muted-foreground">Coreor internal dashboard</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
              sessionLoading
                ? "border-border/60 bg-muted/20 text-muted-foreground"
                : session.signedIn
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "border-border/60 bg-muted/20 text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                sessionLoading
                  ? "bg-muted-foreground"
                  : session.signedIn
                    ? "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
                    : "bg-muted-foreground",
              )}
            />
            {sessionLoading ? "Checking session..." : session.signedIn ? "Signed in" : "Session unknown"}
          </Badge>

          {session.signedIn ? (
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground">
              <span>{session.hasAdminAccess ? "Admin access granted" : "Admin access limited"}</span>
              {session.identity ? <span className="text-foreground/80">{session.identity}</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}