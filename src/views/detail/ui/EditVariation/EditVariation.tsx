import * as React from 'react'

import { useSearchParams } from 'next/navigation'

import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_MAP,
  FACE_ANGLE_REVERT_MAP,
  SKIN_TEXTURE_MAP
} from '@/entities/detail/constant'

import { Badge, Button } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

import { useEditorStore } from '../../model/useEditorHistoryStore'

const SKIN_TEXTURE_OPTIONS = Object.values(SKIN_TEXTURE_MAP)
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

export const EditVariation = () => {
  const searchParams = useSearchParams()
  // TODO: url에 variation id 가 바뀌면 history store 확인하고 option 값 업데이트
  const [aspectRatio, setAspectRatio] = React.useState<string>('') // 9:16
  const [faceAngle, setFaceAngle] = React.useState<string>('') // front

  // TODO: check apply edit options button disabled - history present === current option values

  const applyEdit = useEditorStore((state) => state.applyEdit)

  const handleClickApplyEditOptions = () => {
    const variationId = searchParams.get('variationId')

    if (!variationId) {
      alert('variationId is not found')
      return
    }

    applyEdit(variationId, {
      aspectRatio: ASPECT_RATIO_REVERT_MAP[aspectRatio],
      faceAngle: FACE_ANGLE_REVERT_MAP[faceAngle]
    })
  }

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
      >
        Apply Edit Options
      </Button>
    </section>
  )
}
