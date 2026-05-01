import type { NextConfig } from "next"
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  typedRoutes: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
}

export default withMDX(nextConfig)