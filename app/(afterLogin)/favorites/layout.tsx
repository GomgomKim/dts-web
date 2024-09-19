'use client'

import { Suspense } from 'react'

import { Header } from '@/widgets/Header'

import { Sidebar } from '@/widgets'

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
