import Link from "next/link"
import { ArrowLeft, Home, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative overflow-hidden pt-28 pb-24 min-h-[70vh] flex items-center">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute left-1/2 top-24 -translate-x-1/2 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 w-full text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/80 px-6 py-3 text-sm font-semibold tracking-[0.22em] uppercase text-foreground shadow-2xl shadow-cyan-950/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>404 - Page not found</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          We could not find <span className="gradient-text">this page</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-10">
          The page may have been moved, renamed, or never existed. Use the buttons below to get back to the main site or search for the service or article you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="btn-glow bg-primary text-primary-foreground font-semibold">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border/60 bg-card/60">
            <Link href="/services">
              <Search className="mr-2 h-4 w-4" />
              Explore Services
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/works">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View Case Studies
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}