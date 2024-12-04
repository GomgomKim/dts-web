import type { Metadata } from 'next'

import { DefaultHeader } from '@/widgets/default-header'

export const metadata: Metadata = {
  title: 'Canvas'
}

export default function CanvasLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <DefaultHeader />
      <main className="h-screen pt-14">{children}</main>
    </>
  )
}
