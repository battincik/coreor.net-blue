import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Case Studies",
  description:
    "Explore selected Coreor products and engineering work across data, desktop software, commerce and customer workflows.",
  path: "/works",
  keywords: ["portfolio", "software projects", "data products", "desktop software", "coreor work"],
  pageType: "works",
})

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
