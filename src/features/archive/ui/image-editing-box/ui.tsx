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
import { cn } from '@/shared/lib/utils'

type ImageEditingBoxProps = {
  boxes: Box[]
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>
  selectedVariation: Variation | null
  className: string
}

export const ImageEditingBox = ({
  boxes,
  setBoxes,
  selectedVariation,
  className
}: ImageEditingBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const aspectRatio = '9/16' // TODO: url query optional

  return (
    <>
      <div className="text-right mb-[20px]">
        <ExportButton containerRef={containerRef} className="ml-auto">
          Download
        </ExportButton>
      </div>
      <div
        className={cn(
          'h-[572px] bg-neutral-1 rounded-[0.5rem] overflow-hidden relative flex justify-center w-[100%]',
          className
        )}
      >
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
        {/* TODO: download it now 버튼 띄우기 */}
        {/* {isNewImage ? (
        <div className="absolute bottom-[20px] left-[50%] -translate-x-[50%]">
          <div className="flex items-center py-2 pr-2 rounded-md bg-black/80">
            <div className="mx-5 flex flex-col gap-1">
              <p className="text-[12px] text-nowrap font-[700]">
                Love what you see?
              </p>
              <p className="text-[12px] text-nowrap text-neutral-7">
                The magic might look different next time!
              </p>
            </div>
            <ExportButton
              containerRef={containerRef}
              className="ml-auto bg-white text-black font-[600]"
            >
              Download it now
            </ExportButton>
          </div>
        </div>
       ) : null} */}
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
