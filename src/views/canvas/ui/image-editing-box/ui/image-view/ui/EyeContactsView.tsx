import { forwardRef, useEffect, useState } from 'react'

import NextImage from 'next/image'

import { getBlackEyesFace } from '@/views/canvas/lib/eyeContactsService'
import { getAssetUrl } from '@/views/canvas/lib/getAssetUrl'
import { lensPositions } from '@/views/canvas/model/LensDummyData'
import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

interface EyeContactsViewProps {
  imgUrl: string
  targetSize: number
  modelMat: cv.Mat | null
  maskMat: cv.Mat | null
}

export const EyeContactsView = forwardRef<
  HTMLCanvasElement,
  EyeContactsViewProps
>((props, ref) => {
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const eyeContactsTransparency = useEyeContactsStore(
    (state) => state.transparency
  )
  const lensPosData = lensPositions('ASPECT_RATIO_1_1')
  const leftEyePos = lensPosData.left_eye
  const rightEyePos = lensPosData.right_eye
  const originalWidth = 1280
  const scale = props.targetSize / originalWidth

  const [foreLayer, setForeLayer] = useState<string | null>(null)

  useEffect(() => {
    // modelMat와 maskMat이 모두 준비되었을 때 실행
    console.log('modelMat', props.modelMat, props.maskMat)
    if (!props.modelMat || !props.maskMat) return

    const foreBase64 = getBlackEyesFace(props.modelMat, props.maskMat)
    // console.log('foreBase64', foreBase64)
    setForeLayer(foreBase64)
  }, [props.modelMat, props.maskMat])

  return (
    <div className="relative size-[45.75rem]">
      <canvas
        ref={ref}
        width={props.targetSize}
        height={props.targetSize}
        className="absolute left-0 top-0"
      />

      {/* 메인 모델 이미지 */}
      <NextImage
        src={props.imgUrl}
        alt=""
        fill
        style={{ objectFit: 'contain' }}
      />

      {/* 렌즈 레이어 */}
      {selectedEyeContactsItem && leftEyePos && (
        <div
          style={{
            position: 'absolute',
            left: leftEyePos.xmin * scale,
            top: leftEyePos.ymin * scale,
            width: (leftEyePos.xmax - leftEyePos.xmin) * scale,
            height: (leftEyePos.ymax - leftEyePos.ymin) * scale,
            opacity: eyeContactsTransparency / 100
          }}
        >
          <NextImage
            src={getAssetUrl(selectedEyeContactsItem)}
            alt={'left eyeContactsItem'}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      {selectedEyeContactsItem && rightEyePos && (
        <div
          style={{
            position: 'absolute',
            left: rightEyePos.xmin * scale,
            top: rightEyePos.ymin * scale,
            width: (rightEyePos.xmax - rightEyePos.xmin) * scale,
            height: (rightEyePos.ymax - rightEyePos.ymin) * scale,
            opacity: eyeContactsTransparency / 100
          }}
        >
          <NextImage
            src={getAssetUrl(selectedEyeContactsItem)}
            alt={'right eyeContactsItem'}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999
        }}
      >
        {/* fore 레이어: getBlackEyesFace 로 생성한 이미지 활용 */}
        {foreLayer ? (
          <NextImage
            src={foreLayer}
            alt="fore layer"
            width={props.targetSize}
            height={props.targetSize}
            style={{ objectFit: 'contain' }}
          />
        ) : null}
      </div>
    </div>
  )
})

EyeContactsView.displayName = 'EyeContactsView'

export default EyeContactsView
