'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './styles.css'
import { ImageEditingBox } from '@/features/archive/ui/image-editing-box'
import { ImageInputBox } from '@/features/archive/ui/image-input-box'
import { Button } from '@/shared/ui/button'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

import LeftIcon from '/public/icons/arrow-left.svg'
import RightIcon from '/public/icons/arrow-right.svg'
import Img1 from '/public/images/model-gen-1.png'

const skinTextureOptions = ['Matte', 'Medium', 'Glowy']
const aspectRatioOptions = ['16:9', '9:16', '1:1', '4:3', '3:4']
const faceAngleOptions = ['Left', 'Front', 'Right']

function Model({ modelName }: { modelName: string }) {
  console.log(modelName)

  const [query, setQuery] = useState({
    skinTexture: skinTextureOptions[0],
    aspectRatio: aspectRatioOptions[0],
    faceAngle: faceAngleOptions[0]
  })

  const handleValueChange = (id: string, value: string) => {
    return setQuery((prev) => ({ ...prev, [`${id}`]: value }))
  }

  useEffect(() => {
    console.log(query)
  }, [query])

  return (
    <div className="flex">
      {/* brand assets section*/}
      <div className="flex-shrink-0 basis-[390px] mr-5">
        <section className="sticky top-0 flex flex-col gap-5">
          <h2 className="text-[24px] mb-5">Brand Assets</h2>
          <div>
            <h3 className="mb-3">Product</h3>
            <ImageInputBox />
          </div>
          <div>
            <h3 className="mb-3">Brand Logo</h3>
            <ImageInputBox />
          </div>
          <div className="flex flex-col">
            <Button variant="outline">Remove Background</Button>
            <Button>Add Brand Assets</Button>
          </div>
        </section>
      </div>

      {/* generate section */}
      <section className="px-5 grow">
        <h2 className="text-[24px] -mb-[42px]">Generate</h2>
        <div className="grid-areas-generate-layout gap-[40px]">
          {/* image editing section */}
          <div className="grid-areas-generate-editing">
            <ImageEditingBox />
          </div>

          {/* variations */}
          <div className="grid-area-generate-variations mt-[58px]">
            <div className="flex justify-between items-center mb-5">
              <h3>Variations</h3>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
                >
                  <LeftIcon />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
                >
                  <RightIcon />
                </Button>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-5">
              <Button
                variant="outline"
                stretch
                className="rounded-[0.5rem] bg-inherit flex-shrink-0"
              >
                Generate New Variations<span>(1/3)</span>
              </Button>
              <div className="grid-area-variations gap-4 flex-1">
                <div className="rounded-[0.5rem] overflow-hidden">
                  <Image src={Img1} alt="" objectFit="cover" />
                </div>
                <div className="rounded-[0.5rem] overflow-hidden">
                  <Image src={Img1} alt="" />
                </div>
                <div className="rounded-[0.5rem] overflow-hidden">
                  <Image src={Img1} alt="" />
                </div>
                <div className="rounded-[0.5rem] overflow-hidden">
                  <Image src={Img1} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* options - Skin Texture */}
          <div className="grid-area-generate-skin">
            <h3 className="mb-5">Skin Texture</h3>
            <RadioGroup
              id="skinTexture"
              value={query.skinTexture}
              onValueChange={handleValueChange}
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
              value={query.aspectRatio}
              onValueChange={handleValueChange}
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
              value={query.faceAngle}
              onValueChange={handleValueChange}
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
