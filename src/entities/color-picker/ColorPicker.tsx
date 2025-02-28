'use client'

import React, { useEffect } from 'react'
import { Alpha, Hue, IColor, Saturation, useColor } from 'react-color-palette'
import 'react-color-palette/css'

import {
  useColorBrushStore,
  useColorChangeStore,
  useHairColorStore
} from '@/views/canvas/model/useEditorPanelsStore'

import ColorizeIcon from '/public/icons/colorize.svg'

import { DEFAULT_COLOR } from './constants'
import { rgbToHex, rgbToHsv } from './lib/rgbToHsv'
import './styles.css'

interface ColorPickerProps {
  isHairColor?: boolean
}

export const ColorPicker = (props: ColorPickerProps) => {
  // 컬러피커용 훅
  const [color, setColor] = useColor(DEFAULT_COLOR)
  const setColorBrushColor = useColorBrushStore(
    (state) => state.setColorBrushColor
  )
  const setColorBrushOpacity = useColorBrushStore(
    (state) => state.setColorBrushOpacity
  )

  const hairColor = useHairColorStore((state) => state.hairColor)
  const setHairColor = useHairColorStore((state) => state.setHairColor)
  const hairColorOpacity = useHairColorStore((state) => state.hairColorOpacity)
  const setHairColorOpacity = useHairColorStore(
    (state) => state.setHairColorOpacity
  )
  const updateBrushColor = useColorBrushStore((state) => state.updateBrushColor)
  const selectedColorBrushItem = useColorBrushStore(
    (state) => state.selectedColorBrushItem
  )
  const setColorChangeStatus = useColorChangeStore(
    (state) => state.setColorChangeStatus
  )

  // 선택된 브러시의 색상으로 컬러피커 색상 업데이트
  useEffect(() => {
    if (
      !props.isHairColor &&
      selectedColorBrushItem?.color &&
      selectedColorBrushItem.opacity
    ) {
      const [r, g, b] = selectedColorBrushItem.color
      const hex = rgbToHex(r, g, b)
      const hsv = rgbToHsv(r, g, b)
      setColor({
        hex,
        rgb: { r, g, b, a: selectedColorBrushItem.opacity },
        hsv: { ...hsv, a: selectedColorBrushItem.opacity }
      })
      setColorBrushColor(selectedColorBrushItem.color)
      setColorBrushOpacity(selectedColorBrushItem.opacity)
    }
  }, [selectedColorBrushItem])

  useEffect(() => {
    if (props.isHairColor && hairColor) {
      const [r, g, b] = hairColor
      const hex = rgbToHex(r, g, b)
      const hsv = rgbToHsv(r, g, b)

      setColor({
        hex,
        rgb: { r, g, b, a: hairColorOpacity },
        hsv: { ...hsv, a: hairColorOpacity }
      })
    }
  }, [props.isHairColor, hairColor])

  /**
   * 컬러피커에서 색상이 바뀔 때 호출됨.
   * newColor.rgb.r/g/b는 보통 0~255 범위의 float 값이 들어있을 수 있음.
   */
  const handleChangeColor = (newColor: IColor) => {
    setColor(newColor)

    const r = Math.round(newColor.rgb.r)
    const g = Math.round(newColor.rgb.g)
    const b = Math.round(newColor.rgb.b)
    const a = newColor.rgb.a ?? 0.3

    if (props.isHairColor) {
      setHairColor([r, g, b])
      setHairColorOpacity(a)
    }
    if (!props.isHairColor) {
      setColorBrushColor([r, g, b])
      setColorBrushOpacity(a)
      if (selectedColorBrushItem?.id) {
        updateBrushColor(selectedColorBrushItem.id, [r, g, b])
      }
    }
  }

  const handleChangeColorComplete = () => {
    setColorChangeStatus()
  }

  return (
    <div
      className="flex flex-col gap-4"
      onMouseDown={(e) => {
        e.nativeEvent.stopImmediatePropagation()
      }}
      onTouchStart={(e) => {
        e.nativeEvent.stopImmediatePropagation()
      }}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation()
      }}
    >
      <Saturation
        color={color}
        onChange={handleChangeColor}
        onChangeComplete={handleChangeColorComplete}
        height={160}
      />

      <div className="flex gap-4">
        <div
          className="flex size-12 rounded-[0.417rem]"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex flex-1 flex-col gap-2">
          <Hue
            color={color}
            onChange={handleChangeColor}
            onChangeComplete={handleChangeColorComplete}
          />
          <Alpha
            color={color}
            onChange={handleChangeColor}
            onChangeComplete={handleChangeColorComplete}
          />
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
