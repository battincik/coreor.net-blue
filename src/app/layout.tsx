import type { Metadata } from "next"
import { Suspense } from "react"
import "@/index.css"
import { Providers } from "@/components/providers"
import { AnalyticsVanilla } from "@/components/analytics"
import { buildSiteMetadata, organizationJsonLd, siteConfig } from "@/lib/seo"
import { SiteShell } from "@/components/site-shell"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = buildSiteMetadata({
  title: "Coreor.net",
  description:
    "Coreor designs and builds software products, cloud infrastructure, data platforms, AI-enabled systems, and digital experiences for modern businesses.",
  path: "/",
  keywords: [
    "Coreor",
    "Coreor.net",
    "software development company",
    "software development Turkey",
    "next.js agency",
    "cloud infrastructure",
    "web development",
    "mobile apps",
    "database management",
    "cybersecurity",
    "AI product engineering",
    "managed hosting",
  ],
  pageType: "home",
  locale: "en_US",
  alternateLocales: ["tr_TR"],
})

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Coreor",
  alternateName: ["Coreor.net"],
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: "Coreor",
    url: siteConfig.url,
    logo: siteConfig.logo,
  },
}

const ecosystemJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Coreor ecosystem",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Coreor Store", url: "https://store.coreor.net" },
    { "@type": "ListItem", position: 2, name: "Coreor Workspace", url: "https://workspace.coreor.net" },
    { "@type": "ListItem", position: 3, name: "Coreor ID", url: "https://id.coreor.net" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {googleAnalyticsId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
            <script dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', { page_path: window.location.pathname });`,
              }}
            />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemJsonLd) }}
        />
        <Providers>
          <Suspense fallback={null}>
            <AnalyticsVanilla />
          </Suspense>
          <SiteShell>{children}</SiteShell>
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
