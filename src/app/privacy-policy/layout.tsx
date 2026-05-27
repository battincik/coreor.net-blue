import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Privacy Policy",
  description:
    "Understand how Coreor collects, uses, shares, and protects personal data across its websites, forms, and services.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data protection", "gdpr", "kvkk", "personal data"],
  pageType: "legal",
})

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}
