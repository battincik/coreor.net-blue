import { absoluteUrl, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo"

export default function Head() {
  const title = "Careers at Coreor | Open Roles"
  const description =
    "Explore open software engineering and product roles at Coreor. Learn benefits, team culture, and application details."
  const path = "/careers"

  const webPageJsonLd = buildWebPageJsonLd({
    name: title,
    description,
    path,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Careers", path },
    ],
  })
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Careers", path },
  ])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteUrl(path)} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absoluteUrl(path)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
