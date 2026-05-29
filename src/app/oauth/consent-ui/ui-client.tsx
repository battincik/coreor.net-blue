"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type OAuthConsentClientProps = {
  state: string
}

export default function OAuthConsentClient({ state }: OAuthConsentClientProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const approve = async () => {
    if (!state) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/oauth/consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      })

      const data = await res.json()

      if (!res.ok || !data.redirect) {
        throw new Error(data.error || "Authorization failed")
      }

      window.location.href = data.redirect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authorization failed")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-10">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Card className="relative w-full max-w-xl border-border/60 bg-card/90 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Authorize App</CardTitle>
          <CardDescription>
            This app requests access to your Coreor account to continue to admin pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button
            onClick={approve}
            disabled={!state || loading}
            className="w-full btn-glow bg-primary text-primary-foreground font-semibold"
          >
            {loading ? "Authorizing..." : "Approve and Continue"}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
