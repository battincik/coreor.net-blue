import Link from "next/link"
import { SERVICES } from "@/lib/services"
import { Badge } from "@/components/ui/badge"

export default function ServicesIndex() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">Services</Badge>
        <h1 className="text-4xl font-extrabold mb-6">What We Do</h1>
        <p className="text-muted-foreground mb-8">Practical engineering services ready to ship.</p>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map(s => (
            <div key={s.slug} className="p-6 rounded-xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{s.short}</p>
              <p className="text-sm text-muted-foreground mb-4">{s.overview}</p>
              <div className="flex items-center gap-3">
                <Link href={`/services/${s.slug}`} className="text-sm text-primary font-medium">View details</Link>
                <Link href={`/contact?subject=${encodeURIComponent(s.title)}`} className="text-sm text-muted-foreground">Contact us</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
