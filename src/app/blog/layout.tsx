import type { Metadata } from "next"
import { POSTS } from "@/lib/blog"
import { absoluteUrl, buildCollectionJsonLd, buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Insights",
  description:
    "Read Coreor's engineering notes on software architecture, cloud operations, privacy, and product delivery.",
  path: "/blog",
  keywords: ["engineering blog", "software architecture", "cloud operations", "privacy", "product delivery"],
  pageType: "blogIndex",
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogCollectionJsonLd = buildCollectionJsonLd({
    name: "Coreor Insights",
    description:
      "Engineering notes on software architecture, cloud operations, privacy, and product delivery.",
    url: absoluteUrl("/blog"),
    type: "Blog",
    items: POSTS.map((post) => ({
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  })

  return (
    <>
      <script
        id="blog-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
      />
      {children}
    </>
  )
}
