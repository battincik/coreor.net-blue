import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Case Studies",
  description:
    "Review selected software, cloud, and digital product projects delivered by Coreor for modern businesses.",
  path: "/works",
  keywords: ["case studies", "portfolio", "software projects", "coreor work"],
})

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
