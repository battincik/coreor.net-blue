import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "About Coreor",
  description:
    "Learn about Coreor's mission, values, team, and engineering approach behind our software, cloud, and digital product work.",
  path: "/about",
  keywords: ["about coreor", "software company", "engineering team", "digital products", "cloud services"],
  pageType: "about",
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
