'use client'

import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_MAP,
  SKIN_TEXTURE_MAP
} from '@/entities/detail/constant'

import { Variation } from '@/shared/api/types'
import { Badge, Button } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

import { useEditorStore } from '../../model/useEditorHistoryStore'

const SKIN_TEXTURE_OPTIONS = Object.values(SKIN_TEXTURE_MAP)
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

interface EditVariationProps {
  isLoading: boolean
  selectedVariation: Variation | null
}

export const EditVariation = (props: EditVariationProps) => {
  const searchParams = useSearchParams()

  const { setInitialProperty, applyEdit } = useEditorStore.getState()
  const editedVariationList = useEditorStore((state) => state.items)

  const [aspectRatio, setAspectRatio] = React.useState<string>('') // 9:16

  const variationId = searchParams.get('variationId')
  const handleClickApplyEditOptions = () => {
    if (!variationId) {
      alert('variationId is not found')
      return
    }

    if (!props.selectedVariation) {
      alert('selectedVariation is not found')
      return
    }

    if (!editedVariationList.has(variationId)) {
      const { ratio } = props.selectedVariation.images[0]
      setInitialProperty(variationId, { ratio })
    }

    applyEdit(variationId, {
      ratio: ASPECT_RATIO_REVERT_MAP[aspectRatio]
    })
  }

  const isSamePresentOption = React.useCallback(() => {
    if (!variationId) return true
    if (editedVariationList.has(variationId)) {
      const { ratio: presentAspectRatio } =
        editedVariationList.get(variationId)!.present
      return presentAspectRatio === ASPECT_RATIO_REVERT_MAP[aspectRatio]
    }

    return aspectRatio === '9:16'
  }, [variationId, aspectRatio, editedVariationList])

  React.useEffect(() => {
    if (!variationId) return
    if (!props.selectedVariation) return

    if (editedVariationList.has(variationId)) {
      const { ratio } = editedVariationList.get(variationId)!.present
      setAspectRatio(ASPECT_RATIO_MAP[ratio])
      return
    }

    const { ratio } = props.selectedVariation.images[0]

    setAspectRatio(ASPECT_RATIO_MAP[ratio])
  }, [variationId, props.selectedVariation, editedVariationList])

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-[1.25rem] min-[1512px]:text-[1.5rem] min-[3840px]:text-[2rem] font-semibold">
        Edit
      </h2>

      {/* options - Aspect Ratio */}
      <article>
        <h3 className="mb-5 text-[0.875rem] min-[3840px]:text-[1.25rem] text-neutral-7">
          Aspect Ratio
        </h3>
        <RadioGroup
          id="aspectRatio"
          value={aspectRatio}
          onChangeValue={(value: string) => setAspectRatio(value)}
          disabled={props.isLoading}
        >
          {ASPECT_RATIO_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </article>

      {/* options - Face Angle */}
      <article>
        <div className="mb-5 flex items-center">
          <h3 className="text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem] opacity-50">
            Face Angle
          </h3>
          <Badge className="ml-[8px]">Upcoming</Badge>
        </div>
        <RadioGroup id="faceAngle" value="" onChangeValue={() => {}} disabled>
          {FACE_ANGLE_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </article>

      {/* options - Skin Texture */}
      <article>
        <div className="mb-5 flex items-center">
          <h3 className="text-neutral-7 text-[0.875rem] min-[3840px]:text-[1.25rem] opacity-50">
            Skin Texture
          </h3>
          <Badge className="ml-[8px]">Upcoming</Badge>
        </div>
        <RadioGroup id="skinTexture" value="" onChangeValue={() => {}} disabled>
          {SKIN_TEXTURE_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </article>

      <Button
        stretch
        onClick={handleClickApplyEditOptions}
        className="font-semibold min-[3840px]:text-[1.5rem]"
        disabled={isSamePresentOption() || props.isLoading}
      >
        Apply Edit Options
      </Button>
    </section>
  )
}
