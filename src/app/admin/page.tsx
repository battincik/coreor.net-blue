import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Contacts", value: "128" },
  { label: "Blog Drafts", value: "4" },
  { label: "Works", value: "12" },
  { label: "Services", value: "6" },
]

const shortcuts = [
  { href: "/admin/contact", label: "Open Contact Messages" },
  { href: "/admin/blog", label: "Manage Blog" },
  { href: "/admin/works", label: "Review Works" },
]

export default function AdminIndexPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
            Dashboard
          </Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Mockup overview for content, contacts, services, and editorial workflow.
          </p>
        </div>
        <Button asChild className="btn-glow bg-primary text-primary-foreground font-semibold">
          <Link href="/admin/contact">Go to Contact Messages</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/60 bg-card/80 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 bg-card/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Shortcuts to the most used admin areas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {shortcuts.map((item) => (
            <Button key={item.href} asChild variant="outline" className="border-border/60 bg-background/40">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
