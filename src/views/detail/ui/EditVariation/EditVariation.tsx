'use client'

import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_MAP,
  FACE_ANGLE_REVERT_MAP,
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
  selectedVariation: Variation | null
}

export const EditVariation = (props: EditVariationProps) => {
  const searchParams = useSearchParams()

  const { setInitialProperty, applyEdit } = useEditorStore.getState()
  const editedVariationList = useEditorStore((state) => state.items)

  const [aspectRatio, setAspectRatio] = React.useState<string>('') // 9:16
  const [faceAngle, setFaceAngle] = React.useState<string>('') // front

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
      const { ratio, angle } = props.selectedVariation.images[0]
      setInitialProperty(variationId, { ratio, angle })
    }

    applyEdit(variationId, {
      ratio: ASPECT_RATIO_REVERT_MAP[aspectRatio],
      angle: FACE_ANGLE_REVERT_MAP[faceAngle]
    })
  }

  const isSamePresentOption = React.useCallback(() => {
    if (!variationId) return true
    if (editedVariationList.has(variationId)) {
      const { ratio: presentAspectRatio, angle: presentFaceAngle } =
        editedVariationList.get(variationId)!.present
      return (
        presentAspectRatio === ASPECT_RATIO_REVERT_MAP[aspectRatio] &&
        presentFaceAngle === FACE_ANGLE_REVERT_MAP[faceAngle]
      )
    }

    return aspectRatio === '9:16' && faceAngle === 'Front'
  }, [variationId, aspectRatio, faceAngle, editedVariationList])

  React.useEffect(() => {
    if (!variationId) return
    if (!props.selectedVariation) return

    if (editedVariationList.has(variationId)) {
      const { ratio, angle } = editedVariationList.get(variationId)!.present
      setAspectRatio(ASPECT_RATIO_MAP[ratio])
      setFaceAngle(FACE_ANGLE_MAP[angle])
      return
    }

    const { ratio, angle } = props.selectedVariation.images[0]

    setAspectRatio(ASPECT_RATIO_MAP[ratio])
    setFaceAngle(FACE_ANGLE_MAP[angle])
  }, [variationId, props.selectedVariation, editedVariationList])

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-[1.5rem]">Edit</h2>

      {/* options - Aspect Ratio */}
      <article>
        <h3 className="mb-5 text-[0.875rem] text-neutral-7">Aspect Ratio</h3>
        <RadioGroup
          id="aspectRatio"
          value={aspectRatio}
          onChangeValue={(value: string) => setAspectRatio(value)}
        >
          {ASPECT_RATIO_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </article>

      {/* options - Face Angle */}
      <article>
        <h3 className="mb-5 text-[0.875rem] text-neutral-7">Face Angle</h3>
        <RadioGroup
          id="faceAngle"
          value={faceAngle}
          onChangeValue={(value: string) => setFaceAngle(value)}
        >
          {FACE_ANGLE_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </article>

      {/* options - Skin Texture */}
      <article>
        <div className="mb-5 flex items-center">
          <h3 className="text-neutral-7 opacity-50 text-[0.875rem]">
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
        className="font-semibold"
        disabled={isSamePresentOption()}
      >
        Apply Edit Options
      </Button>
    </section>
  )
}
