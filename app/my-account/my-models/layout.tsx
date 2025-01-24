import type { Metadata } from 'next'

import { DefaultHeader } from '@/widgets/default-header'

export const metadata: Metadata = {
  title: 'My Models | My Account'
}

export default function MyModelsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* TODO: header 수정 */}
      <DefaultHeader />
      <main className="flex h-screen pt-14">{children}</main>
    </>
  )
}
