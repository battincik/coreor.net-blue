import type { MetadataRoute } from "next"
import { POSTS } from "@/lib/blog"
import { SERVICES } from "@/lib/services"
import { absoluteUrl } from "@/lib/seo"

const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/careers",
  "/contact",
  "/cookie-policy",
  "/privacy-policy",
  "/services",
  "/terms-of-service",
  "/works",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.7,
  }))

  const serviceEntries = SERVICES.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const postEntries = POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...serviceEntries, ...postEntries]
}
