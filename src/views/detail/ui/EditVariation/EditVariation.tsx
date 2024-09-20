import {
  ASPECT_RATIO_MAP,
  FACE_ANGLE_MAP,
  SKIN_TEXTURE_MAP
} from '@/entities/detail/constant'

import { Badge, Button } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

const SKIN_TEXTURE_OPTIONS = Object.values(SKIN_TEXTURE_MAP)
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

interface EditVariationProps {
  aspectRatio: string
  faceAngle: string
  onChangeAspectRatio: (value: string) => void
  onChangeFaceAngle: (value: string) => void
}

export const EditVariation = (props: EditVariationProps) => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-[1.5rem]">Edit</h2>

      {/* options - Aspect Ratio */}
      <article>
        <h3 className="mb-5 text-[0.875rem] text-neutral-7">Aspect Ratio</h3>
        <RadioGroup
          id="aspectRatio"
          value={props.aspectRatio}
          onChangeValue={props.onChangeAspectRatio}
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
          value={props.faceAngle}
          onChangeValue={props.onChangeFaceAngle}
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

      <Button stretch onClick={() => {}} className="font-semibold">
        Apply Edit Options
      </Button>
    </section>
  )
}
