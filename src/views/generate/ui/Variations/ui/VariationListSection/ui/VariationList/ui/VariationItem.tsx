import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { useEditorStore } from '@/views/generate/model/useEditorHistoryStore'

import { URL_VARIATION_IMAGE } from '@/entities/generate/constant'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'

import EditIcon from '/public/icons/edit.svg'

import { VariationLoadingSkeleton } from './VariationLoadingSkeleton'

interface VariationItemProps {
  item: Variation
  onClickVariation: () => void
}

export const VariationItem = (props: VariationItemProps) => {
  const { item, onClickVariation } = props
  const { variationId, isAiGenerated, progress } = item

  const searchParams = useSearchParams()

  const editedVariationList = useEditorStore((state) => state.items)

  const isGenerating = isAiGenerated && progress < 100
  const isSelectedVariation =
    searchParams.get('variationId') === variationId.toString()

  const isEdited = editedVariationList.has(variationId.toString())

  let imgUrl = ''

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    imgUrl = item.images[0]?.encryptedImageUrl
  } else {
    imgUrl =
      process.env.NEXT_PUBLIC_API_URL +
      `${URL_VARIATION_IMAGE}` +
      item.images[0]?.encryptedImageUrl
  }

  if (isGenerating) return <VariationLoadingSkeleton />

  return (
    <button
      className={cn(
        'rounded-[0.5rem] overflow-hidden relative aspect-[206/219] w-full border border-border hover:opacity-100 cursor-pointer focus:outline-none focus-visible:border-white focus-visible:border-1 focus-visible:ring-2 focus-visible:ring-ring',
        {
          'opacity-50': !isSelectedVariation
        }
      )}
      onClick={onClickVariation}
    >
      <Image src={imgUrl} alt="" fill style={{ objectFit: 'cover' }} />

      {isEdited ? <EditIndicator /> : null}
    </button>
  )
}

const EditIndicator = () => {
  return (
    <div className="p-[6px] absolute top-[6px] left-[6px] rounded-[4px] bg-neutral-0 bg-opacity-90 hover:opacity-100">
      <EditIcon />
    </div>
  )
}
