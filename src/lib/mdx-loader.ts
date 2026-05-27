export async function loadPostComponent(slug: string) {
  try {
    return (await import(`@/content/blog/${slug}.mdx`)).default
  } catch {
    return null
  }
}
