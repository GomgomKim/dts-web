import { Suspense } from 'react'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export default function CommonLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <Header />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <div className="ml-[240px] flex-1 md:ml-[280px]">{children}</div>
      </div>
    </Suspense>
  )
}
