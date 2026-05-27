import Script from "next/script"
import { getService } from "@/lib/services"
import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { absoluteUrl, buildServiceJsonLd, siteConfig } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }

export default async function ServicePage({ params }: Props) {
  const resolved = (await params) as { slug: string }
  const service = getService(resolved.slug)
  if (!service) {
    return (
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="text-muted-foreground">We couldn't find the service you're looking for.</p>
        </div>
      </main>
    )
  }

  const serviceJsonLd = buildServiceJsonLd({
    name: service.title,
    description: service.seoDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.title,
    category: "Digital Service",
    image: siteConfig.ogImage,
  })

  return (
    <>
      <Script id={`service-jsonld-${service.slug}`} type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(serviceJsonLd)}
      </Script>
      <main className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 hero-glow" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
          <Badge variant="outline" className="mb-5 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
            Service Guide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">{service.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">{service.overview}</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {service.keywords.slice(0, 5).map((keyword) => (
              <span key={keyword} className="px-3 py-1 rounded-full text-xs border border-border/60 bg-card/60 text-muted-foreground">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
          <article className="space-y-12">
            <section className="rounded-2xl border border-border/60 bg-card/70 p-8 shadow-2xl shadow-cyan-950/10">
              <div className="flex items-center gap-2.5 mb-4 text-primary">
                <Sparkles className="h-5 w-5" />
                <h2 className="text-xl font-bold text-foreground">Overview</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-7">
                {service.details.split('\n').map((line, i) => {
                  const trimmed = line.trim()
                  if (!trimmed) return null
                  return <p key={i}>{trimmed}</p>
                })}
              </div>
            </section>

            {service.sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-border/60 bg-card/70 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                <div className="space-y-4 text-muted-foreground leading-7">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <div className="mt-6 grid gap-3">
                    {section.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm text-foreground/90">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-2xl border border-border/60 bg-card/70 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">How we work</h2>
                <ol className="space-y-3 text-muted-foreground">
                  {service.process.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary shrink-0">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-2xl border border-border/60 bg-card/70 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Expected outcomes</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="rounded-2xl border border-border/60 bg-card/70 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Frequently asked questions</h2>
              <div className="space-y-5">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-border/50 bg-background/40 p-5">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 h-fit">
            <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
              <h2 className="text-lg font-bold text-foreground mb-3">Best for</h2>
              <div className="flex flex-wrap gap-2">
                {service.title === "Web Development" && ["SaaS", "Marketing sites", "Dashboards"].map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item}</span>
                ))}
                {service.title === "Mobile Apps" && ["Product apps", "Field teams", "Customer portals"].map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item}</span>
                ))}
                {service.title === "Cloud Solutions" && ["Migrations", "Scaling", "Reliability"].map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item}</span>
                ))}
                {service.title === "AI Integration" && ["LLM workflows", "Automation", "Decision support"].map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item}</span>
                ))}
                {service.title === "Database Management" && ["Scale fixes", "Schema design", "Query tuning"].map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item}</span>
                ))}
                {service.title === "Server Hosting" && ["Ops support", "Deployments", "Uptime"].map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
              <h2 className="text-lg font-bold text-foreground mb-3">Need this service?</h2>
              <p className="text-sm leading-7 text-muted-foreground mb-5">
                If this matches your current product or infrastructure needs, we can review scope, priorities, and delivery options.
              </p>
              <div className="flex flex-col gap-3">
                <Link href={`/contact?service=${encodeURIComponent(service.slug)}&subject=${encodeURIComponent(service.title)}`} className="btn-glow bg-primary text-primary-foreground px-4 py-3 rounded-md text-center font-semibold">
                  Contact us about this service
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground text-center hover:text-foreground">
                  General contact page
                </Link>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </main>
    </>
  )
}
