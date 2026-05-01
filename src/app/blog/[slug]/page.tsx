import { getPostBySlug } from "@/lib/blog"
import { loadPostComponent } from "@/lib/mdx-loader"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const resolved = (await params) as { slug: string }
  const post = getPostBySlug(resolved.slug)

  if (!post) {
    return (
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="text-muted-foreground">We couldn't find the article you're looking for.</p>
        </div>
      </main>
    )
  }

  // Load MDX component via static mapping so Next can bundle it
  const MDXContent = post.mdx ? await loadPostComponent(post.slug) : null

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-6 text-xs text-muted-foreground">{post.date} • {post.author}</div>

        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{post.excerpt}</p>

        <div className="flex gap-2 items-center mb-6">
          {post.tags?.map((t) => (
            <span key={t} className="text-xs uppercase tracking-wide text-primary/80 bg-primary/5 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>

        <article className="prose prose-invert max-w-none text-muted-foreground">
          {post.content.split('\n').map((line, i) => {
            const trimmed = line.trim()
            if (!trimmed) return <div key={i} className="h-2" />
            if (trimmed.startsWith('###')) {
              return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{trimmed.replace(/^#+\s/, '')}</h3>
            }
            if (trimmed.startsWith('##')) {
              return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{trimmed.replace(/^#+\s/, '')}</h2>
            }
            if (trimmed.startsWith('- ')) {
              return <li key={i} className="ml-6 list-disc">{trimmed.replace(/^-\s/, '')}</li>
            }
            if (trimmed.startsWith('**') && trimmed.endsWith('**:')) {
              return <strong key={i} className="block mt-3 mb-1">{trimmed.replace(/\*\*/g, '')}</strong>
            }
            return <p key={i}>{line}</p>
          })}
        </article>
      </div>
    </main>
  )
}
