import fs from "node:fs"
import path from "node:path"

export type Post = {
    slug: string
    title: string
    date: string
    author: string
    excerpt: string
    tags: string[]
    related: string[]
    content: string
    mdx?: string
}

type Frontmatter = {
    title?: string
    date?: string
    author?: string
    excerpt?: string
    slug?: string
    tags?: string[]
    related?: string[]
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog")

function stripQuotes(value: string) {
    return value.replace(/^['\"]|['\"]$/g, "").trim()
}

function parseInlineArray(value: string) {
    const raw = value.trim()
    if (!raw.startsWith("[") || !raw.endsWith("]")) return []
    const inner = raw.slice(1, -1).trim()
    if (!inner) return []

    return inner
        .split(",")
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean)
}

function parseFrontmatter(source: string): { frontmatter: Frontmatter; content: string } {
    const normalized = source.replace(/^\uFEFF/, "")
    const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!match) {
        return { frontmatter: {}, content: normalized }
    }

    const [, block, body] = match
    const frontmatter: Frontmatter = {}
    let listKey: keyof Frontmatter | null = null

    for (const rawLine of block.split(/\r?\n/)) {
        const line = rawLine.trim()
        if (!line || line.startsWith("#")) continue

        if (line.startsWith("- ") && listKey) {
            const item = stripQuotes(line.slice(2))
            const existing = frontmatter[listKey]
            if (Array.isArray(existing) && item) {
                existing.push(item)
            }
            continue
        }

        const sep = line.indexOf(":")
        if (sep === -1) {
            listKey = null
            continue
        }

        const key = line.slice(0, sep).trim() as keyof Frontmatter
        const rawValue = line.slice(sep + 1).trim()

        if (rawValue === "") {
            if (key === "tags") {
                frontmatter.tags = []
                listKey = "tags"
            } else if (key === "related") {
                frontmatter.related = []
                listKey = "related"
            } else {
                listKey = null
            }
            continue
        }

        listKey = null

        if (key === "tags") {
            frontmatter.tags = parseInlineArray(rawValue)
            continue
        }

        if (key === "related") {
            frontmatter.related = parseInlineArray(rawValue)
            continue
        }

        if (key === "title" || key === "date" || key === "author" || key === "excerpt" || key === "slug") {
            frontmatter[key] = stripQuotes(rawValue)
        }
    }

    return { frontmatter, content: body }
}

function deriveExcerpt(content: string) {
    const text = content
        .replace(/^#.*$/gm, "")
        .replace(/`{1,3}[\s\S]*?`{1,3}/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim()

    return text.length > 180 ? `${text.slice(0, 177)}...` : text
}

function getAllPosts(): Post[] {
    if (!fs.existsSync(BLOG_DIR)) return []

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"))

    const posts = files.map((file): Post => {
        const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
        const { frontmatter, content } = parseFrontmatter(source)
        const fallbackSlug = file.replace(/\.mdx$/, "")
        const slug = frontmatter.slug || fallbackSlug

        return {
            slug,
            title: frontmatter.title || slug,
            date: frontmatter.date || "1970-01-01",
            author: frontmatter.author || "Coreor Team",
            excerpt: frontmatter.excerpt || deriveExcerpt(content),
            tags: frontmatter.tags || [],
            related: frontmatter.related || [],
            content,
            mdx: `@/content/blog/${file}`,
        }
    })

    return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export const POSTS: Post[] = getAllPosts()

export function getPostBySlug(slug: string) {
    try {
        const decoded = decodeURIComponent(slug || "").replace(/\/$/, "").toLowerCase()
        return POSTS.find((p) => p.slug.toLowerCase() === decoded || p.slug === slug) || null
    } catch {
        return POSTS.find((p) => p.slug === slug) || null
    }
}
