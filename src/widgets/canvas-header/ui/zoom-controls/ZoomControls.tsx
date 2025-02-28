// 'use client'
import { useState } from 'react'

import { Button } from '@/shared/ui'

import MinusIcon from '/public/icons/minus.svg'
import PlusIcon from '/public/icons/plus.svg'

import { useZoomStore } from './model/useZoomStore'

export const ZoomControls = () => {
  const [scaleText, setScaleText] = useState<string>('100%')

  const numericScale = Number(scaleText.replace(/[^\d]/g, ''))
  const setScale = useZoomStore((state) => state.setScale)

  const handleZoomIn = () => {
    let newScale = numericScale + 10
    newScale = Math.min(newScale, 200)
    setScaleText(`${newScale}%`)
    setScale(newScale / 100)
  }

  const handleZoomOut = () => {
    let newScale = numericScale - 10
    newScale = Math.max(newScale, 20)
    setScaleText(`${newScale}%`)
    setScale(newScale / 100)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/[^\d]/g, '')
    const numericValue = Math.min(Math.max(Number(value), 20), 200)
    setScaleText(`${numericValue}%`)
    setScale(numericValue / 100)
  }

  return (
    <div
      id="zoom-controls"
      className="flex items-center gap-2 rounded-[.5rem] bg-[#202124] p-2 *:bg-[#202124]"
    >
      <Button onClick={handleZoomOut} variant="ghost" className="p-0">
        <span className="flex size-6 items-center justify-center">
          <MinusIcon />
        </span>
      </Button>
      <input
        type="text"
        value={scaleText}
        onChange={handleInputChange}
        className="w-12 text-center text-[0.875rem] text-white focus:outline-none"
      />
      <Button onClick={handleZoomIn} variant="ghost" className="p-0">
        <span className="flex size-6 items-center justify-center">
          <PlusIcon width="16px" stroke="#AEAFB5" />
        </span>
      </Button>
    </div>
  )
}
