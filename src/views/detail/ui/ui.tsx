/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import './styles.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ImageEditingBox } from '@/features/archive/ui/image-editing-box'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { VariationsSection } from '@/features/archive/ui/variations-section'
import { useImagePreviewUrlStore } from '@/features/archive/model/store'
import { Box } from '@/features/archive/ui/image-editing-box/type'
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

// const skinTextureOptions = ['Matte', 'Medium', 'Glowy']
const ASPECT_RATIO_OPTIONS = Object.values(ASPECT_RATIO_MAP)
const FACE_ANGLE_OPTIONS = Object.values(FACE_ANGLE_MAP)

function Detail() {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const encodedBaseImageId = searchParams.get('id') || ''

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

  // const [skinTexture, setSkinTexture] = useState(skinTextureOptions[0])
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

  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)

    handleIsChangedOption()

    if (generatedNewImage.isCompleted)
      setGeneratedNewImage({
        isCompleted: false,
        encodedGenerateId: ''
      })
  }

  // const handleSkinTextureChange = (value: string) => {
  //   setSkinTexture(value)
  // }

  const handleAspectRatioChange = (
    value: keyof typeof ASPECT_RATIO_REVERT_MAP
  ) => {
    setAspectRatio(value)
    handleQueryString('aspectRatio', value)
  }

  const handleFaceAngleChange = (value: keyof typeof FACE_ANGLE_REVERT_MAP) => {
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
      <div className="flex">
        {/* brand assets section*/}
        <div className="flex-shrink-0 basis-[387px] mr-5">
          <BrandAssets
            handleAddBrandAssets={handleAddBrandAssets}
            handleRemoveBox={handleRemoveBox}
            assetDisabled={assetImages.size < 1}
          />
        </div>

        {/* generate section */}
        <section className="px-5 grow">
          <h2 className="text-[24px] -mb-[37px]">Generate</h2>
          <div className="grid-areas-generate-layout gap-[40px]">
            {/* image editing section */}
            <div className="grid-areas-generate-editing">
              <div className="relative">
                <ImageEditingBox
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
            </div>

            {/* variations */}
            <div className="grid-area-generate-variations mt-[58px]">
              <VariationsSection
                data={variationImagesData}
                handleSelectedVariation={handleSelectedVariation}
              />
            </div>

            {/* options - Skin Texture */}
            {/* <div className="grid-area-generate-skin">
          <h3 className="mb-5">Skin Texture</h3>
          <RadioGroup
            id="skinTexture"
            value={skinTexture}
            onValueChange={handleSkinTextureChange}
          >
            {skinTextureOptions.map((option) => (
              <RadioGroupItem key={option} value={option} label={option} />
            ))}
            </RadioGroup>
        </div> */}

            {/* options - Aspect Ratio */}
            <div className="grid-area-generate-faceangle">
              <h3 className="mb-5">Aspect Ratio</h3>
              <RadioGroup
                id="aspectRatio"
                value={aspectRatio}
                onValueChange={handleAspectRatioChange}
              >
                {ASPECT_RATIO_OPTIONS.map((option) => (
                  <RadioGroupItem key={option} value={option} label={option} />
                ))}
              </RadioGroup>
            </div>

            {/* options - Face Angle */}
            <div className="grid-area-generate-aspectratio">
              <h3 className="mb-5">Face Angle</h3>
              <RadioGroup
                id="faceAngle"
                value={faceAngle}
                onValueChange={handleFaceAngleChange}
              >
                {FACE_ANGLE_OPTIONS.map((option) => (
                  <RadioGroupItem key={option} value={option} label={option} />
                ))}
              </RadioGroup>
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
