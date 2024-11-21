'use client'

import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { usePathStore } from '@/shared/lib/stores/usePathStore'

export const PathStorage = () => {
  const pathname = usePathname() // 현재 경로 가져오기
  const { currentPath, updateCurrentPath } = usePathStore()

  useEffect(() => {
    if (pathname !== currentPath) {
      updateCurrentPath(pathname) // Zustand 상태 업데이트
    }
  }, [pathname])

  return null
}
