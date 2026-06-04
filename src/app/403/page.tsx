import Link from "next/link"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForbiddenPage() {
  return (
    <main className="relative overflow-hidden min-h-[70vh] flex items-center pt-28 pb-24">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 hero-glow" />

      <div className="relative max-w-3xl mx-auto px-6 w-full text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/80 px-6 py-3 text-sm font-semibold tracking-[0.22em] uppercase text-foreground shadow-2xl shadow-cyan-950/20">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <span>403 - Forbidden</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          You do not have <span className="gradient-text">permission</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-10">
          This area is restricted to administrators with wildcard permissions. If you believe this is a mistake,
          ask an admin to grant your account the required access.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="btn-glow bg-primary text-primary-foreground font-semibold">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border/60 bg-card/60">
            <Link href="/login">
              Go to Login
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}