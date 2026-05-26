import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Insights",
  description:
    "Read Coreor's engineering notes on software architecture, cloud operations, privacy, and product delivery.",
  path: "/blog",
  keywords: ["engineering blog", "software architecture", "cloud operations", "privacy", "product delivery"],
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
