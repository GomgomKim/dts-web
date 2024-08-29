'use client'

import Explore from '@/views/explore/ui'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading explore page...</div>}>
      <Explore />
    </Suspense>
  )
}
