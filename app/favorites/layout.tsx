import { Suspense } from 'react'

import type { Metadata } from 'next'

import { Header } from '@/widgets/Header'

import { Sidebar } from '@/widgets'

export const metadata: Metadata = {
  title: 'Favorites'
}

export default function FavoritePageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Header />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <main className="ml-[280px] flex-1 pr-10 pt-5">{children}</main>
      </div>
    </Suspense>
  )
}
