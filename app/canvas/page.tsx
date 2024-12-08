'use client'

import { useRef } from 'react'

import Canvas from '@/views/canvas'

import { CanvasHeader } from '@/widgets/canvas-header'

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <CanvasHeader canvasRef={canvasRef} />
      <main className="h-screen pt-14">
        <Canvas canvasRef={canvasRef} />
      </main>
    </>
  )
}
