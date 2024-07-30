'use client'

import { useEffect, useState } from 'react'
import './styles.css'
import { ImageEditingBox } from '@/features/archive/ui/ImageEditingBox'
import { ImageInputBox } from '@/features/archive/ui/ImageInputBox'
import { Button } from '@/sdcn/components/ui/Button'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/RadioGroup'

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
    <div className="gap-[40px] grid-areas-layout">
      {/* brand assets section*/}
      <section className="grid-areas-left flex flex-col gap-[20px]">
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

      {/* generate section */}
      <section className="grid-areas-right">
        <h2 className="text-[24px] -mb-[42px]">Generate</h2>
        <div className="grid-areas-generate-layout gap-[40px]">
          <div className="grid-areas-generate-editing">
            <ImageEditingBox />
          </div>
          <div className="grid-area-generate-variations mt-[58px]">
            <h3 className="mb-5">Variations</h3>
            <div
              style={{
                width: '100%',
                height: '300px',
                backgroundColor: 'salmon'
              }}
            ></div>
          </div>
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
