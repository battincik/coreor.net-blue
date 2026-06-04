import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  { title: "Web Development", status: "Enabled", desc: "Landing pages, dashboards, and internal tools." },
  { title: "Cloud Infrastructure", status: "Enabled", desc: "Deployment, observability, and scaling support." },
  { title: "Design Systems", status: "Planned", desc: "Reusable UI foundations and brand consistency." },
]

export default function AdminServicesPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Services</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Mockup service catalog for what is visible in the admin shell.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="border-border/60 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">{service.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{service.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}