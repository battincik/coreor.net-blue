import { absoluteUrl, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo"

export default function Head() {
  const title = "Terms of Service | Coreor"
  const description = "Review Coreor terms for website use, service scope, account access, obligations, and legal policies."
  const path = "/terms-of-service"

  const webPageJsonLd = buildWebPageJsonLd({
    name: title,
    description,
    path,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Terms of Service", path },
    ],
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path },
  ])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteUrl(path)} />
      <meta name="robots" content="index,follow" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
