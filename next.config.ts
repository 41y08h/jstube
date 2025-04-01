import type { NextConfig } from 'next'

const isDevEnvironment = process.env.NODE_ENV === 'development'

const API_URL = isDevEnvironment
  ? 'http://localhost:5000'
  : 'https://jstube-api.herokuapp.com'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`, // Proxy to Backend
      },
    ]
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js', // Or other desired output extension
        },
      },
    },
  },
}

export default nextConfig
