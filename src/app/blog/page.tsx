"use client"
import Link from "next/link"
import { POSTS } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

export default function BlogIndex() {
  return (
    <main className="relative pt-28 pb-24">
      <div className="relative max-w-5xl mx-auto px-6">
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
          Insights
        </Badge>
        <h1 className="text-4xl font-extrabold mb-6">From the Coreor Team</h1>
        <p className="text-muted-foreground mb-8">Thoughts on engineering, product and cloud infrastructure.</p>

        <div className="grid gap-8">
          {POSTS.map((p) => (
            <article key={p.slug} className="p-6 rounded-xl bg-card border border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    <Link href={`/blog/${p.slug}`} className="hover:text-primary">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>
                  <div className="text-xs text-muted-foreground">
                    {p.date} • {p.author}
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-primary/5 text-primary">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
