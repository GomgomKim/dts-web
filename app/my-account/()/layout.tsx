import { DefaultHeader } from '@/widgets/default-header'

import { BackButton } from '@/entities/back-button'

export default function MyAccountLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* TODO: header 수정 */}
      <DefaultHeader />
      <div className="h-screen pt-14">
        <main className="px-10 pb-36 pt-5">
          <BackButton className="mb-5" />
          {children}
        </main>
      </div>
    </>
  )
}
