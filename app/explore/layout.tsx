import { Suspense } from 'react'

import type { Metadata } from 'next'

import { Footer } from '@/widgets/footer'
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
        <div className="ml-[280px] flex-1 px-12 pt-14">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </Suspense>
  )
}
