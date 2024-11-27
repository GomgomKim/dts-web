import { Suspense } from 'react'

import type { Metadata } from 'next'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export const metadata: Metadata = {
  title: 'Explore'
}

export default function ExploreLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Header />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <main className="ml-[280px] flex-1 px-12 py-14">{children}</main>
      </div>
    </Suspense>
  )
}
