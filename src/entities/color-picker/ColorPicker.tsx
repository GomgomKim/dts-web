import React, { ChangeEvent } from 'react'
import { Alpha, Hue, IColor, Saturation, useColor } from 'react-color-palette'
import 'react-color-palette/css'

import ColorizeIcon from '/public/icons/colorize.svg'

import { ALPHA_MAX, DEFAULT_COLOR, HEX_REGEX } from './constants'
import './styles.css'

export const ColorPicker = () => {
  const [color, setColor] = useColor(DEFAULT_COLOR)

  const handleChangeColor = (newColor: IColor) => {
    setColor(newColor)
  }

  const handleChangeHex = (e: ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value.trim()
    if (HEX_REGEX.test(hexValue)) {
      setColor({ ...color, hex: hexValue.toLowerCase() })
    }
  }

  const handleChangeAlpha = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace('%', ''), 10)
    if (!isNaN(val) && val >= 0 && val <= ALPHA_MAX) {
      const newAlpha = val / 100
      setColor({
        ...color,
        rgb: { ...color.rgb, a: newAlpha },
        hsv: { ...color.hsv, a: newAlpha }
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Saturation 영역 */}
      <Saturation color={color} onChange={handleChangeColor} height={160} />

      <div className="flex gap-4">
        {/* Color Lump (선택 색상 표시) */}
        <div
          className="flex size-12 rounded-[0.417rem]"
          style={{ backgroundColor: color.hex }}
        />

        {/* Hue & Alpha 슬라이더 */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Hue 슬라이더 */}
          <Hue color={color} onChange={handleChangeColor} />

          {/* Alpha 슬라이더 */}
          <Alpha color={color} onChange={handleChangeColor} />
        </div>
      </div>

      {/* Color Code & Alpha */}
      <div className="flex h-[2.063rem] min-w-0 items-center pl-3">
        <div className="flex size-6 shrink-0">
          <ColorizeIcon />
        </div>

        <div className="ml-7 flex min-w-0 flex-1 gap-2">
          <input
            type="text"
            value={color.hex.toUpperCase().slice(0, 6)}
            onChange={handleChangeHex}
            className="min-w-0 shrink basis-[13.875rem] bg-neutral-2 px-3 py-2 text-sm font-medium text-neutral-7"
          />
          <input
            type="text"
            value={Math.round((color.rgb.a ?? 1) * 100) + '%'}
            onChange={handleChangeAlpha}
            className="min-w-0 shrink basis-[4.125rem] bg-neutral-2 px-3 py-2 text-sm font-medium text-neutral-7"
          />
        </div>
      </div>
    </div>
  )
}
