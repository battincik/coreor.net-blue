import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const works = [
  { title: "Coreor Platform", label: "Active", detail: "Operational dashboard and support workflows." },
  { title: "Marketing Microsite", label: "Review", detail: "Landing page content and conversion experiments." },
  { title: "Client Portal", label: "Planned", detail: "Authenticated workspace and project tracking." },
]

export default function AdminWorksPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Works Overview</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Mockup project board for featured work and internal status tracking.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {works.map((work) => (
          <Card key={work.title} className="border-border/60 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{work.title}</CardTitle>
                <Badge variant="outline" className="border-border/40 bg-background/60 text-muted-foreground">{work.label}</Badge>
              </div>
              <CardDescription>Project card</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{work.detail}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}