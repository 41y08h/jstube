import { NextConfig } from 'next'

const isDevEnvironment = process.env.NODE_ENV === 'development'

const API_URL = isDevEnvironment
  ? 'http://localhost:5000'
  : 'https://jstube-api.onrender.com'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`, // Proxy to Backend
      },
    ]
  },
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'github.com' },
      { hostname: 'commondatastorage.googleapis.com' },
    ],
  },
}

export default nextConfig
