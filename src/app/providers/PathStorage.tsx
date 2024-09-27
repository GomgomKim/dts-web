'use client'

import * as React from 'react'

import { usePathname } from 'next/navigation'

import { usePathStore } from '@/shared/lib/stores/usePathStore'

export const PathStorage = () => {
  const pathname = usePathname() // 현재 경로 가져오기
  const { currentPath, updateCurrentPath } = usePathStore()

  React.useEffect(() => {
    if (pathname !== currentPath) {
      updateCurrentPath(pathname) // Zustand 상태 업데이트
    }
  }, [pathname])

  return null
}
