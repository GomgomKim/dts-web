'use client'

import { useEffect, useState } from 'react'
import './styles.css'
import { ImageEditingBox } from '@/features/archive/ui/image-editing-box'
import { ImageInputBox } from '@/features/archive/ui/image-input-box'
import { Button } from '@/shared/ui/button'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { VariationsSection } from '@/features/archive/ui/variations-section'
import { useImagePreviewUrlStore } from '@/features/archive/model/store'
import { Box } from '@/features/archive/ui/resizable-and-draggable-boxes'

const skinTextureOptions = ['Matte', 'Medium', 'Glowy']
const aspectRatioOptions = ['16:9', '9:16', '1:1', '4:3', '3:4']
const faceAngleOptions = ['Left', 'Front', 'Right']

function Model({ modelName }: { modelName: string }) {
  console.log(modelName)

  // TODO:
  // 받아온 데이터에 options로 라디오 버튼 값 넣어주기
  // option 변경시 해당 모델에 그 옵션이 적용된 이미지 보여주기

  const [skinTexture, setSkinTexture] = useState(skinTextureOptions[0])
  const [aspectRatio, setAspectRatio] = useState(aspectRatioOptions[0])
  const [faceAngle, setFaceAngle] = useState(faceAngleOptions[0])

  const handleSkinTextureChange = (value: string) => {
    setSkinTexture(value)
  }

  const handleAspectRatioChange = (value: string) => {
    setAspectRatio(value)
  }

  const handleFaceAngleChange = (value: string) => {
    setFaceAngle(value)
  }

  useEffect(() => {
    console.log(skinTexture, aspectRatio, faceAngle)
  }, [skinTexture, aspectRatio, faceAngle])

  //////////////////
  const { imagePreviewUrls } = useImagePreviewUrlStore()

  const [boxes, setBoxes] = useState<Box[]>([])

  const convertImagesToBoxData = () => {
    console.log(imagePreviewUrls)
    const imageData = Array.from(imagePreviewUrls.entries()).map(
      ([id, image]) => ({ id, image })
    )

    const boxesData = imageData.map((imageItem, idx) => ({
      ...imageItem,
      // TODO: 컨테이너 넘어가지 않게 추가 처리
      left: 100 + idx * 50,
      top: 100 + idx * 50,
      width: 200,
      height: 200,
      zIndex: 1
    }))

    return boxesData
  }

  const onChangeBrandAssets = () => {
    const boxesData = convertImagesToBoxData()
    setBoxes(boxesData)
  }

  // TODO: assets 이미지 삭제 관련 로직 필요

  return (
    <div className="flex">
      {/* brand assets section*/}
      <div className="flex-shrink-0 basis-[387px] mr-5">
        <section className="sticky top-0 flex flex-col gap-5">
          <h2 className="text-[24px]">Brand Assets</h2>
          <div>
            <h3 className="mb-3">Product</h3>
            <ImageInputBox boxId="product" />
          </div>
          <div>
            <h3 className="mb-3">Brand Logo</h3>
            <ImageInputBox boxId="logo" />
          </div>
          <div className="flex flex-col">
            <Button variant="outline">Remove Background</Button>
            <Button onClick={onChangeBrandAssets}>Add Brand Assets</Button>
          </div>
        </section>
      </div>

      {/* generate section */}
      <section className="px-5 grow">
        <h2 className="text-[24px] -mb-[37px]">Generate</h2>
        <div className="grid-areas-generate-layout gap-[40px]">
          {/* image editing section */}
          <div className="grid-areas-generate-editing">
            <ImageEditingBox boxes={boxes} setBoxes={setBoxes} />
          </div>

          {/* variations */}
          <div className="grid-area-generate-variations mt-[58px]">
            <VariationsSection />
          </div>

          {/* options - Skin Texture */}
          <div className="grid-area-generate-skin">
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
          </div>

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
  )
}
export default Model
