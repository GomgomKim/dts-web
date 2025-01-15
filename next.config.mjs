// import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
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
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_GOOGLE_IMAGE_HOST_NAME
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://api.dtsdevs.com/api/:path*',
          basePath: false
        }
      ]
    }
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ]
  }
}

// const buildEnv = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development'

// let projectName
// switch (buildEnv) {
//   case 'development':
//     projectName = 'dts-web-dev'
//     break
//   case 'production':
//     projectName = 'dts-web-prod'
//     break
//   default:
//     projectName = 'dts-web-dev'
// }

// const sentryConfig = {
//   org: 'growdle-k2',
//   project: projectName,
//   silent: !process.env.CI,
//   widenClientFileUpload: true,
//   reactComponentAnnotation: {
//     enabled: true
//   },
//   tunnelRoute: '/monitoring',
//   hideSourceMaps: true,
//   disableLogger: true,
//   automaticVercelMonitors: true
// }

// const configs = () => {
//   const isProduction = process.env.NODE_ENV === 'production'

//   if (isProduction) {
//     // production 환경에서만 Sentry 설정을 적용
//     return withSentryConfig(nextConfig, sentryConfig)
//   } else {
//     // 개발 환경에서는 Sentry 설정을 적용하지 않음
//     return nextConfig
//   }
// }

// export default configs

export default nextConfig
