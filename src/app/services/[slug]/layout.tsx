import type { Metadata } from "next"
import { SERVICES, getService } from "@/lib/services"
import { buildSiteMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolved = await params
  const service = getService(resolved.slug)

  if (!service) {
    return buildSiteMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      path: `/services/${resolved.slug}`,
      keywords: ["service", "coreor"],
      noIndex: true,
    })
  }

  return buildSiteMetadata({
    title: `${service.title} | Coreor Services`,
    description: service.overview,
    path: `/services/${service.slug}`,
    keywords: [service.title, service.short, "software services", "coreor"],
  })
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
