export type Post = {
    slug: string
    title: string
    date: string
    author: string
    excerpt: string
    tags: string[]
    content: string
    mdx?: string
}

export const POSTS: Post[] = [
    {
        slug: "building-resilient-apis",
        title: "Building Resilient APIs: Practical Patterns",
        date: "2026-03-10",
        author: "Zeynep Yilmaz",
        excerpt: "Designing APIs that stay reliable under load and failure conditions.",
        tags: ["API", "Architecture", "Backend"],
        content: `
### Why resilience matters

Reliable APIs are the backbone of modern products. In this post we cover retry
strategies, circuit breakers, and idempotency patterns that prevent cascading
failures.

### Practical steps

- Use timeouts and retries with exponential backoff.
- Add health checks and monitoring.
- Design idempotent endpoints for safe retries.

### Summary

Resilience is a combination of design, testing and observability.
`,
        mdx: "@/content/blog/building-resilient-apis.mdx",
    },
    {
        slug: "migrating-to-serverless",
        title: "Migrating to Serverless: When and How",
        date: "2025-11-04",
        author: "Can Demir",
        excerpt: "A pragmatic guide to deciding whether serverless suits your workload.",
        tags: ["Cloud", "Serverless"],
        content: `
Serverless can reduce operational burden but introduces different trade-offs.

Key considerations: cold starts, vendor lock-in, cost patterns, and observability.

We recommend starting with a greenfield component or bursty workloads.
`,
        mdx: "@/content/blog/migrating-to-serverless.mdx",
    },
    {
        slug: "designing-for-privacy",
        title: "Designing for Privacy: Principles and Practices",
        date: "2025-06-15",
        author: "Irem Koc",
        excerpt: "Product-level privacy decisions that balance UX and compliance.",
        tags: ["Privacy", "Product"],
        content: `
Privacy-by-design means minimising data collection, clear consent flows, and
easy user controls. Use pseudonymization where appropriate and keep data
retention policies explicit.
`,
        mdx: "@/content/blog/designing-for-privacy.mdx",
    },
]

export function getPostBySlug(slug: string) {
    try {
        const decoded = decodeURIComponent(slug || "").replace(/\/$/, "").toLowerCase()
        return POSTS.find((p) => p.slug.toLowerCase() === decoded || p.slug === slug) || null
    } catch (e) {
        return POSTS.find((p) => p.slug === slug) || null
    }
}
