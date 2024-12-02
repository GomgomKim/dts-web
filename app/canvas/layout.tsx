import type { Metadata } from 'next'

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
    {/* Canvas용 TODO 헤더 추가 예정 */}
      <main className="pr-5 pt-3 md:px-12">{children}</main>
    </>
)
}
