import { Suspense } from 'react'

import type { Metadata } from 'next'

import { Footer } from '@/widgets/footer'

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
      <div className="pr-5 pt-14">
        <main>{children}</main>
        <Footer />
      </div>
    </Suspense>
  )
}
