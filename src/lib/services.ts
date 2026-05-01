export type Service = {
  slug: string
  title: string
  short: string
  overview: string
  details: string
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Modern, responsive web applications",
    overview: "End-to-end web applications using Next.js, React and scalable APIs.",
    details: `We build production-ready web applications with a focus on performance, accessibility, and maintainability.

Our process includes architecture design, component-driven frontends, API design, CI/CD and monitoring. We specialise in building SEO-friendly and highly interactive user interfaces.`,
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    short: "Cross-platform and native mobile development",
    overview: "React Native and native iOS/Android apps tailored to product goals.",
    details: `We deliver performant mobile apps with modern architectures. Services include UX optimisation, offline-first features, push notifications, and app store release management.`,
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    short: "Cloud architecture, migrations and managed services",
    overview: "Design and operate resilient cloud platforms on AWS, GCP or Azure.",
    details: `Our cloud practice focuses on cost-effective and resilient architectures. We handle migrations, infra as code, observability, and secure network design.`,
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    short: "Practical AI/ML feature delivery",
    overview: "Integrate models, pipelines and inference services into products.",
    details: `We help product teams add AI features responsibly—model selection, inference scaling, data pipelines, and evaluation metrics to ensure reliable behaviour.`,
  },
  {
    slug: "database-management",
    title: "Database Management",
    short: "Design, tuning and migrations",
    overview: "Postgres, MySQL, MongoDB, and data modelling for scale.",
    details: `Database services include schema design, query optimisation, backup & recovery, and migration planning. We also implement observability for data-heavy systems.`,
  },
  {
    slug: "server-hosting",
    title: "Server Hosting",
    short: "Managed hosting and platform operations",
    overview: "High-availability hosting with automated deployments and scaling.",
    details: `From container orchestration to serverless, we operate production systems with SLO targets, incident runbooks, and cost-awareness.`,
  },
]

export function getService(slug: string) {
  try {
    const decoded = decodeURIComponent(slug || "").replace(/\/$/, "").toLowerCase()
    return SERVICES.find(s => s.slug.toLowerCase() === decoded) || null
  } catch {
    return SERVICES.find(s => s.slug === slug) || null
  }
}
