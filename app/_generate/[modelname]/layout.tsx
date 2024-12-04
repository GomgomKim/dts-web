import { Suspense } from 'react'

import { Metadata } from 'next'

import { DefaultHeader } from '@/widgets/default-header'

export const metadata: Metadata = {
  title: 'Generate'
}

export default function GeneratePageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense>
      <DefaultHeader />
      <main className="h-[calc(var(--vh,1vh)*100)] pb-5 pr-5 pt-16">
        {children}
      </main>
    </Suspense>
  )
}
