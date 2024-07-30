import { ImageEditingBox } from '@/features/archive/ui/ImageEditingBox'
import { ImageInputBox } from '@/features/archive/ui/ImageInputBox'
import { Button } from '@/sdcn/components/ui/Button'
import './styles.css'

function Model({ modelName }: { modelName: string }) {
  console.log(modelName)
  return (
    <div className="gap-[40px] grid-areas-layout">
      {/* brand assets section*/}
      <section className="grid-areas-left flex flex-col gap-[20px]">
        <h2 className="text-[24px]">Brand Assets</h2>
        <div>
          <h3>Product</h3>
          <ImageInputBox />
        </div>
        <div>
          <h3>Brand Logo</h3>
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
          <div className="grid-area-generate-variations">
            <h3>Variations</h3>
            <div
              style={{
                width: '100%',
                height: '300px',
                backgroundColor: 'salmon'
              }}
            ></div>
          </div>
          <div className="grid-area-generate-skin">
            <h3>Skin Texture</h3>
          </div>
          <div className="grid-area-generate-faceangle">
            <h3>Aspect Ratio</h3>
          </div>
          <div className="grid-area-generate-aspectratio">
            <h3>Face Angle</h3>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Model
