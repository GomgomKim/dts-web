'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  Box,
  ResizableAndDraggableBoxes
} from '@/features/archive/ui/resizable-and-draggable-boxes'
import { ExportButton } from '@/features/archive/ui/export-button'
import { Variation } from '@/views/model/model'
import { URL_VARIATION_LIST_IMAGE } from '@/views/model/constant'
import { Button } from '@/shared/ui'

type ImageEditingBoxProps = {
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
  isChangedOption: boolean
}

export const ImageEditingBox = ({
  boxes,
  setBoxes,
  selectedVariation,
  isChangedOption
}: ImageEditingBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const aspectRatio = '9/16' // TODO: url query optional

  return (
    <>
      <div className="text-right mb-[20px]">
        <ExportButton containerRef={containerRef} className="ml-auto" />
      </div>
      <div className="h-[572px] bg-neutral-1 rounded-[0.5rem] overflow-hidden relative flex justify-center w-[100%]">
        <div
          ref={containerRef}
          className="object-contain overflow-hidden"
          style={{
            position: 'relative',
            aspectRatio: aspectRatio
          }}
        >
          {selectedVariation && (
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL +
                `${URL_VARIATION_LIST_IMAGE}/` +
                selectedVariation.encodedBaseImageId
              }
              alt=""
              fill
            />
          )}
          <ResizableAndDraggableBoxes
            containerRef={containerRef}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        </div>
        {isChangedOption ? (
          <div className="absolute bottom-[20px] left-[50%] -translate-x-[50%]">
            <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
              <p className="mx-5 text-[14px] text-nowrap">
                Do you want to apply the changes?
              </p>
              <Button className="rounded-[8px]">Apply Changes</Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

// 'use client'

// import {
//   Box,
//   ResizableAndDraggableBoxes
// } from '@/features/archive/ui/resizable-and-draggable-boxes'
// import { ExportButton } from '@/features/archive/ui/export-button'
// import { useRef } from 'react'

// import { faker } from '@faker-js/faker'
// import Image from 'next/image'

// const dummy = faker.image.urlLoremFlickr({ width: 540, height: 400 })

// type ImageEditingBoxProps = {
//   boxes: Box[]
//   setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
// }

// export const ImageEditingBox = ({ boxes, setBoxes }: ImageEditingBoxProps) => {
//   const containerRef = useRef<HTMLDivElement>(null)

//   const aspectRatio = '1/1' // TODO: url query optional

//   return (
//     <>
//       <div className="text-right mb-[20px]">
//         <ExportButton containerRef={containerRef} className="ml-auto" />
//       </div>
//       <div className="h-[572px] bg-neutral-1 rounded-[0.5rem] overflow-hidden w-[100%] relative">
//         <div
//           ref={containerRef}
//           className=" m-auto"
//           style={{
//             height: '100%',
//             aspectRatio: aspectRatio // TODO: url query optional
//           }}
//         >
//           <div className="w-full h-full" style={{ overflow: 'hidden' }}>
//             <Image src={dummy} alt="" fill style={{ objectFit: 'contain' }} />
//           </div>
//           <ResizableAndDraggableBoxes
//             containerRef={containerRef}
//             boxes={boxes}
//             setBoxes={setBoxes}
//           />
//         </div>
//       </div>
//     </>
//   )
// }
