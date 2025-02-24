import React, { useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable'

import Image from 'next/image'

import { getAssetUrl } from '@/views/canvas/lib/getAssetUrl'
import { useLayerVisibilityStore } from '@/views/canvas/model/useLayerVisibilityStore'

import { AI_TOOL } from '@/widgets/canvas-sidebar/model/types'

import { DummyData } from '@/entities/recent-items/model/types'

import { Asset } from '@/shared/api/types'

interface MovableEyeContactsProps {
  initialLeft: number
  initialTop: number
  initialWidth: number
  initialHeight: number
  imageAsset: DummyData | Asset
  transparency: number
  alt: string
  isShowBorder: boolean
  setIsShowBorder: (isShowBorder: boolean) => void
}

/**
 * 사용자가 드래그, 확대/축소 변환 가능한 컴포넌트
 * 내부에는 next/image를 사용하여 렌즈 이미지를 렌더링하며,
 * Moveable을 사용해 해당 컨테이너에 변환 제어 기능을 추가합니다.
 */
export const MovableEyeContacts = (props: MovableEyeContactsProps) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const activeTool = useLayerVisibilityStore((state) => state.activeTool)
  const [frame, setFrame] = useState({
    translate: [props.initialLeft, props.initialTop],
    rotate: 0,
    scale: 1,
    width: props.initialWidth,
    height: props.initialHeight
  })

  // targetRef 할당 후에 렌더링할 수 있도록 상태 관리
  const [targetReady, setTargetReady] = useState(false)
  useEffect(() => {
    if (targetRef.current) {
      setTargetReady(true)
    }
  }, [])

  return (
    <>
      <div
        ref={targetRef}
        style={{
          position: 'absolute',
          width: frame.width,
          height: frame.height,
          transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg) scale(${frame.scale})`,
          opacity: props.transparency
        }}
      >
        <Image
          src={getAssetUrl(props.imageAsset)}
          alt={props.alt}
          layout="fill"
          objectFit="contain"
          onClick={(e) => {
            e.stopPropagation()
            props.setIsShowBorder(true)
          }}
        />
      </div>
      {targetReady &&
        props.isShowBorder &&
        activeTool === AI_TOOL.EYE_CONTACTS && (
          <Moveable
            target={targetRef.current}
            container={null}
            origin={false}
            edge={false}
            renderDirections={['nw', 'ne', 'sw', 'se']}
            /* 드래그(이동) 옵션 */
            draggable={true}
            onDragStart={({ set }) => {
              set([...frame.translate])
            }}
            throttleDrag={0}
            onDrag={({ beforeTranslate }) => {
              setFrame((prev) => ({
                ...prev,
                translate: beforeTranslate
              }))
            }}
            /* 확대/축소 옵션 */
            scalable={true}
            throttleScale={0}
            onScale={({ scale, drag }) => {
              setFrame((prev) => ({
                ...prev,
                scale: scale[0],
                width: props.initialWidth * scale[0],
                height: props.initialHeight * scale[1],
                translate: [drag.beforeTranslate[0], drag.beforeTranslate[1]]
              }))
            }}
          />
        )}
    </>
  )
}
