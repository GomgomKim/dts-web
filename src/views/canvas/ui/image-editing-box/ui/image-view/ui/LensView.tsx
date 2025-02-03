import Image from 'next/image'

import { getAssetUrl } from '@/views/canvas/lib/getAssetUrl'
import { lensPositions } from '@/views/canvas/model/LensDummyData'
import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { Variation } from '@/shared/api/types'

interface LensViewProps {
  imgUrl: string
  selectedVariation: Variation
  targetSize: number
}

export const LensView = (props: LensViewProps) => {
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const eyeContactsTransparency = useEyeContactsStore(
    (state) => state.transparency
  )
  const lensPosData = lensPositions(props.selectedVariation.images[0].ratio)
  const leftEyePos = lensPosData.left_eye
  const rightEyePos = lensPosData.right_eye
  const originalWidth = 1280
  const scale = props.targetSize / originalWidth

  return (
    <div className="relative size-[45.75rem]">
      {/* 메인 모델 이미지 */}
      <Image src={props.imgUrl} alt="" fill style={{ objectFit: 'contain' }} />

      {/*  Back 레이어  */}
      <Image
        src={props.selectedVariation.images[0].encryptedImageUrl}
        alt="back layer"
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
          <Image
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
          <Image
            src={getAssetUrl(selectedEyeContactsItem)}
            alt={'right eyeContactsItem'}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      {/* fore 레이어 */}
      <Image
        src={props.selectedVariation.images[0].lensFore}
        alt="fore layer"
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}
