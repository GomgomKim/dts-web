import * as React from 'react'

import Image from 'next/image'

import { useEditorStore } from '@/views/generate/model/useEditorHistoryStore'

import { URL_VARIATION_IMAGE } from '@/entities/generate/constant'

import { Variation } from '@/shared/api/types'

interface ImageViewProps {
  selectedVariation: Variation | null
}

export const ImageView = (props: ImageViewProps) => {
  const editedVariationList = useEditorStore((state) => state.items)

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
  return <Image src={imgUrl} alt="" fill style={{ objectFit: 'contain' }} />
}
