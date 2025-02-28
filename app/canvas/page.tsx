'use client'

import { useRef } from 'react'

import dynamic from 'next/dynamic'

import { CanvasHeader } from '@/widgets/canvas-header'

import { LoadingSpinner } from '@/shared/ui/loading-spinner'

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const DynamicCanvas = dynamic(() => import('@/views/canvas'), {
    ssr: false,
    loading: () => <LoadingSpinner width="100px" height="100px" />
  })
  return (
    <>
      <CanvasHeader canvasRef={canvasRef} />
      <main className="h-screen pt-14">
        <DynamicCanvas canvasRef={canvasRef} />
      </main>
    </>
  )
}
