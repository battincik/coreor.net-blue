import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { SERVICES } from "@/lib/services"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import { absoluteUrl, buildBreadcrumbJsonLd, buildCollectionJsonLd, buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Services",
  description: "Explore Coreor services for web, mobile, cloud, AI, database, and hosting projects.",
  path: "/services",
  pageType: "servicesIndex",
  keywords: ["web development", "mobile app development", "cloud solutions", "ai integration", "database management", "hosting"],
})

export default function ServicesIndex() {
  const serviceCollectionJsonLd = buildCollectionJsonLd({
    name: "Coreor Services",
    description: "Detailed engineering services by Coreor.",
    url: absoluteUrl("/services"),
    type: "CollectionPage",
    items: SERVICES.map((service) => ({
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ])

  return (
    <>
      <Script id="services-collection-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(serviceCollectionJsonLd)}
      </Script>
      <Script id="services-breadcrumb-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <main className="relative overflow-hidden pt-28 pb-24">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 hero-glow" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">Services</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">Detailed engineering services built for search and conversion</h1>
          <p className="text-lg text-muted-foreground leading-7">
            Coreor services are designed as long-form, SEO-friendly product pages. Each service covers strategy, implementation, delivery, and the practical outcomes a business should expect.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.slug} className="group rounded-2xl border border-border/60 bg-card/70 p-6 shadow-lg shadow-cyan-950/10 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4 mb-4">
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
                  {s.slug.replace(/-/g, " ")}
                </Badge>
                <Sparkles className="h-4 w-4 text-primary/80" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-7 mb-4">{s.short}</p>
              <p className="text-sm text-muted-foreground leading-7 mb-6">{s.overview}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {s.keywords.slice(0, 3).map((keyword) => (
                  <span key={keyword} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={`/contact?service=${encodeURIComponent(s.slug)}&subject=${encodeURIComponent(s.title)}`} className="text-sm text-muted-foreground hover:text-foreground">
                  Contact us
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      </main>
    </>
  )
}
