import * as React from 'react'
import { ImageInputBox } from '@/features/detail/ui/ImageInputBox'
import { Button } from '@/shared/ui/button'
interface Props {
  handleRemoveBox: (boxId: string) => void
  handleAddBrandAssets: () => void
  assetDisabled: boolean
}

function BrandAssets(props: Props) {
  return (
    <section className="sticky top-[76px] flex flex-col gap-5">
      <h2 className="text-[24px]">Brand Assets</h2>
      <div>
        <h3 className="mb-3">Product</h3>
        <ImageInputBox
          boxId="product"
          onChangeBrandAsset={() => props.handleRemoveBox('product')}
        />
      </div>
      <div>
        <h3 className="mb-3">Brand Logo</h3>
        <ImageInputBox
          boxId="logo"
          onChangeBrandAsset={() => props.handleRemoveBox('logo')}
        />
      </div>
      {/* <div className="flex flex-col">
              <Button variant="outline">Remove Background</Button> */}
      <Button
        onClick={props.handleAddBrandAssets}
        disabled={props.assetDisabled}
      >
        Add Brand Assets
      </Button>
      {/* </div> */}
    </section>
  )
}

export default BrandAssets
