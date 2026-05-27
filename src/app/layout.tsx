import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import "@/index.css"
import { Providers } from "@/components/providers"
import { AnalyticsVanilla } from "@/components/analytics"
import { buildSiteMetadata, buildWebsiteJsonLd, organizationJsonLd } from "@/lib/seo"
import { SiteShell } from "@/components/site-shell"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = buildSiteMetadata({
  title: "Coreor.net",
  description:
    "Coreor designs and builds software products, cloud infrastructure, data platforms, and digital experiences for modern businesses.",
  path: "/",
  keywords: [
    "software development",
    "next.js agency",
    "cloud infrastructure",
    "web development",
    "mobile apps",
    "database management",
    "cybersecurity",
  ],
  pageType: "home",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', { page_path: window.location.pathname });`}
            </Script>
          </>
        ) : null}
        <Script id="organization-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="website-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(buildWebsiteJsonLd())}
        </Script>
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
