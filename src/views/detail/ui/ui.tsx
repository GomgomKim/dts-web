/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useRef, useState } from 'react'
import './styles.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ImageEditingBox } from '@/features/detail/ui/ImageEditingBox'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { VariationsSection } from '@/features/detail/ui/VariationSection'
import { useImagePreviewUrlStore } from '@/features/detail/store'
import { Box } from '@/features/detail/ui/ImageEditingBox/type'
import { Variation } from '@/entities/detail/model'
import {
  useGetAiImageProgress,
  useGetVariationImages
} from '@/entities/detail/adapter'
import BrandAssets from './BrandAssets'
import ApplyChangeButton from './ApplyChangeButton'
import {
  ASPECT_RATIO_MAP,
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_MAP,
  FACE_ANGLE_REVERT_MAP
} from '@/entities/detail/constant'
import { ExportButton } from '@/entities/detail/ui/ExportButton'
import { Button } from '@/shared/ui'
import ArrowIcon from '/public/icons/arrow.svg'

const SKIN_TEXTURE_OPTIONS = ['Matte', 'Medium', 'Glowy']
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

function Detail() {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const encodedBaseImageId = searchParams.get('id') || ''

  const containerRef = useRef<HTMLDivElement>(null)
  const { imagePreviewUrls: assetImages } = useImagePreviewUrlStore()
  const [boxes, setBoxes] = useState<Box[]>([])

  const [encodedGenerateId, setEncodedGenerateId] = useState<string>('')
  const [generatingProgress, setGeneratingProgress] = useState<number>(0)
  const [generatedNewImage, setGeneratedNewImage] = useState({
    isCompleted: false,
    encodedGenerateId: ''
  })
  const [isChangedOption, setIsChangedOption] = useState(false)
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  )

  const [skinTexture, setSkinTexture] = useState<string>('')
  const [aspectRatio, setAspectRatio] = useState<string>('')
  const [faceAngle, setFaceAngle] = useState<string>('')

  ///////////////////////////////////////

  const {
    data: variationImagesData,
    status,
    error
  } = useGetVariationImages(encodedBaseImageId)

  const { data: progressData } = useGetAiImageProgress({
    variationId: searchParams.get('variationId') as string,
    encodedGenerateId
  })

  ///////////////////////////////////////

  const handleAddBrandAssets = () => {
    const boxesData = convertImagesToBoxData(assetImages)
    setBoxes(boxesData)
  }

  const handleRemoveBox = (id: string) => {
    const newBoxes = boxes.filter((box) => box.id !== id)
    setBoxes(newBoxes)
  }

  const handleQueryString = (name: string, value: string) => {
    params.set(name, value)
    replace(`${pathname}?${params.toString()}`)
  }

  const handleIsChangedOption = () => {
    if (!selectedVariation) return

    const isChangedOption =
      searchParams.get('aspectRatio') !==
        ASPECT_RATIO_MAP[selectedVariation.properties.aspectRatio] ||
      searchParams.get('faceAngle') !== selectedVariation.properties.faceAngle

    if (isChangedOption) {
      setIsChangedOption(true)
    } else {
      setIsChangedOption(false)
    }
  }

  useEffect(() => {
    handleIsChangedOption()
  }, [searchParams])

  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)

    handleChangeAspectRatio(ASPECT_RATIO_MAP[variation.properties.aspectRatio])
    handleChangeFaceAngle(FACE_ANGLE_MAP[variation.properties.faceAngle])

    // image 생성 후에 다시 선택할 경우
    if (generatedNewImage.isCompleted)
      setGeneratedNewImage({
        isCompleted: false,
        encodedGenerateId: ''
      })
  }

  const handleChangeSkinTexture = (value: string) => {
    setSkinTexture(value)
  }

  const handleChangeAspectRatio = (
    value: keyof typeof ASPECT_RATIO_REVERT_MAP
  ) => {
    setAspectRatio(value)
    handleQueryString('aspectRatio', value)
  }

  const handleChangeFaceAngle = (value: keyof typeof FACE_ANGLE_REVERT_MAP) => {
    setFaceAngle(value)
    handleQueryString('faceAngle', FACE_ANGLE_REVERT_MAP[value])
  }

  // 초기값 세팅 - editingBox Image / options / query string
  useEffect(() => {
    if (!variationImagesData) return

    setSelectedVariation(variationImagesData[0])

    const variationId = variationImagesData[0].encodedBaseImageId
    const aspectRatio = variationImagesData[0].properties.aspectRatio
    const faceAngle = variationImagesData[0].properties.faceAngle

    // 라디오 버튼
    setAspectRatio(ASPECT_RATIO_MAP[aspectRatio])
    setFaceAngle(FACE_ANGLE_MAP[faceAngle])

    // url query
    handleQueryString('variationId', variationId)
    handleQueryString('aspectRatio', ASPECT_RATIO_MAP[aspectRatio])
    handleQueryString('faceAngle', faceAngle)
  }, [variationImagesData])

  useEffect(() => {
    if (!progressData) return

    setGeneratingProgress(progressData)
    // setGeneratedNewImage({ isCompleted: false, encodedGenerateId })

    if (progressData === 100) {
      setGeneratingProgress(0)
      setGeneratedNewImage({ isCompleted: true, encodedGenerateId })
      setEncodedGenerateId('') // to stop polling
    }
  }, [progressData])

  if (status === 'pending') return <p>loading</p>
  if (status === 'error') return <p>{error?.message}</p>

  return (
    <>
      <div className="flex h-full">
        {/* brand assets section*/}
        <div className="flex-shrink-0 basis-[387px] mr-5">
          <BrandAssets
            handleAddBrandAssets={handleAddBrandAssets}
            handleRemoveBox={handleRemoveBox}
            assetDisabled={assetImages.size < 1}
          />
        </div>

        {/* generate section */}
        <section className="grow px-5 flex gap-10">
          {/* generate section - left */}
          <div className="grow-[3] overflow-y-auto overflow-x-hidden basis-[477px] shrink-0">
            <div className="flex flex-col relative h-full">
              {/* title top fix */}
              <div className="flex justify-between items-center sticky top-0 w-full h-[38px] z-10">
                <h2 className="text-[24px]">Generate</h2>
                <ExportButton
                  containerRef={containerRef}
                  className="ml-auto h-full"
                >
                  Download
                </ExportButton>
              </div>

              <div className="flex flex-col mt-5 gap-5 h-full">
                {/* image editing section */}
                <div className="grow relative max-h-[80%] min-h-[572px]">
                  <ImageEditingBox
                    containerRef={containerRef}
                    boxes={boxes}
                    setBoxes={setBoxes}
                    selectedVariation={selectedVariation}
                    generatingProgress={generatingProgress}
                    generatedNewImage={generatedNewImage}
                  />
                  {isChangedOption ? (
                    <ApplyChangeButton
                      handleEncodedGenerateId={(id: string) =>
                        setEncodedGenerateId(id)
                      }
                      handleToggle={() => setIsChangedOption(false)}
                    />
                  ) : null}
                </div>

                {/* options - Skin Texture */}
                {/* TODO: disabled 추가  */}
                <div>
                  <h3 className="mb-5">Skin Texture</h3>
                  <RadioGroup
                    id="skinTexture"
                    value={skinTexture}
                    onValueChange={handleChangeSkinTexture}
                  >
                    {SKIN_TEXTURE_OPTIONS.map((option) => (
                      <RadioGroupItem
                        key={option}
                        value={option}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                  {/* skin texture percentage bar */}
                  <div className="flex gap-2 items-center mt-5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-inherit rounded-[8px] w-8 h-8 shrink-0"
                    >
                      <ArrowIcon className="rotate-180 fill-neutral-5" />
                    </Button>
                    <div className="grow h-[5px] w-full bg-neutral-1 rounded-[30px]">
                      <div className="h-full bg-neutral-5 rounded-[4px] w-[50%]"></div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-primary rounded-[8px] w-8 h-8 shrink-0"
                    >
                      <ArrowIcon className="fill-neutral-0" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* generate section - right */}
          <div className="grow overflow-y-auto overflow-x-hidden basis-[472px]">
            <div className="flex flex-col gap-5">
              {/* variations */}
              <div className="mt-[58px] max-h-[80%]">
                <VariationsSection
                  data={variationImagesData}
                  handleSelectedVariation={handleSelectedVariation}
                />
              </div>

              {/* options - Aspect Ratio */}
              <div>
                <h3 className="mb-5">Aspect Ratio</h3>
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
              <div className="grid-area-generate-aspectratio">
                <h3 className="mb-5">Face Angle</h3>
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
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default Detail

const convertImagesToBoxData = (assetImages: Map<string, string>) => {
  const imageData = Array.from(assetImages.entries()).map(([id, image]) => ({
    id,
    image
  }))

  const boxesData = imageData.map((imageItem, idx) => ({
    ...imageItem,
    // TODO: 컨테이너 넘어가지 않게 추가 처리
    left: 50 + idx * 50,
    top: 50 + idx * 50,
    width: 200,
    height: 200,
    zIndex: 1
  }))

  return boxesData
}
