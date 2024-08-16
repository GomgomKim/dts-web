'use client'

import { useCallback, useEffect, useState } from 'react'
import './styles.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ImageEditingBox } from '@/features/archive/ui/image-editing-box'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { VariationsSection } from '@/features/archive/ui/variations-section'
import { useImagePreviewUrlStore } from '@/features/archive/model/store'
import { Box } from '@/features/archive/ui/resizable-and-draggable-boxes'
import { Variation } from '../model'
import {
  useGetAiImageProgress,
  useGetVariationImages
} from '@/views/detail/adapter'
import BrandAssets from './BrandAssets'
// import ApplyChangeButton from './ApplyChangeButton'
import { ASPECT_RATIO_MAP, FACE_ANGLE_MAP } from '../constant'

// const skinTextureOptions = ['Matte', 'Medium', 'Glowy']
const aspectRatioOptions = ['16:9', '9:16', '1:1', '4:3', '3:4']
const faceAngleOptions = ['Left', 'Front', 'Right']

function Detail() {
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
  const handleIsChangedOption = (value: boolean) => {
    setIsChangedOption(value)
  }

  const pathname = usePathname()
  const { replace } = useRouter()

  // TODO: query로직 수정?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(searchParams)
  const handleVariationProperties = useCallback(
    (name: string, value: string) => {
      params.set(name, value)
      replace(`${pathname}?${params.toString()}`)
    },
    [params, pathname, replace]
  )

  const [encodedGenerateId, setEncodedGenerateId] = useState<string>('')

  const handleSelectedVariation = (variation: Variation) => {
    setSelectedVariation(variation)
    if (generatedNewImage.isCompleted)
      setGeneratedNewImage({
        isCompleted: false,
        encodedGenerateId: ''
      })
  }

  const [progress, setProgress] = useState<number>(0)

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
        ASPECT_RATIO_MAP[selectedVariation?.properties.aspectRatio] ||
      searchParams.get('faceAngle') !== selectedVariation.properties.faceAngle
    ) {
      handleIsChangedOption(true)
    } else {
      handleIsChangedOption(false)
    }
  }, [searchParams, selectedVariation])

  useEffect(() => {
    if (!variationImagesData) return
    setSelectedVariation(variationImagesData[0])
  }, [variationImagesData])

  useEffect(() => {
    if (!selectedVariation) return

    const aspectRatio = selectedVariation.properties.aspectRatio
    const faceAngle = selectedVariation.properties.faceAngle

    // 라디오 버튼
    setAspectRatio(ASPECT_RATIO_MAP[aspectRatio])
    setFaceAngle(FACE_ANGLE_MAP[faceAngle])

    // url query
    handleVariationProperties(
      'variationId',
      selectedVariation.encodedBaseImageId
    )
    handleVariationProperties('aspectRatio', ASPECT_RATIO_MAP[aspectRatio])
    handleVariationProperties('faceAngle', faceAngle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariation])

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

  const { imagePreviewUrls: assetImages } = useImagePreviewUrlStore()

  const [boxes, setBoxes] = useState<Box[]>([])

  const convertImagesToBoxData = () => {
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
                  generatingProgress={progress}
                  generatedNewImage={generatedNewImage}
                />
                {isChangedOption
                  ? // <ApplyChangeButton
                    //   handleEncodedGenerateId={(id) => setEncodedGenerateId(id)}
                    // />
                    null
                  : null}
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
export default Detail

// const ApplyChangeButton = ({ handleEncodedGenerateId }) => {
//   const searchParams = useSearchParams()

//   const postAiImageMutatiion = usePostAiImageGenerate()
//   const handleClickApplyChanges = () => {
//     postAiImageMutatiion.mutate(
//       {
//         encodedBaseImageId: searchParams.get('variationId') as string,
//         properties: {
//           aspectRatio:
//             AspectRatioClientValue[
//               searchParams.get(
//                 'aspectRatio'
//               ) as keyof typeof AspectRatioClientValue
//             ],
//           faceAngle: searchParams.get(
//             'faceAngle'
//           ) as keyof typeof FaceAngleValue
//         }
//       },
//       {
//         onSuccess: (data) => {
//           handleEncodedGenerateId(data.content.encodedGenerateId)
//         }
//       }
//     )
//     setIsChangedOption(false)
//   }

//   return (
//     <div className="z-30 absolute bottom-[20px] left-[50%] -translate-x-[50%]">
//       <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
//         <p className="mx-5 text-[14px] text-nowrap">
//           Do you want to apply the changes?
//         </p>
//         <Button className="rounded-[8px]" onClick={handleClickApplyChanges}>
//           Apply Changes
//         </Button>
//       </div>
//     </div>
//   )
// }
