import type { Metadata } from "next"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import { POSTS, getPostBySlug } from "@/lib/blog"
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd, buildSiteMetadata, siteConfig } from "@/lib/seo"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = (await params) as { slug: string }
  const post = getPostBySlug(resolved.slug)

  if (!post) {
    return buildSiteMetadata({
      title: "Post not found",
      description: "The requested article could not be found.",
      path: "/blog",
      pageType: "blogIndex",
      noIndex: true,
    })
  }

  return buildSiteMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    pageType: "blogPost",
    type: "article",
    keywords: post.tags,
    article: {
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      section: "Engineering",
    },
  })
}

function slugifyHeading(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function extractToc(content: string) {
  const headings: Array<{ text: string; id: string; level: 2 | 3 }> = []
  const matches = content.matchAll(/^(##|###)\s+(.+)$/gm)

  for (const match of matches) {
    const level = match[1] === "##" ? 2 : 3
    const text = match[2].replace(/`/g, "").replace(/\*\*/g, "").trim()
    const id = slugifyHeading(text)

    if (text && id) {
      headings.push({ text, id, level })
    }
  }

  return headings
}

function hasInlineToc(content: string) {
  return /(^|\n)##\s+(İçindekiler|Table of Contents)\s*$/im.test(content)
}

export default async function BlogPost({ params }: Props) {
  const resolved = (await params) as { slug: string }
  const post = getPostBySlug(resolved.slug)

  if (!post) {
    return (
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="text-muted-foreground">We couldn't find the article you're looking for.</p>
        </div>
      </main>
    )
  }

  const toc = extractToc(post.content)
  const showGeneratedToc = !hasInlineToc(post.content) && toc.length > 0
  const relatedPosts = post.related
    .map((slug) => POSTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 5)
  const latestPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 5)
  const articleJsonLd = buildArticleJsonLd({
    name: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: siteConfig.ogImage,
    publishedTime: post.date,
    author: post.author,
    tags: post.tags,
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ])

  return (
    <>
      <script
        id={`blog-post-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        id={`blog-post-breadcrumb-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 hero-glow" />
        <div
          className="absolute top-24 -left-24 w-72 h-72 rounded-full opacity-20 animate-float"
          style={{ background: "radial-gradient(circle, oklch(0.76 0.15 200 / 0.25), transparent)" }}
        />
        <div
          className="absolute bottom-16 -right-24 w-80 h-80 rounded-full opacity-10 animate-float-delayed"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.14 170 / 0.22), transparent)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="glass glow-card rounded-2xl p-6 md:p-8 mb-8">
              <div className="mb-6 text-xs tracking-wide uppercase text-muted-foreground">{post.date} • {post.author}</div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">{post.title}</h1>
              <p className="text-lg text-muted-foreground mb-5">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 items-center">
                {post.tags?.map((t) => (
                  <span key={t} className="text-xs uppercase tracking-widest text-primary/90 bg-primary/10 border border-primary/30 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <article className="blog-content glass glow-card rounded-2xl p-6 md:p-8 text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>{post.content}</ReactMarkdown>
            </article>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            {showGeneratedToc && (
              <nav className="glass glow-card rounded-2xl p-5" aria-label="Table of Contents">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/80">Table of Contents</h2>
                <ul className="space-y-1 text-sm">
                  {toc.map((item) => (
                    <li key={`${item.id}-${item.level}`} className={item.level === 3 ? "ml-4" : ""}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors leading-6">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {relatedPosts.length > 0 && (
              <section className="glass glow-card rounded-2xl p-5">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/80">Related Articles</h2>
                <ul className="space-y-2">
                  {relatedPosts.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/blog/${item.slug}`} className="group block text-sm text-muted-foreground hover:text-primary transition-colors">
                        <span className="group-hover:underline underline-offset-4">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="glass glow-card rounded-2xl p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/80">Latest Articles</h2>
              <ul className="space-y-2">
                {latestPosts.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="group block text-sm text-muted-foreground hover:text-primary transition-colors">
                      <span className="group-hover:underline underline-offset-4">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass glow-card rounded-2xl p-5">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/80">Coreor Insights</h2>
              <p className="text-sm text-muted-foreground leading-6 mb-3">
                Follow engineering, performance, security, and cloud-focused articles to make better project decisions faster.
              </p>
              <Link href="/blog" className="text-sm font-medium text-primary hover:underline underline-offset-4">
                View All Articles
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </>
  )
}
