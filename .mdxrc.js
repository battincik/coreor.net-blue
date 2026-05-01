import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export const remarkPlugins = [
  remarkFrontmatter,
  [remarkMdxFrontmatter, { name: 'frontmatter' }],
]

export default {
  remarkPlugins,
}
