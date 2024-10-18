import { Suspense } from 'react'

import { Metadata } from 'next'

import { Header } from '@/widgets/Header'

export const metadata: Metadata = {
  title: 'Generate'
}

export default function GeneratePageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Header />
      <main className="pt-16 pr-5 pb-5 h-screen">{children}</main>
    </Suspense>
  )
}
