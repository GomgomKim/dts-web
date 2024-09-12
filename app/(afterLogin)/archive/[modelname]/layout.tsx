'use client'

import { Header } from '@/widgets/Header'
import { Suspense } from 'react'

export default function DetailPageLayout({
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
