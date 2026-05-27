export type Service = {
  slug: string
  title: string
  short: string
  overview: string
  details: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  sections: {
    title: string
    paragraphs: string[]
    bullets?: string[]
  }[]
  process: string[]
  outcomes: string[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Modern, responsive web applications",
    overview: "End-to-end web applications using Next.js, React and scalable APIs.",
    seoTitle: "Web Development Services | SEO-Friendly Next.js and React Builds",
    seoDescription:
      "Build fast, SEO-friendly web applications with Coreor using Next.js, React, scalable APIs, and production-ready engineering practices.",
    keywords: [
      "web development",
      "next.js development",
      "react development",
      "seo friendly websites",
      "frontend engineering",
      "api development",
    ],
    details: `We build production-ready web applications with a focus on performance, accessibility, and maintainability.

Our process includes architecture design, component-driven frontends, API design, CI/CD and monitoring. We specialise in building SEO-friendly and highly interactive user interfaces.`,
    sections: [
      {
        title: "What modern web development should deliver",
        paragraphs: [
          "A strong web platform is more than a visual layer. It needs clear information architecture, fast page loads, predictable routing, and content that search engines can understand.",
          "We build websites and web applications that balance editorial clarity with application-level interactivity so marketing teams, sales teams, and product teams can all move quickly without compromising performance.",
        ],
        bullets: [
          "SEO-friendly page structures with semantic HTML and metadata",
          "Component systems that scale with future content and feature growth",
          "API integrations, auth flows, dashboards, and content workflows",
        ],
      },
      {
        title: "How we approach implementation",
        paragraphs: [
          "We start with content hierarchy, business goals, and route planning before writing code. That keeps the website focused on outcomes rather than visual decoration alone.",
          "From there, we design reusable interfaces, define data contracts, and wire in monitoring so performance and maintainability remain visible after launch.",
        ],
      },
      {
        title: "Where this service is strongest",
        paragraphs: [
          "This service is a good fit for companies that need a high-performance website, a marketing site with advanced interactions, or a product front-end backed by clean APIs.",
        ],
        bullets: [
          "SaaS websites",
          "Corporate websites with strong SEO requirements",
          "Customer portals and internal tools",
        ],
      },
    ],
    process: [
      "Discovery and content mapping",
      "Information architecture and wireframes",
      "Component development and API integration",
      "Performance, accessibility, and SEO validation",
      "Deployment, monitoring, and iterative improvements",
    ],
    outcomes: [
      "Faster crawlable pages and cleaner metadata",
      "Reusable design and content system for future growth",
      "Lower maintenance overhead after launch",
      "Better conversion paths from search and direct traffic",
    ],
    faqs: [
      {
        question: "Do you only build marketing websites?",
        answer:
          "No. We build everything from content-heavy marketing sites to authenticated web applications, dashboards, and product experiences.",
      },
      {
        question: "Can you improve an existing website without a full rebuild?",
        answer:
          "Yes. We can audit your current stack, identify performance and SEO bottlenecks, and improve the site incrementally when a full rewrite is not necessary.",
      },
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    short: "Cross-platform and native mobile development",
    overview: "React Native and native iOS/Android apps tailored to product goals.",
    seoTitle: "Mobile App Development Services | React Native and Native Apps",
    seoDescription:
      "Plan, design, and ship mobile applications with Coreor. We build React Native and native iOS/Android apps that focus on product goals, usability, and reliability.",
    keywords: ["mobile app development", "react native", "ios app development", "android app development", "mobile product design"],
    details: `We deliver performant mobile apps with modern architectures. Services include UX optimisation, offline-first features, push notifications, and app store release management.`,
    sections: [
      {
        title: "Mobile products need more than a wrapper around web content",
        paragraphs: [
          "A successful mobile app must feel native to the device, respond quickly, and support real-world usage patterns such as poor connectivity, background activity, and push notifications.",
          "We design mobile experiences around the actual behaviour of your users so the app becomes a reliable part of the product rather than a simplified afterthought.",
        ],
        bullets: [
          "React Native cross-platform delivery",
          "Native iOS and Android feature work",
          "Offline-first and sync-aware user flows",
        ],
      },
      {
        title: "From concept to app store",
        paragraphs: [
          "We handle product scoping, navigation design, state management, backend integration, testing, and release preparation.",
          "That includes app store submission support, crash monitoring, and a release process that reduces the risk of last-minute surprises.",
        ],
      },
    ],
    process: [
      "Product discovery and feature prioritisation",
      "UX flows, design system, and navigation",
      "Implementation, testing, and device validation",
      "Release preparation and store deployment",
      "Post-launch analytics and iteration",
    ],
    outcomes: [
      "Consistent experience across devices and screen sizes",
      "Faster release cycles with fewer regressions",
      "Better retention through useful mobile interactions",
      "App store readiness with operational support",
    ],
    faqs: [
      {
        question: "Do you build both cross-platform and native apps?",
        answer: "Yes. We use React Native when product speed and shared code are a good fit, and native technologies when platform-specific capabilities are the better choice.",
      },
      {
        question: "Can you connect the app to our existing API?",
        answer: "Yes. We commonly integrate with REST, GraphQL, and custom backends, and can help define the API if it still needs shaping.",
      },
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    short: "Cloud architecture, migrations and managed services",
    overview: "Design and operate resilient cloud platforms on AWS, GCP or Azure.",
    seoTitle: "Cloud Solutions Services | AWS, GCP, and Azure Architecture",
    seoDescription:
      "Design resilient, secure cloud platforms with Coreor. We help with migrations, infrastructure as code, observability, and managed cloud operations across AWS, GCP, and Azure.",
    keywords: ["cloud solutions", "aws architecture", "gcp consulting", "azure migration", "infrastructure as code", "devops"],
    details: `Our cloud practice focuses on cost-effective and resilient architectures. We handle migrations, infra as code, observability, and secure network design.`,
    sections: [
      {
        title: "Cloud should reduce risk, not add confusion",
        paragraphs: [
          "Modern infrastructure needs to be resilient, observable, and understandable. That means good account structure, repeatable deployments, secure network boundaries, and a clear way to recover when something goes wrong.",
          "We design cloud environments so teams can ship quickly without losing control over cost, security, or operational visibility.",
        ],
        bullets: [
          "Infrastructure as code and repeatable environments",
          "Cost-aware architecture and scaling strategies",
          "Monitoring, logging, and incident response setup",
        ],
      },
      {
        title: "Migration and operational support",
        paragraphs: [
          "Whether you are moving from a legacy server to the cloud or reshaping an existing cloud footprint, we plan migrations carefully and keep rollback and cutover strategy in view.",
          "After launch, we can continue with managed support, performance tuning, and reliability improvements.",
        ],
      },
    ],
    process: [
      "Cloud audit and dependency mapping",
      "Target architecture and migration plan",
      "Infrastructure as code and security hardening",
      "Deployment, observability, and validation",
      "Ongoing optimisation and support",
    ],
    outcomes: [
      "Lower operational risk and better recoverability",
      "Clearer cost visibility and resource usage",
      "More secure and repeatable deployments",
      "A cloud setup your team can actually operate",
    ],
    faqs: [
      {
        question: "Do you only work with one cloud provider?",
        answer: "No. We work across AWS, GCP, and Azure, and we recommend the platform that best matches your product, compliance, and scaling needs.",
      },
      {
        question: "Can you help with an existing environment that is already live?",
        answer: "Yes. We can audit, stabilise, and improve live environments without forcing a disruptive rebuild.",
      },
    ],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    short: "Practical AI/ML feature delivery",
    overview: "Integrate models, pipelines and inference services into products.",
    seoTitle: "AI Integration Services | Practical Product AI and ML Delivery",
    seoDescription:
      "Add practical AI features to your product with Coreor. We integrate models, inference pipelines, and evaluation workflows without losing sight of performance or reliability.",
    keywords: ["ai integration", "machine learning integration", "product ai", "llm integration", "ml pipelines"],
    details: `We help product teams add AI features responsibly—model selection, inference scaling, data pipelines, and evaluation metrics to ensure reliable behaviour.`,
    sections: [
      {
        title: "AI should be a product feature, not just a demo",
        paragraphs: [
          "We help teams decide where AI adds real value and where a simpler rule-based workflow is the better fit. That reduces wasted effort and keeps product direction grounded in measurable outcomes.",
          "When AI is a good fit, we focus on reliability, observability, and user trust rather than novelty alone.",
        ],
        bullets: [
          "Model selection and workflow design",
          "Inference APIs and prompt or pipeline integration",
          "Evaluation metrics, guardrails, and monitoring",
        ],
      },
      {
        title: "Operationalizing AI in production",
        paragraphs: [
          "Shipping AI in production means thinking about latency, cost, error handling, and safe fallbacks.",
          "We build the surrounding product logic so AI features behave predictably and can be improved over time.",
        ],
      },
    ],
    process: [
      "Use-case review and feasibility check",
      "Model and architecture selection",
      "Integration, fallbacks, and observability",
      "Evaluation and quality tuning",
      "Iteration based on real user behaviour",
    ],
    outcomes: [
      "AI features tied to product goals",
      "Clear fallback behaviour when models fail",
      "Better visibility into quality and cost",
      "A safer path from prototype to production",
    ],
    faqs: [
      {
        question: "Do you build from scratch or integrate existing models?",
        answer: "Both. We can integrate existing APIs and models or help shape a workflow around a custom approach when that is justified.",
      },
      {
        question: "Can you help us avoid high AI costs?",
        answer: "Yes. We design for sensible prompt flow, caching, batching, and fallback strategies so cost stays connected to product value.",
      },
    ],
  },
  {
    slug: "database-management",
    title: "Database Management",
    short: "Design, tuning and migrations",
    overview: "Postgres, MySQL, MongoDB, and data modelling for scale.",
    seoTitle: "Database Management Services | PostgreSQL, MySQL, and MongoDB",
    seoDescription:
      "Improve database design, performance, and reliability with Coreor. We handle schema design, query tuning, migrations, backups, and database operations for growing systems.",
    keywords: ["database management", "postgresql optimization", "mysql tuning", "mongodb consulting", "database migration"],
    details: `Database services include schema design, query optimisation, backup & recovery, and migration planning. We also implement observability for data-heavy systems.`,
    sections: [
      {
        title: "Database quality shapes the rest of the system",
        paragraphs: [
          "Slow queries, inconsistent schemas, and weak recovery plans quickly become user-facing problems. Database work is therefore both technical and operational.",
          "We focus on structure, indexing, migrations, and long-term maintainability so the database supports product growth instead of limiting it.",
        ],
        bullets: [
          "Schema design and normalisation",
          "Query review and performance tuning",
          "Backup, restore, and migration planning",
        ],
      },
      {
        title: "Performance and safety together",
        paragraphs: [
          "We optimise for both speed and correctness, because a fast database that cannot be trusted is still a liability.",
          "That means controlled changes, validation steps, and observability for the moments when load or volume starts to shift.",
        ],
      },
    ],
    process: [
      "Schema and workload assessment",
      "Query analysis and index strategy",
      "Migration planning and backup strategy",
      "Performance validation and rollout",
      "Monitoring and periodic tuning",
    ],
    outcomes: [
      "Cleaner data models and easier development",
      "Lower query latency and more stable systems",
      "Safer migrations with less production risk",
      "A recovery strategy that is actually tested",
    ],
    faqs: [
      {
        question: "Do you work on existing production databases?",
        answer: "Yes. We often improve systems that are already live and can work with careful change management and rollback planning.",
      },
      {
        question: "Can you help us choose between SQL and NoSQL?",
        answer: "Yes. We assess the workload, query patterns, and consistency requirements before recommending a direction.",
      },
    ],
  },
  {
    slug: "server-hosting",
    title: "Server Hosting",
    short: "Managed hosting and platform operations",
    overview: "High-availability hosting with automated deployments and scaling.",
    seoTitle: "Server Hosting Services | Managed Platform Operations and Deployment",
    seoDescription:
      "Run production systems with Coreor's managed hosting and platform operations. We support high-availability hosting, automated deployments, incident readiness, and scaling.",
    keywords: ["server hosting", "managed hosting", "platform operations", "production hosting", "deployment automation"],
    details: `From container orchestration to serverless, we operate production systems with SLO targets, incident runbooks, and cost-awareness.`,
    sections: [
      {
        title: "Hosting should feel invisible when it works",
        paragraphs: [
          "Good hosting removes friction from the rest of the business. It gives teams predictable deployments, clear observability, and the confidence that the product will stay available when traffic or workload changes.",
          "We build hosting setups that are practical to run, easy to support, and aligned with your growth stage.",
        ],
        bullets: [
          "Automated deployments and release flow",
          "Scaling, uptime, and monitoring strategy",
          "Incident runbooks and operational visibility",
        ],
      },
      {
        title: "Managed operations for real teams",
        paragraphs: [
          "We support systems that need more than raw infrastructure. That includes alerting, routine maintenance, patching, and a plan for what happens when something unexpected occurs.",
          "The goal is a hosting platform your team can depend on without needing to overbuild internal operations from day one.",
        ],
      },
    ],
    process: [
      "Infrastructure review and hosting goals",
      "Environment design and deployment automation",
      "Monitoring, backup, and recovery setup",
      "Go-live validation and incident readiness",
      "Ongoing operations and optimisation",
    ],
    outcomes: [
      "More predictable deployments and rollbacks",
      "Better uptime and visibility into system health",
      "Operational support without unnecessary complexity",
      "A cleaner path from startup to scale-up",
    ],
    faqs: [
      {
        question: "Do you only host applications on one platform?",
        answer: "No. We work with a range of hosting and orchestration options depending on the product requirements and support model.",
      },
      {
        question: "Can you manage existing infrastructure instead of rebuilding it?",
        answer: "Yes. We can take over, document, and improve an existing setup when that is the right business choice.",
      },
    ],
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
