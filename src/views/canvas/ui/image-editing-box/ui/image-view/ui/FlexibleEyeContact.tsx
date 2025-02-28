import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Image as KonvaImage } from 'react-konva'

import { getAssetUrl } from '@/views/canvas/lib/getAssetUrl'

import { DummyData } from '@/entities/recent-items/model/types'

import { Asset } from '@/shared/api/types'

import Konva from 'konva'
import useImage from 'use-image'

interface FlexibleEyeContactProps {
  initialLeft: number
  initialTop: number
  initialWidth: number
  initialHeight: number
  imageAsset: DummyData | Asset
  transparency: number
  alt: string
  isShowBorder: boolean
  setIsShowBorder: (isShowBorder: boolean) => void
  attachTransformer: () => void
}

export const FlexibleEyeContact = forwardRef(
  (props: FlexibleEyeContactProps, ref) => {
    const [frame, setFrame] = useState({
      x: props.initialLeft,
      y: props.initialTop,
      width: props.initialWidth,
      height: props.initialHeight
    })

    useEffect(() => {
      setFrame({
        x: props.initialLeft,
        y: props.initialTop,
        width: props.initialWidth,
        height: props.initialHeight
      })
    }, [
      props.initialLeft,
      props.initialTop,
      props.initialWidth,
      props.initialHeight
    ])

    const assetUrl = getAssetUrl(props.imageAsset)
    const [image] = useImage(
      typeof assetUrl === 'string' ? assetUrl : assetUrl.src,
      'anonymous'
    )

    const initialDimensions = useRef({
      width: props.initialWidth,
      height: props.initialHeight
    })

    const imageRef = useRef<Konva.Image>(null)
    useImperativeHandle(ref, () => imageRef.current as Konva.Image, [])

    return (
      <>
        <KonvaImage
          image={image}
          alt={props.alt}
          x={frame.x}
          y={frame.y}
          width={frame.width}
          height={frame.height}
          opacity={props.transparency}
          draggable
          onClick={(e: Konva.KonvaEventObject<MouseEvent>) => {
            e.cancelBubble = true
            props.setIsShowBorder(true)
            props.attachTransformer()
          }}
          onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
            setFrame((prev) => ({
              ...prev,
              x: e.target.x(),
              y: e.target.y()
            }))
            props.attachTransformer()
          }}
          onTransformEnd={() => {
            const node = imageRef.current
            if (node) {
              const newScaleX = node.scaleX()
              const newScaleY = node.scaleY()
              const newWidth = initialDimensions.current.width * newScaleX
              const newHeight = initialDimensions.current.height * newScaleY
              node.width(newWidth)
              node.height(newHeight)
              node.scaleX(1)
              node.scaleY(1)
              setFrame({
                x: node.x(),
                y: node.y(),
                width: newWidth,
                height: newHeight
              })
              // 누적 변환을 위해 초기 치수 업데이트
              initialDimensions.current = { width: newWidth, height: newHeight }
              props.setIsShowBorder(true)
              props.attachTransformer()
            }
          }}
          ref={imageRef}
        />
      </>
    )
  }
)

FlexibleEyeContact.displayName = 'FlexibleEyeContact'
