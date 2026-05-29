import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { POSTS } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { absoluteUrl, buildBreadcrumbJsonLd, buildCollectionJsonLd, buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Blog",
  description: "Engineering insights on architecture, cloud, security, performance, and product delivery.",
  path: "/blog",
  pageType: "blogIndex",
  keywords: ["engineering blog", "next.js", "cloud", "security", "software architecture", "product engineering"],
})

export default function BlogIndex() {
  const featured = POSTS[0]
  const latest = POSTS.slice(1)
  const uniqueTags = Array.from(new Set(POSTS.flatMap((post) => post.tags))).slice(0, 8)
  const collectionJsonLd = buildCollectionJsonLd({
    name: "Coreor Blog",
    description: "Engineering insights from the Coreor team.",
    url: absoluteUrl("/blog"),
    type: "Blog",
    items: POSTS.map((post) => ({
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ])

  return (
    <>
      <Script id="blog-collection-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(collectionJsonLd)}
      </Script>
      <Script id="blog-breadcrumb-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <main className="relative pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 hero-glow" />
      <div
        className="absolute top-24 -left-28 h-80 w-80 rounded-full opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, oklch(0.76 0.15 200 / 0.2), transparent)" }}
      />
      <div
        className="absolute bottom-20 -right-20 h-72 w-72 rounded-full opacity-20 animate-float-delayed"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.14 170 / 0.18), transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <section className="mb-10 glass glow-card rounded-2xl p-6 md:p-10">
          <Badge variant="outline" className="mb-5 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
            Coreor Insights
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Engineering Notes From The Coreor Team</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Practical technical notes on software architecture, cloud, performance, security, and product delivery.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3 mb-10">
          <div className="glass glow-card rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Articles</p>
            <p className="text-2xl font-bold gradient-text">{POSTS.length}</p>
          </div>
          <div className="glass glow-card rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Categories</p>
            <p className="text-2xl font-bold gradient-text">{uniqueTags.length}+</p>
          </div>
          <div className="glass glow-card rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Author</p>
            <p className="text-2xl font-bold gradient-text">Coreor Team</p>
          </div>
        </section>

        {featured && (
          <section className="mb-10">
            <p className="text-xs tracking-widest uppercase text-primary mb-3">One Featured Post</p>
            <article className="glass glow-card rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {featured.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary/90">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                <Link href={`/blog/${featured.slug}`} className="hover:text-primary transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-5 max-w-4xl">{featured.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{featured.date} • {featured.author}</span>
                <Link href={`/blog/${featured.slug}`} className="text-primary font-medium hover:underline underline-offset-4">
                  Read Article
                </Link>
              </div>
            </article>
          </section>
        )}

        <section className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-primary mb-2">Latest</p>
            <h2 className="text-2xl md:text-3xl font-bold">Latest Articles</h2>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((p) => (
            <article key={p.slug} className="glass glow-card rounded-xl p-5 flex flex-col h-full">
              <div className="text-xs text-muted-foreground mb-3">{p.date} • {p.author}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug">
                <Link href={`/blog/${p.slug}`} className="hover:text-primary transition-colors">
                  {p.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-border/40">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
      </main>
    </>
  )
}
