import * as React from 'react'

import AuthCheck from '@/app/providers/AuthCheck'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthCheck>{children}</AuthCheck>
}
