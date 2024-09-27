import * as React from 'react'

import Image from 'next/image'

import { useEditorStore } from '@/views/detail/model/useEditorHistoryStore'

import { URL_VARIATION_IMAGE } from '@/entities/detail/constant'

import { Variation } from '@/shared/api/types'

interface ImageViewProps {
  selectedVariation: Variation | null
  onChangeImage: () => void
}

export const ImageView = (props: ImageViewProps) => {
  const editedVariationList = useEditorStore((state) => state.items)

  const variationCurrent =
    (props.selectedVariation &&
      editedVariationList.get(props.selectedVariation.variationId.toString())
        ?.present) ||
    null

  React.useEffect(() => {
    if (props.selectedVariation) {
      props.onChangeImage()
    }
  }, [props.selectedVariation, variationCurrent])

  if (!props.selectedVariation) return null

  const { variationId, images } = props.selectedVariation

  let imgUrl = ''
  if (editedVariationList.has(variationId.toString())) {
    const presentProperty = editedVariationList.get(
      variationId.toString()
    )?.present
    const presentAspectRatio = presentProperty!.ratio
    const presentFaceAngle = presentProperty!.angle

    const presentVariation = props.selectedVariation!.images!.find((item) => {
      return (
        item.ratio === presentAspectRatio && item.angle === presentFaceAngle
      )
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
  return <Image src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />
}
