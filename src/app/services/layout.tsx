import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Services",
  description:
    "Explore Coreor's services for web development, mobile apps, cloud solutions, AI integration, databases, and managed hosting.",
  path: "/services",
  keywords: ["services", "web development", "mobile apps", "cloud solutions", "ai integration"],
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
