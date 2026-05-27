import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Terms of Service",
  description:
    "Review Coreor's terms for website usage, project services, support, payment, deliverables, and acceptable use.",
  path: "/terms-of-service",
  keywords: ["terms of service", "website terms", "service agreement", "coreor legal"],
  pageType: "legal",
})

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
