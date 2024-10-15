import { Suspense } from 'react'

import type { Metadata } from 'next'

import { Header } from '@/widgets/Header'

import { Sidebar } from '@/widgets'

export const metadata: Metadata = {
  title: 'explore'
}

export default function ExploreLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Header />
      <div className="flex pt-14 h-screen">
        <Sidebar />
        <main className="px-12 py-14 ml-[280px] flex-1">{children}</main>
      </div>
    </Suspense>
  )
}
