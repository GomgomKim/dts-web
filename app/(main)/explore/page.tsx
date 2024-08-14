import Explore from '@/views/explore/ui'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <Explore />
    </Suspense>
  )
}
