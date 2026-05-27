import type { Metadata } from "next"
import { buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Cookie Policy",
  description:
    "Read how Coreor uses cookies, analytics, preferences, and third-party technologies across its website and digital services.",
  path: "/cookie-policy",
  keywords: ["cookie policy", "analytics cookies", "privacy", "website cookies"],
  pageType: "legal",
})

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}
