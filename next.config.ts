import type { NextConfig } from "next"
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  typedRoutes: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.coreor.net',
          },
        ],
        destination: 'https://coreor.net/:path*',
        permanent: true,
      },
    ]
  },
}

export default withMDX(nextConfig)