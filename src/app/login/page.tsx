import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Admin Login",
  description: "Secure OAuth sign-in for Coreor admin pages.",
  path: "/login",
  pageType: "content",
  noIndex: true,
})

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const nextPath = params.next || "/admin/contact"
  const oauthStartHref = `/oauth/start?next=${encodeURIComponent(nextPath)}`

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-10">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Card className="relative w-full max-w-xl border-border/60 bg-card/90 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Sign In</CardTitle>
          <CardDescription>
            Continue with Coreor OAuth2 to access admin pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full btn-glow bg-primary text-primary-foreground font-semibold">
            <a href={oauthStartHref}>Continue with Coreor</a>
          </Button>
          <p className="text-xs text-muted-foreground leading-6">
            This flow expects your Coreor user session cookie 
            <span className="font-semibold"> coreor_user_token</span> to be available.
            If you do not have one yet, sign in on the Coreor auth domain first.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
