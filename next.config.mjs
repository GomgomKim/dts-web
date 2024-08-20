/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_API_HOST_NAME,
        port: process.env.NEXT_PUBLIC_API_PORT,
        pathname: process.env.NEXT_PUBLIC_API_PATH_NAME
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com'
      }
    ]
  }
}

export default nextConfig
