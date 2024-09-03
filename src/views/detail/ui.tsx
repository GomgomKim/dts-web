'use client'

import { Suspense, useRef, useState } from 'react'
import { ImageEditingBox } from '@/features/detail/ui/ImageEditingBox'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { VariationsSection } from '@/features/detail/ui/VariationSection'
import {
  useAiImageGeneratingStore,
  useImagePreviewUrlStore
} from '@/features/detail/store'
import { Box } from '@/features/detail/ui/ImageEditingBox/type'
import { FaceAngle, Variation } from '@/entities/detail/model'
import BrandAssets from './BrandAssets'
import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_MAP,
  FACE_ANGLE_REVERT_MAP,
  SKIN_TEXTURE_MAP
} from '@/entities/detail/constant'
import { ExportButton } from '@/entities/detail/ui/ExportButton'
import { convertImagesToBoxData } from './util'
import { Badge, Button } from '@/shared/ui'
import { useSetQueryString } from '@/shared/lib/hooks/useSetQueryString'
import { usePostAiImageGenerate } from '@/entities/detail/adapter'
import { useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/entities/user/store'

const SKIN_TEXTURE_OPTIONS = Object.values(SKIN_TEXTURE_MAP)
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

function Detail() {
  const searchParams = useSearchParams()
  const { addAiImageGeneratingList } = useAiImageGeneratingStore.getState()

  // related brand assets
  const containerRef = useRef<HTMLDivElement>(null)
  const { imagePreviewUrls: assetImages } = useImagePreviewUrlStore()
  const [boxes, setBoxes] = useState<Box[]>([])

  const handleAddBrandAssets = () => {
    const boxesData = convertImagesToBoxData(assetImages)
    setBoxes(boxesData)
  }

  const handleRemoveBox = (id: string) => {
    const newBoxes = boxes.filter((box) => box.id !== id)
    setBoxes(newBoxes)
  }

  // related variations
  const { setRestriction } = useAuthStore.getState()
  const { setIsAiImageGenerating, addAiImageItem } =
    useAiImageGeneratingStore.getState()
  const postAiImageMutaion = usePostAiImageGenerate()

  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  )
  const [aspectRatio, setAspectRatio] = useState<string>('')
  const [faceAngle, setFaceAngle] = useState<string>('')

  const { handleQueryString } = useSetQueryString({ option: 'replace' })

  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)

    const {
      encodedBaseImageId,
      properties: { aspectRatio, faceAngle }
    } = variation

    handleQueryString([{ variation: encodedBaseImageId }])

    handleChangeAspectRatio(ASPECT_RATIO_MAP[aspectRatio])
    handleChangeFaceAngle(FACE_ANGLE_MAP[faceAngle])
  }

  const handleChangeAspectRatio = (value: string) => {
    setAspectRatio(value)
    handleQueryString([{ aspectRatio: value }])
  }

  const handleChangeFaceAngle = (value: string) => {
    setFaceAngle(value)
    handleQueryString([{ faceAngle: FACE_ANGLE_REVERT_MAP[value] }])
  }

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

          setIsAiImageGenerating(true)
          addAiImageGeneratingList([variation])
          addAiImageItem(variation)

          setRestriction(restriction.current)
        }
      }
      // onError
    )
  }

  return (
    <div className="flex w-full h-full">
      {/* brand assets section */}
      <div className="w-[320px] xl:w-[387px] fixed px-5 bg-background z-20">
        <BrandAssets
          handleAddBrandAssets={handleAddBrandAssets}
          handleRemoveBox={handleRemoveBox}
          assetDisabled={assetImages.size < 1}
        />
      </div>
      {/* generate section */}
      <section className="h-full ml-[320px] xl:ml-[407px] grow">
        <div className="h-full overflow-x-scroll flex gap-5">
          {/* generate section - left */}
          <div className="overflow-y-auto overflow-x-hidden basis-[513px] shrink-0 grow">
            <div className="flex flex-col relative h-full">
              <div className="flex justify-between items-center sticky top-0 w-full z-10">
                <h2 className="text-[20px]">Generate</h2>
              </div>

              <div className="mt-5 grow">
                {/* <div className="flex"> */}
                <div className="flex flex-col gap-5 grow h-full">
                  {/* image editing section */}
                  <div className="grow relative max-h-[720px] min-h-[391px]">
                    <ImageEditingBox
                      containerRef={containerRef}
                      boxes={boxes}
                      setBoxes={setBoxes}
                      selectedVariation={selectedVariation}
                    />
                  </div>

                  {/* variations section */}
                  <div className="min-h-[180px]">
                    <Suspense fallback={<div>Loading...</div>}>
                      <VariationsSection
                        handleSelectedVariation={handleSelectedVariation}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* generate section - right */}
          <div className="overflow-y-auto overflow-x-hidden basis-[407px] shrink-0">
            <div className="flex flex-col gap-5 ">
              {/* related variations options /////////////////////////////////////////////  */}
              {/* options - Aspect Ratio */}
              <div className="mt-[78px]">
                <h3 className="mb-5 text-[0.875rem] text-neutral-7">
                  Aspect Ratio
                </h3>
                <RadioGroup
                  id="aspectRatio"
                  value={aspectRatio}
                  onValueChange={handleChangeAspectRatio}
                >
                  {ASPECT_RATIO_OPTIONS.map((option) => (
                    <RadioGroupItem
                      key={option}
                      value={option}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </div>

              {/* options - Face Angle */}
              <div>
                <h3 className="mb-5 text-[0.875rem] text-neutral-7">
                  Face Angle
                </h3>
                <RadioGroup
                  id="faceAngle"
                  value={faceAngle}
                  onValueChange={handleChangeFaceAngle}
                >
                  {FACE_ANGLE_OPTIONS.map((option) => (
                    <RadioGroupItem
                      key={option}
                      value={option}
                      label={option}
                    />
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
                <RadioGroup
                  id="skinTexture"
                  value=""
                  onValueChange={() => {}}
                  disabled
                >
                  {SKIN_TEXTURE_OPTIONS.map((option) => (
                    <RadioGroupItem
                      key={option}
                      value={option}
                      label={option}
                    />
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

              {/* related download image /////////////////////////////////////////////  */}
              {/* TODO: download option */}
              <ExportButton containerRef={containerRef}>
                Free Download
              </ExportButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Detail
