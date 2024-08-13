'use client'

import { useEffect, useState } from 'react'
import './styles.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ImageEditingBox } from '@/features/archive/ui/image-editing-box'
import { ImageInputBox } from '@/features/archive/ui/image-input-box'
import { Button } from '@/shared/ui/button'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { VariationsSection } from '@/features/archive/ui/variations-section'
import { useImagePreviewUrlStore } from '@/features/archive/model/store'
import { Box } from '@/features/archive/ui/resizable-and-draggable-boxes'
import { Variation } from '../model'
import {
  useGetAiImageProgress,
  useGetVariationImages,
  usePostAiImageGenerate
} from '@/views/model/adapter'

// const skinTextureOptions = ['Matte', 'Medium', 'Glowy']
const aspectRatioOptions = ['16:9', '9:16', '1:1', '4:3', '3:4']
const faceAngleOptions = ['Left', 'Front', 'Right']

// TODO: enum -> Object로 변경
enum AspectRatioValue {
  'ASPECT_RATIO_16_9' = '16:9',
  'ASPECT_RATIO_9_16' = '9:16',
  'ASPECT_RATIO_1_1' = '1:1',
  'ASPECT_RATIO_4_3' = '4:3',
  'ASPECT_RATIO_3_4' = '3:4'
}

enum AspectRatioClientValue {
  '16:9' = 'ASPECT_RATIO_16_9',
  '9:16' = 'ASPECT_RATIO_9_16',
  '1:1' = 'ASPECT_RATIO_1_1',
  '4:3' = 'ASPECT_RATIO_4_3',
  '3:4' = 'ASPECT_RATIO_3_4'
}

// const AspectRatioMap = {
//   '16:9': 'ASPECT_RATIO_16_9',
//   '9:16': 'ASPECT_RATIO_9_16',
//   '1:1': 'ASPECT_RATIO_1_1',
//   '4:3': 'ASPECT_RATIO_4_3',
//   '3:4': 'ASPECT_RATIO_3_4',
//   ASPECT_RATIO_16_9: '16:9',
//   ASPECT_RATIO_9_16: '9:16',
//   ASPECT_RATIO_1_1: '1:1',
//   ASPECT_RATIO_4_3: '4:3',
//   ASPECT_RATIO_3_4: '3:4'
// }

// type AspectRatioValueKeys = typeof AspectRatioValue[keyof typeof AspectRatioValue]

enum FaceAngleValue {
  'LEFT' = 'Left',
  'FRONT' = 'Front',
  'RIGHT' = 'Right'
}

function Model() {
  const searchParams = useSearchParams()
  const encodedBaseImageId = searchParams.get('id') || ''

  const {
    data: variationImagesData,
    status,
    error
  } = useGetVariationImages(encodedBaseImageId)

  const [isChangedOption, setIsChangedOption] = useState(false)
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  )

  const pathname = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const handleVariationProperties = (name: string, value: string) => {
    params.set(name, value)
    replace(`${pathname}?${params.toString()}`)
  }

  const [encodedGenerateId, setEncodedGenerateId] = useState<string>('')

  const postAiImageMutatiion = usePostAiImageGenerate()
  const handleClickApplyChanges = () => {
    postAiImageMutatiion.mutate(
      {
        encodedBaseImageId: searchParams.get('variationId') as string,
        properties: {
          aspectRatio:
            AspectRatioClientValue[
              searchParams.get(
                'aspectRatio'
              ) as keyof typeof AspectRatioClientValue
            ],
          faceAngle: searchParams.get(
            'faceAngle'
          ) as keyof typeof FaceAngleValue
        }
      },
      {
        onSuccess: (data) => {
          setEncodedGenerateId(data.content.encodedGenerateId)
        }
      }
    )
    setIsChangedOption(false)
  }

  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)
    if (generatedNewImage.isCompleted)
      setGeneratedNewImage({
        isCompleted: false,
        encodedGenerateId: ''
      })
  }

  const [progress, setProgress] = useState<number>(0)

  // progress ui local 확인용
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (progress < 100) {
  //       setProgress((prev) => prev + 30)
  //       console.log(progress)
  //     }
  //   }, 5000)
  //   return () => clearInterval(intervalId)
  // }, [])

  const [generatedNewImage, setGeneratedNewImage] = useState({
    isCompleted: false,
    encodedGenerateId: ''
  })
  const { data: progressData } = useGetAiImageProgress({
    variationId: searchParams.get('variationId') as string,
    encodedGenerateId
  })
  useEffect(() => {
    if (!progressData) return
    setProgress(progressData)
    if (progressData === 100) {
      setProgress(0)
      setGeneratedNewImage({ isCompleted: true, encodedGenerateId })
      setEncodedGenerateId('') // for tanstack query key
    }
  }, [encodedGenerateId, progressData])

  useEffect(() => {
    if (!selectedVariation) return
    if (
      searchParams.get('aspectRatio') !==
        AspectRatioValue[selectedVariation?.properties.aspectRatio] ||
      searchParams.get('faceAngle') !== selectedVariation.properties.faceAngle
    ) {
      setIsChangedOption(true)
    } else {
      setIsChangedOption(false)
    }
  }, [searchParams, selectedVariation])

  useEffect(() => {
    if (!variationImagesData) return
    setSelectedVariation(variationImagesData[0])
  }, [variationImagesData])

  useEffect(() => {
    if (!selectedVariation) return

    // 라디오 버튼
    setAspectRatio(AspectRatioValue[selectedVariation?.properties.aspectRatio])
    setFaceAngle(FaceAngleValue[selectedVariation?.properties.faceAngle])

    // url query
    handleVariationProperties(
      'variationId',
      selectedVariation.encodedBaseImageId
    )
    handleVariationProperties(
      'aspectRatio',
      AspectRatioValue[selectedVariation.properties.aspectRatio]
    )
    handleVariationProperties(
      'faceAngle',
      selectedVariation.properties.faceAngle
    )
  }, [handleVariationProperties, selectedVariation])

  // const [skinTexture, setSkinTexture] = useState(skinTextureOptions[0])
  const [aspectRatio, setAspectRatio] = useState<string>('')
  const [faceAngle, setFaceAngle] = useState<string>('')

  // const handleSkinTextureChange = (value: string) => {
  //   setSkinTexture(value)
  // }

  const handleAspectRatioChange = (value: string) => {
    setAspectRatio(value)
    handleVariationProperties('aspectRatio', value)
  }

  const handleFaceAngleChange = (value: string) => {
    setFaceAngle(value)
    handleVariationProperties('faceAngle', value.toLocaleUpperCase())
  }

  const { imagePreviewUrls } = useImagePreviewUrlStore()

  const [boxes, setBoxes] = useState<Box[]>([])

  const convertImagesToBoxData = () => {
    const imageData = Array.from(imagePreviewUrls.entries()).map(
      ([id, image]) => ({ id, image })
    )

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

  const handleAddBrandAssets = () => {
    const boxesData = convertImagesToBoxData()
    setBoxes(boxesData)
  }

  const handleRemoveBox = (id: string) => {
    const newBoxes = boxes.filter((box) => box.id !== id)
    setBoxes(newBoxes)
  }

  if (status === 'pending') return <p>loading</p>
  if (status === 'error') return <p>{error?.message}</p>

  const isGenerating = !!progress && progress < 100

  return (
    <>
      {isGenerating ? (
        // TODO: 꽉차게
        <div className="z-10 absolute w-screen h-screen bg-neutral-0-70"></div>
      ) : null}
      <div className="flex">
        {/* brand assets section*/}
        <div className="flex-shrink-0 basis-[387px] mr-5">
          <section className="sticky top-0 flex flex-col gap-5">
            <h2 className="text-[24px]">Brand Assets</h2>
            <div>
              <h3 className="mb-3">Product</h3>
              <ImageInputBox
                boxId="product"
                onChangeBrandAsset={() => handleRemoveBox('product')}
              />
            </div>
            <div>
              <h3 className="mb-3">Brand Logo</h3>
              <ImageInputBox
                boxId="logo"
                onChangeBrandAsset={() => handleRemoveBox('logo')}
              />
            </div>
            {/* <div className="flex flex-col">
              <Button variant="outline">Remove Background</Button> */}
            <Button
              onClick={handleAddBrandAssets}
              disabled={imagePreviewUrls.size < 1}
            >
              Add Brand Assets
            </Button>
            {/* </div> */}
          </section>
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
                  generatingProgress={progress}
                  generatedNewImage={generatedNewImage}
                />
                {isChangedOption ? (
                  <div className="z-30 absolute bottom-[20px] left-[50%] -translate-x-[50%]">
                    <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
                      <p className="mx-5 text-[14px] text-nowrap">
                        Do you want to apply the changes?
                      </p>
                      <Button
                        className="rounded-[8px]"
                        onClick={handleClickApplyChanges}
                      >
                        Apply Changes
                      </Button>
                    </div>
                  </div>
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
                {aspectRatioOptions.map((option) => (
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
                {faceAngleOptions.map((option) => (
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
export default Model
