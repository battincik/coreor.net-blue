import type { Metadata } from "next"

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const siteUrl = rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl.replace(/\/+$/, "") : "https://coreor.net"

function normalizeOptionalUrl(value: string | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : null
}

const socialProfiles = {
  twitter: normalizeOptionalUrl(process.env.NEXT_PUBLIC_TWITTER_URL),
  facebook: normalizeOptionalUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  instagram: normalizeOptionalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  discord: normalizeOptionalUrl(process.env.NEXT_PUBLIC_DISCORD_URL),
  linkedin: normalizeOptionalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  github: normalizeOptionalUrl(process.env.NEXT_PUBLIC_GITHUB_URL),
  youtube: normalizeOptionalUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  tiktok: normalizeOptionalUrl(process.env.NEXT_PUBLIC_TIKTOK_URL),
  threads: normalizeOptionalUrl(process.env.NEXT_PUBLIC_THREADS_URL),
  mastodon: normalizeOptionalUrl(process.env.NEXT_PUBLIC_MASTODON_URL),
  medium: normalizeOptionalUrl(process.env.NEXT_PUBLIC_MEDIUM_URL),
  dribbble: normalizeOptionalUrl(process.env.NEXT_PUBLIC_DRIBBBLE_URL),
  behance: normalizeOptionalUrl(process.env.NEXT_PUBLIC_BEHANCE_URL),
  telegram: normalizeOptionalUrl(process.env.NEXT_PUBLIC_TELEGRAM_URL),
  whatsapp: normalizeOptionalUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL),
  reddit: normalizeOptionalUrl(process.env.NEXT_PUBLIC_REDDIT_URL),
  pinterest: normalizeOptionalUrl(process.env.NEXT_PUBLIC_PINTEREST_URL),
  rss: normalizeOptionalUrl(process.env.NEXT_PUBLIC_RSS_URL),
} as const

const socialProfileUrls = Object.values(socialProfiles).filter((value): value is string => Boolean(value))

function normalizeOptionalValue(value: string | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : null
}

export const siteVerification = {
  google: normalizeOptionalValue(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  bing: normalizeOptionalValue(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),
  pinterest: normalizeOptionalValue(process.env.NEXT_PUBLIC_PINTEREST_SITE_VERIFICATION),
}

export const siteConfig = {
  name: "Coreor.net",
  url: siteUrl,
  description:
    "Coreor designs and builds software products, cloud infrastructure, data platforms, and digital experiences for modern businesses.",
  email: "hello@coreor.net",
  phone: "+90 (312) 911 4815",
  location: "Ankara, Turkey",
  logo: `${siteUrl}/favicon.svg`,
  ogImage: `${siteUrl}/ogImage.png`,
  socials: socialProfiles,
}

function canonicalUrl(path: string) {
  return absoluteUrl(path)
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
  sameAs: [siteConfig.url, ...socialProfileUrls],
}

type SeoOptions = {
  title: string
  description: string
  path: string
  pageType?:
    | "home"
    | "about"
    | "contact"
    | "servicesIndex"
    | "servicePage"
    | "blogIndex"
    | "blogPost"
    | "works"
    | "careers"
    | "legal"
    | "content"
  keywords?: string[]
  image?: string
  images?: Array<{
    url: string
    width?: number
    height?: number
    alt?: string
    type?: string
    secureUrl?: string
  }>
  type?: "website" | "article"
  locale?: string
  alternateLocales?: string[]
  countryName?: string
  determiner?: "a" | "an" | "the" | "auto"
  ttl?: number
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
    section?: string
  }
  noIndex?: boolean
}

function buildOptimizedTitle(title: string, pageType: NonNullable<SeoOptions["pageType"]>) {
  if (!title) return siteConfig.name
  if (title.includes("|")) return title

  switch (pageType) {
    case "home":
      return "Coreor.net | Software, Cloud, AI & Product Engineering"
    case "about":
      return `${title} | Mission, Team & Engineering`
    case "contact":
      return `${title} | Get a Fast Project Estimate`
    case "servicesIndex":
      return `${title} | Web, Mobile, Cloud & AI`
    case "servicePage":
      return `${title} | Coreor Services`
    case "blogIndex":
      return `${title} | Engineering Insights, Cloud & Privacy`
    case "blogPost":
      return `${title} | Coreor Insights`
    case "works":
      return `${title} | Real Client Projects`
    case "careers":
      return `${title} | Join Our Team`
    case "legal":
      return `${title} | Coreor.net`
    case "content":
    default:
      return `${title} | Coreor.net`
  }
}

function buildOptimizedDescription(description: string, pageType: NonNullable<SeoOptions["pageType"]>) {
  const trimmed = description.trim()
  const suffixMap: Record<Exclude<NonNullable<SeoOptions["pageType"]>, "content">, string> = {
    home: "Discover services, case studies, and a clear path to start your project.",
    about: "See how Coreor works, what we value, and how we deliver software.",
    contact: "Share your goals and get a fast, practical response from the team.",
    servicesIndex: "Compare web, mobile, cloud, AI, database, and managed hosting capabilities.",
    servicePage: "Review scope, process, deliverables, and outcomes before you reach out.",
    blogIndex: "Read practical notes on architecture, cloud, privacy, and delivery.",
    blogPost: "Take away patterns you can apply to real products and teams.",
    works: "See selected projects and outcomes across product and infrastructure work.",
    careers: "Learn what it is like to join the team and build with us.",
    legal: "Find policy details, compliance notes, and usage terms.",
  }

  if (trimmed.length >= 120 || pageType === "content") {
    return trimmed
  }

  return `${trimmed} ${suffixMap[pageType]}`.trim()
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.url, ...socialProfileUrls],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function buildCollectionJsonLd(options: {
  name: string
  description: string
  url: string
  items: Array<{ name: string; url: string }>
  type?: "Blog" | "CollectionPage"
}) {
  return {
    "@context": "https://schema.org",
    "@type": options.type ?? "CollectionPage",
    name: options.name,
    description: options.description,
    url: options.url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: options.items.length,
      itemListElement: options.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  }
}

export function buildArticleJsonLd(options: {
  name: string
  description: string
  url: string
  image: string
  publishedTime?: string
  modifiedTime?: string
  author: string
  tags?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.name,
    description: options.description,
    url: options.url,
    image: [options.image],
    datePublished: options.publishedTime,
    dateModified: options.modifiedTime ?? options.publishedTime,
    author: {
      "@type": "Person",
      name: options.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    keywords: options.tags,
    mainEntityOfPage: options.url,
  }
}

export function buildServiceJsonLd(options: {
  name: string
  description: string
  url: string
  category?: string
  serviceType?: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    serviceType: options.serviceType ?? options.name,
    category: options.category ?? "Software Service",
    description: options.description,
    url: options.url,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.logo,
    },
    areaServed: ["TR", "US", "EU", "Global"],
    availableChannel: [
      {
        "@type": "ServiceChannel",
        serviceUrl: options.url,
        servicePhone: siteConfig.phone,
      },
    ],
    image: options.image ?? siteConfig.ogImage,
  }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildFaqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildWebPageJsonLd(options: {
  name: string
  description: string
  path: string
  breadcrumb?: Array<{ name: string; path: string }>
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    breadcrumb: options.breadcrumb
      ? {
          "@type": "BreadcrumbList",
          itemListElement: options.breadcrumb.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
          })),
        }
      : undefined,
  }
}

function normalizePath(path: string) {
  if (!path) return "/"
  const cleanedPath = path.split(/[?#]/)[0].replace(/\/+/g, "/")
  return cleanedPath.startsWith("/") ? cleanedPath : `/${cleanedPath}`
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
  pageType = "content",
  keywords = [],
  image = siteConfig.ogImage,
  images = [],
  type = "website",
  locale = "tr_TR",
  alternateLocales = ["en_US"],
  countryName = "Turkey",
  determiner = "auto",
  ttl = 604800,
  article,
  noIndex = false,
}: SeoOptions): Metadata {
  const canonicalPath = normalizePath(path)
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image)
  const imageAlt = `${title} | ${siteConfig.name}`
  const optimizedTitle = buildOptimizedTitle(title, pageType)
  const optimizedDescription = buildOptimizedDescription(description, pageType)
  const baseOpenGraphImages = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: imageAlt,
      type: "image/png",
      secureUrl: imageUrl,
    },
    {
      url: siteConfig.logo,
      width: 512,
      height: 512,
      alt: `${siteConfig.name} logo`,
      type: "image/svg+xml",
      secureUrl: siteConfig.logo,
    },
    ...images.map((entry) => ({
      url: entry.url.startsWith("http") ? entry.url : absoluteUrl(entry.url),
      width: entry.width,
      height: entry.height,
      alt: entry.alt ?? imageAlt,
      type: entry.type,
      secureUrl: entry.secureUrl ?? (entry.url.startsWith("http") ? entry.url : absoluteUrl(entry.url)),
    })),
  ]

  return {
    metadataBase: new URL(siteConfig.url),
    title: optimizedTitle,
    description: optimizedDescription,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    alternates: {
      canonical: canonicalUrl(canonicalPath),
    },
    verification: {
      google: siteVerification.google ?? undefined,
      other: {
        ...(siteVerification.bing ? { bing: siteVerification.bing } : {}),
        ...(siteVerification.pinterest ? { pinterest: siteVerification.pinterest } : {}),
      },
    },
    robots: robotsMetadata(noIndex),
    openGraph: {
      type,
      url: absoluteUrl(canonicalPath),
      title: optimizedTitle,
      description: optimizedDescription,
      siteName: siteConfig.name,
      locale,
      alternateLocale: alternateLocales,
      countryName,
      determiner,
      ttl,
      emails: [siteConfig.email],
      phoneNumbers: [siteConfig.phone],
      images: baseOpenGraphImages,
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
      title: optimizedTitle,
      description: optimizedDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(siteConfig.socials.twitter
        ? {
            site: siteConfig.socials.twitter,
            creator: siteConfig.socials.twitter,
          }
        : {}),
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
