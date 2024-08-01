/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '54.180.227.42',
        port: '8080',
        pathname: '/api/v1/**'
      }
    ]
  }
}

export default nextConfig
