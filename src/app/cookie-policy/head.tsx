import { absoluteUrl, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo"

export default function Head() {
  const title = "Cookie Policy | Coreor"
  const description = "Learn how Coreor uses cookies and similar technologies for essential features, analytics, and preferences."
  const path = "/cookie-policy"

  const webPageJsonLd = buildWebPageJsonLd({
    name: title,
    description,
    path,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Cookie Policy", path },
    ],
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path },
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
