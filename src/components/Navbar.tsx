import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNav, type Page } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const navLinks: { label: string; page: Page }[] = [
  { label: "About", page: "about" },
  { label: "Works", page: "works" },
  { label: "Careers", page: "careers" },
  { label: "Contact", page: "contact" },
]

export function Navbar() {
  const { currentPage, navigate } = useNav()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleNav = (page: Page) => {
    navigate(page)
    setMobileOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-lg border border-primary/40 group-hover:border-primary/70 transition-colors animate-glow-border" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Coreor
          </span>
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">.net</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                currentPage === page
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => handleNav("careers")}
            className="btn-glow bg-primary text-primary-foreground font-semibold"
          >
            Join Coreor
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/50 px-6 py-4 flex flex-col gap-2">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={cn(
                "w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-all",
                currentPage === page
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {label}
            </button>
          ))}
          <Button
            onClick={() => handleNav("careers")}
            className="w-full mt-2 bg-primary text-primary-foreground font-semibold"
          >
            Join Coreor
          </Button>
        </div>
      )}
    </header>
  )
}
