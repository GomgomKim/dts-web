import { useSearchParams } from 'next/navigation'
import { usePostAiImageGenerate } from '@/entities/detail/adapter'
import { ASPECT_RATIO_REVERT_MAP } from '@/entities/detail/constant'
import { Button } from '@/shared/ui'
import { FaceAngle } from '@/entities/detail/model'

type Props = {
  handleEncodedGenerateId: (id: string) => void
  handleToggle: () => void
}

function ApplyChangeButton(props: Props) {
  const searchParams = useSearchParams()
  const postAiImageMutatiion = usePostAiImageGenerate()

  const handleClickApplyChanges = () => {
    const encodedBaseImageId = searchParams.get('variationId')
    const aspectRatio = searchParams.get('aspectRatio')
    const faceAngle = searchParams.get('faceAngle')

    if (!encodedBaseImageId || !aspectRatio || !faceAngle) {
      // TODO: handle error
      console.error(
        'encodedBaseImageId or aspectRatio or faceAngle is not defined'
      )
      return
    }

    postAiImageMutatiion.mutate(
      {
        encodedBaseImageId,
        properties: {
          aspectRatio:
            ASPECT_RATIO_REVERT_MAP[
              aspectRatio as keyof typeof ASPECT_RATIO_REVERT_MAP
            ],
          faceAngle: faceAngle as FaceAngle
        }
      },
      {
        onSuccess: (data) => {
          props.handleEncodedGenerateId(data.content.encodedGenerateId)
          props.handleToggle()
        }
      }
    )
  }

  return (
    <div className="z-30 absolute bottom-[20px] left-[50%] -translate-x-[50%]">
      <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
        <p className="mx-5 text-[14px] text-nowrap">
          Do you want to apply the changes?
        </p>
        <Button className="rounded-[8px]" onClick={handleClickApplyChanges}>
          Apply Changes
        </Button>
      </div>
    </div>
  )
}

export default ApplyChangeButton
