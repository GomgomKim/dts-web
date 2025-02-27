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
    <>
      <DefaultHeader />
      <main className="flex h-screen pt-14">{children}</main>
    </>
  )
}
