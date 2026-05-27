import type { Metadata } from "next"
import Script from "next/script"
import { SERVICES } from "@/lib/services"
import { absoluteUrl, buildCollectionJsonLd, buildSiteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSiteMetadata({
  title: "Services",
  description:
    "Explore Coreor's services for web development, mobile apps, cloud solutions, AI integration, databases, and managed hosting in detailed, SEO-friendly service pages.",
  path: "/services",
  keywords: ["services", "web development", "mobile apps", "cloud solutions", "ai integration"],
  pageType: "servicesIndex",
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const servicesCollectionJsonLd = buildCollectionJsonLd({
    name: "Coreor Services",
    description:
      "Web development, mobile apps, cloud solutions, AI integration, database engineering, and managed hosting.",
    url: absoluteUrl("/services"),
    type: "CollectionPage",
    items: SERVICES.map((service) => ({
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  })

  return (
    <>
      <Script id="services-collection-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(servicesCollectionJsonLd)}
      </Script>
      {children}
    </>
  )
}
