import { Suspense } from 'react'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ModalsProvider } from '@/app/providers/ModalsProvider'
import { NetworkError } from '@/app/providers/NetworkError'
import { PathStorage } from '@/app/providers/PathStorage'
import { AxiosInterceptorWrapper } from '@/app/providers/axios-interceptor-wrapper'
import { MSWComponent } from '@/app/providers/msw-component'
import { ReactQueryProviders } from '@/app/providers/query-client-provider'
import '@/app/styles/globals.css'

import Loading from './loading'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Do Things Studio',
    default: 'Do Things Studio'
  },
  description:
    'AI 기술을 활용해 우리 브랜드에 맞는 모델을 빠르고 쉽게 생성하고, 원하는 스타일로 커스터마이징할 수 있습니다. 브랜드 마케팅과 캠페인에 최적화된 AI 모델 솔루션을 경험하세요.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico'
  },
  openGraph: {
    title: 'Do Things Studio',
    description:
      'AI 기술을 활용해 우리 브랜드에 맞는 모델을 빠르고 쉽게 생성하고, 원하는 스타일로 커스터마이징할 수 있습니다. 브랜드 마케팅과 캠페인에 최적화된 AI 모델 솔루션을 경험하세요.',
    // url: 'https://example.com',
    siteName: 'Do Things Studio',
    images: [
      {
        url: 'https://api.dtsdevs.com/logo.png',
        width: 800,
        height: 600
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do Things Studio',
    description:
      'AI 기술을 활용해 우리 브랜드에 맞는 모델을 빠르고 쉽게 생성하고, 원하는 스타일로 커스터마이징할 수 있습니다. 브랜드 마케팅과 캠페인에 최적화된 AI 모델 솔루션을 경험하세요.'
    // creator: "@"
  }
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <MSWComponent />
      <body className={`${pretendard.variable} font-pretendard`}>
        <ReactQueryProviders>
          <AxiosInterceptorWrapper>
            <PathStorage />
            <NetworkError>
              <Suspense fallback={<Loading />}>
                <ModalsProvider>
                  {children}
                  {modal}
                </ModalsProvider>
              </Suspense>
              <div id="modal-root" />
            </NetworkError>
          </AxiosInterceptorWrapper>
        </ReactQueryProviders>
      </body>
    </html>
  )
}
