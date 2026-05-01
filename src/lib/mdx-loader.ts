export async function loadPostComponent(slug: string) {
  switch (slug) {
    case "building-resilient-apis":
      return (await import('@/content/blog/building-resilient-apis.mdx')).default
    case "migrating-to-serverless":
      return (await import('@/content/blog/migrating-to-serverless.mdx')).default
    case "designing-for-privacy":
      return (await import('@/content/blog/designing-for-privacy.mdx')).default
    default:
      return null
  }
}
