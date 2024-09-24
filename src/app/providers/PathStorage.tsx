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

  //   React.useEffect(() => {
  //     storePathValues()
  //     console.log(globalThis?.sessionStorage)
  //   }, [router])

  //   return <div className="text-white z-[100] fixed">path storage</div>
  // }

  // function storePathValues() {
  //   const storage = globalThis?.sessionStorage
  //   if (!storage) return
  //   // Set the previous path as the value of the current path.
  //   const prevPath = storage.getItem('currentPath')
  //   storage.setItem('prevPath', prevPath || '/')
  //   // Set the current path value by looking at the browser's location object.
  //   storage.setItem('currentPath', globalThis.location.pathname)
  return null
}
