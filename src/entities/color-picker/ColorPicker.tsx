'use client'

import React, { useEffect } from 'react'
import { Alpha, Hue, IColor, Saturation, useColor } from 'react-color-palette'
import 'react-color-palette/css'

import { useColorBrushStore } from '@/views/canvas/model/useEditorPanelsStore'

import ColorizeIcon from '/public/icons/colorize.svg'

import { DEFAULT_COLOR } from './constants'
import './styles.css'

export const ColorPicker = () => {
  const setColorBrushColor = useColorBrushStore(
    (state) => state.setColorBrushColor
  )
  const setColorBrushOpacity = useColorBrushStore(
    (state) => state.setColorBrushOpacity
  )
  // 컬러피커용 훅
  const [color, setColor] = useColor(DEFAULT_COLOR)

  useEffect(() => {
    // 초기 색상의 알파값 설정
    handleChangeColor({
      ...color,
      rgb: { ...color.rgb, a: 0.3 },
      hsv: { ...color.hsv, a: 0.3 }
    })
  }, [])

  /**
   * 컬러피커에서 색상이 바뀔 때 호출됨.
   * newColor.rgb.r/g/b는 보통 0~255 범위의 float 값이 들어있을 수 있음.
   */
  const handleChangeColor = (newColor: IColor) => {
    setColor(newColor)

    // 소수점을 정수로 반올림 (react-color-palette가 float로 줄 수 있음)
    const r = Math.round(newColor.rgb.r)
    const g = Math.round(newColor.rgb.g)
    const b = Math.round(newColor.rgb.b)
    const a = newColor.rgb.a ?? 0.3

    setColorBrushColor([r, g, b])
    setColorBrushOpacity(a)
  }

  return (
    <div className="flex flex-col gap-4">
      <Saturation color={color} onChange={handleChangeColor} height={160} />

      <div className="flex gap-4">
        <div
          className="flex size-12 rounded-[0.417rem]"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex flex-1 flex-col gap-2">
          <Hue color={color} onChange={handleChangeColor} />
          <Alpha color={color} onChange={handleChangeColor} />
        </div>
      </div>

      <div className="flex h-[2.063rem] min-w-0 items-center pl-3">
        <div className="flex size-6 shrink-0">
          <ColorizeIcon />
        </div>
        <div className="ml-7 flex min-w-0 flex-1 gap-2">
          <input
            type="text"
            value={color.hex.toUpperCase().slice(0, 7)}
            className="min-w-0 shrink basis-[13.875rem] bg-neutral-2 px-3 py-2 text-sm font-medium text-neutral-7"
          />
          <input
            type="text"
            value={Math.round((color.rgb.a ?? 0.3) * 100) + '%'}
            className="min-w-0 shrink basis-[4.125rem] bg-neutral-2 px-3 py-2 text-sm font-medium text-neutral-7"
          />
        </div>
      </div>
    </div>
  )
}
