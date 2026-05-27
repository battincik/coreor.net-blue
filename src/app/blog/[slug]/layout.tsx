import type { Metadata } from "next"
import { POSTS, getPostBySlug } from "@/lib/blog"
import { buildSiteMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolved = await params
  const post = getPostBySlug(resolved.slug)

  if (!post) {
    return buildSiteMetadata({
      title: "Post Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${resolved.slug}`,
      keywords: ["blog", "article"],
      noIndex: true,
      pageType: "blogPost",
    })
  }

  return buildSiteMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [...post.tags, "Coreor blog", "engineering"],
    type: "article",
    pageType: "blogPost",
    article: {
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      section: "Insights",
    },
  })
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
