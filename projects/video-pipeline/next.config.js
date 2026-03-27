/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Serve assets from local directory
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/:path*',
      },
    ]
  },
}

module.exports = nextConfig