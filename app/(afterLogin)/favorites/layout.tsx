'use client'

import { Sidebar } from '@/widgets'
import { Header } from '@/widgets/Header'
import { Suspense } from 'react'

export default function FavoritePageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Header />
      <div className="flex pt-14 h-screen">
        <Sidebar />
        <main className="p-12 ml-[280px] flex-1">{children}</main>
      </div>
    </Suspense>
  )
}
