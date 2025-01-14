'use client'

import Image from 'next/image'

import { useEditorStore } from '@/views/_generate/model/useEditorHistoryStore'
import { lensPositions } from '@/views/canvas/model/LensDummyData'
import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { URL_VARIATION_IMAGE } from '@/entities/generate/constant'

import { Variation } from '@/shared/api/types'

interface ImageViewProps {
  selectedVariation: Variation | null
}

export const ImageView = (props: ImageViewProps) => {
  const editedVariationList = useEditorStore((state) => state.items)
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const eyeContactsTransparency = useEyeContactsStore(
    (state) => state.transparency
  )

  if (!props.selectedVariation) return null

  const { variationId, images } = props.selectedVariation

  let imgUrl = ''
  if (editedVariationList.has(variationId.toString())) {
    const presentProperty = editedVariationList.get(
      variationId.toString()
    )?.present
    const presentAspectRatio = presentProperty!.ratio

    const presentVariation = props.selectedVariation!.images!.find((item) => {
      return item.ratio === presentAspectRatio
    })

    imgUrl =
      process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
        ? presentVariation!.encryptedImageUrl
        : process.env.NEXT_PUBLIC_API_URL +
          URL_VARIATION_IMAGE +
          presentVariation!.encryptedImageUrl
  } else {
    imgUrl =
      process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
        ? images[0]?.encryptedImageUrl
        : process.env.NEXT_PUBLIC_API_URL +
          URL_VARIATION_IMAGE +
          images[0]?.encryptedImageUrl
  }

  const lensPosData = lensPositions(props.selectedVariation.images[0].ratio)
  const leftEyePos = lensPosData.left_eye
  const rightEyePos = lensPosData.right_eye

  const originalWidth = 1280
  const scale = 732 / originalWidth

  return (
    <div className="relative size-[45.75rem]">
      {/* 메인 모델 이미지 */}
      <Image src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />

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
            src={selectedEyeContactsItem.src}
            alt={selectedEyeContactsItem.name}
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
            src={selectedEyeContactsItem.src}
            alt={selectedEyeContactsItem.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      {/* fore 레이어 */}
      <Image
        src="/images/lens-fore.png"
        alt="fore layer"
        fill
        style={{ objectFit: 'contain' }}
      />
      {/* fore 레이어 */}
    </div>
  )
}
