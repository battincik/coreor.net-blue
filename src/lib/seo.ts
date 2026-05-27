import type { Metadata } from "next"

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const siteUrl = rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl.replace(/\/+$/, "") : "https://coreor.net"

export const siteConfig = {
  name: "Coreor.net",
  url: siteUrl,
  description:
    "Coreor designs and builds software products, cloud infrastructure, data platforms, and digital experiences for modern businesses.",
  email: "hello@coreor.net",
  phone: "+90 (312) 911 4815",
  location: "Ankara, Turkey",
  logo: `${siteUrl}/favicon.svg`,
  ogImage: `${siteUrl}/og-image.svg`,
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteConfig.logo,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ankara",
    addressCountry: "TR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      areaServed: ["TR", "US", "EU"],
      availableLanguage: ["en", "tr"],
    },
  ],
  sameAs: [siteConfig.url],
}

type SeoOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  type?: "website" | "article"
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
    section?: string
  }
  noIndex?: boolean
}

function normalizePath(path: string) {
  if (!path) return "/"
  return path.startsWith("/") ? path : `/${path}`
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${normalizePath(path)}`
}

function robotsMetadata(noIndex = false): Metadata["robots"] {
  if (noIndex) {
    return { index: false, follow: false }
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  }
}

export function buildSiteMetadata({
  title,
  description,
  path,
  keywords = [],
  image = siteConfig.ogImage,
  type = "website",
  article,
  noIndex = false,
}: SeoOptions): Metadata {
  const canonicalPath = normalizePath(path)
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image)

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    alternates: {
      canonical: canonicalPath,
    },
    robots: robotsMetadata(noIndex),
    openGraph: {
      type,
      url: absoluteUrl(canonicalPath),
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            tags: article.tags,
            section: article.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: [
        {
          url: "/favicon.svg",
          type: "image/svg+xml",
        },
        {
          url: "/favicon-96x96.png",
          type: "image/png",
          sizes: "96x96",
        },
        {
          url: "/favicon.ico",
          type: "image/x-icon",
        },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  }
}
