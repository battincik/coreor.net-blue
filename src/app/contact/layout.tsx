import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Contact Coreor",
  description:
    "Contact Coreor about software development, cloud infrastructure, database engineering, and digital product delivery.",
  path: "/contact",
  keywords: ["contact coreor", "software quote", "cloud consulting", "web development agency"],
  pageType: "contact",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
