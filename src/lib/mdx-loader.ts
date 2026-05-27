export async function loadPostComponent(slug: string, mdxPath?: string) {
  try {
    const fileName = mdxPath?.split("/").pop()?.replace(/\.mdx$/, "")
    const importKey = fileName || slug
    return (await import(`@/content/blog/${importKey}.mdx`)).default
  } catch {
    return null
  }
}
