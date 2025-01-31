import { Suspense } from 'react'

import { DefaultHeader } from '@/widgets/default-header'
import { Sidebar } from '@/widgets/sidebar'

export default function CommonLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <DefaultHeader />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <div className="ml-[240px] flex-1 lg:ml-[280px]">{children}</div>
      </div>
    </Suspense>
  )
}
