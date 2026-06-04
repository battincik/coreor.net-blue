import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const posts = [
  { title: "Homepage Refresh", status: "Published", category: "Design", date: "2026-05-21" },
  { title: "Admin Access Audit", status: "Draft", category: "Security", date: "2026-05-28" },
  { title: "Coreor Services Overview", status: "Scheduled", category: "Content", date: "2026-06-08" },
]

export default function AdminBlogPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Blog Manager</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Mockup blog workspace for drafts, publishing, and editorial planning.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.title} className="border-border/60 bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">{post.status}</Badge>
              </div>
              <CardDescription>{post.category}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Publish date: {post.date}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}