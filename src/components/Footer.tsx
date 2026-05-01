"use client"

import { Zap, Code as Code2, Briefcase, X, Mail } from "lucide-react"
import Link from "next/link"
import { useNav, type Page } from "@/lib/navigation"
import { Separator } from "@/components/ui/separator"

const services = [
  "Web Development",
  "Mobile Apps",
  "Cloud Solutions",
  "AI Integration",
  "Database Management",
  "Server Hosting",
]

const company: { label: string; page: Page }[] = [
  { label: "About Us", page: "about" },
  { label: "Our Works", page: "works" },
  { label: "Careers", page: "careers" },
  { label: "Contact", page: "contact" },
]

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
]

export function Footer() {
  const { navigate } = useNav()

  return (
    <footer className="bg-card border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => navigate("home")} className="flex items-center gap-2.5 mb-4 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="absolute inset-0 rounded-lg border border-primary/40" />
              </div>
              <span className="text-lg font-bold text-foreground">Coreor<span className="text-muted-foreground text-sm">.net</span></span>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Building the future of software, one line of code at a time. Trusted by companies worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Code2, href: "#" },
                { icon: Briefcase, href: "#" },
                { icon: X, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s}>
                    <Link href={`/services/${encodeURIComponent(s.toLowerCase().replace(/\s+/g, "-") )}`} className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">
                      {s}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {company.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Ankara, Türkiye</p>
              <p>hello@coreor.net</p>
              <p>+90 (312) 911-4815</p>
            </div>
            <div className="mt-5 p-3 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-xs text-muted-foreground mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6 bg-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Coreor.net — All rights reserved.
          </p>
          <div className="flex gap-5">
            {legal.map(({ label, href }) => (
              <Link key={label} href={href as any} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
