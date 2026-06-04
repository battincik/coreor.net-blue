"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Mail, LayoutDashboard, Shield, Settings, Boxes, PanelsTopLeft, FileText } from "lucide-react"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contact", label: "Contact Messages", icon: Mail },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/works", label: "Works", icon: PanelsTopLeft },
  { href: "/admin/services", label: "Services", icon: Boxes },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/access", label: "Access Control", icon: Shield },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto border-r border-border/60 bg-card/95 p-5 shadow-2xl backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">Admin Panel</p>
          <p className="text-xs text-muted-foreground">Navigation</p>
        </div>
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          Restricted
        </Badge>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors",
                pathname === item.href
                  ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                  : "border-border/40 bg-background/30 text-muted-foreground hover:border-border/60 hover:bg-background/60 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-5 rounded-2xl border border-border/50 bg-background/40 p-4 text-xs text-muted-foreground">
        Only users with wildcard permission can access admin pages.
      </div>
    </div>
  )
}