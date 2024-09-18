import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { useAiImageGeneratingStore } from '@/features/detail/store'
import { FaceAngle } from '@/shared/api/types'
import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_MAP,
  SKIN_TEXTURE_MAP
} from '@/entities/detail/constant'
import { Badge, Button } from '@/shared/ui'
import { usePostAiImageGenerate } from '@/entities/detail/adapter'
import { useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/entities/user/store'

const SKIN_TEXTURE_OPTIONS = Object.values(SKIN_TEXTURE_MAP)
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

interface GenerateVariationProps {
  aspectRatio: string
  faceAngle: string
  handleChangeAspectRatio: (value: string) => void
  handleChangeFaceAngle: (value: string) => void
}

export const GenerateVariation = (props: GenerateVariationProps) => {
  const searchParams = useSearchParams()
  const addAiImageGeneratingList = useAiImageGeneratingStore(
    (state) => state.addAiImageGeneratingList
  )

  const setRestriction = useAuthStore((state) => state.setRestriction)
  const setIsAiImageGenerating = useAiImageGeneratingStore(
    (state) => state.setIsAiImageGenerating
  )
  const addAiImageItem = useAiImageGeneratingStore(
    (state) => state.addAiImageItem
  )
  const postAiImageMutaion = usePostAiImageGenerate()

  const handleClickNewVariation = () => {
    // TODO: 디바운싱 처리
    setIsAiImageGenerating(true)

    // request new variation
    const encodedBaseImageId = searchParams.get('variation')
    const aspectRatio = searchParams.get('aspectRatio')
    const faceAngle = searchParams.get('faceAngle')

    if (!encodedBaseImageId || !aspectRatio || !faceAngle) {
      return
    }

    postAiImageMutaion.mutate(
      {
        encodedBaseImageId,
        properties: {
          aspectRatio: ASPECT_RATIO_REVERT_MAP[aspectRatio],
          faceAngle: faceAngle as FaceAngle
        }
      },
      {
        onSuccess: (data) => {
          const { variation, restriction } = data.content
          addAiImageGeneratingList([variation])
          addAiImageItem(variation)

          setRestriction(restriction)
        }
      }
      // onError
    )
  }
  return (
    <>
      {/* options - Aspect Ratio */}
      <div className="mt-[78px]">
        <h3 className="mb-5 text-[0.875rem] text-neutral-7">Aspect Ratio</h3>
        <RadioGroup
          id="aspectRatio"
          value={props.aspectRatio}
          onValueChange={props.handleChangeAspectRatio}
        >
          {ASPECT_RATIO_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </div>

      {/* options - Face Angle */}
      <div>
        <h3 className="mb-5 text-[0.875rem] text-neutral-7">Face Angle</h3>
        <RadioGroup
          id="faceAngle"
          value={props.faceAngle}
          onValueChange={props.handleChangeFaceAngle}
        >
          {FACE_ANGLE_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </div>

      {/* options - Skin Texture */}
      <div>
        <div className="mb-5 flex items-center">
          <h3 className="text-neutral-7 opacity-50 text-[0.875rem]">
            Skin Texture
          </h3>
          <Badge className="ml-[8px]">Upcoming</Badge>
        </div>
        <RadioGroup id="skinTexture" value="" onValueChange={() => {}} disabled>
          {SKIN_TEXTURE_OPTIONS.map((option) => (
            <RadioGroupItem key={option} value={option} label={option} />
          ))}
        </RadioGroup>
      </div>

      <Button
        variant="outline"
        stretch
        className="bg-neautral-1 bg-opacity-50"
        onClick={handleClickNewVariation}
      >
        Generate New Variations
      </Button>
    </>
  )
}
