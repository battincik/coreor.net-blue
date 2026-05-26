import type { Metadata } from "next"
import Script from "next/script"
import "@/index.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Analytics } from "@/components/analytics"
import { buildSiteMetadata, organizationJsonLd } from "@/lib/seo"

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
        <Providers>
          <Analytics />
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
