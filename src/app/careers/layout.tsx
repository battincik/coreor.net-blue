import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Careers",
  description:
    "Join Coreor's remote-first engineering team and work on software, cloud, and product projects with long-term impact.",
  path: "/careers",
  keywords: ["careers", "jobs", "remote engineering", "software jobs", "coreor hiring"],
})

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
