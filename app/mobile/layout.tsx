import { Suspense } from 'react'

import { MobileHeader } from '@/widgets/MobileHeader'

export default function MobileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MobileHeader />
      <div className="pt-14 overflow-hidden h-screen">
        <main className="h-full">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </>
  )
}
