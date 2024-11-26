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
      <div className="h-screen overflow-hidden pt-14">
        <main className="h-full">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </>
  )
}
