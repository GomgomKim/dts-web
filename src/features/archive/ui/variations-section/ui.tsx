import Image from 'next/image'

import LeftIcon from '/public/icons/arrow-left.svg'
import RightIcon from '/public/icons/arrow-right.svg'
import { Button } from '@/shared/ui'
import './styles.css'

import Img1 from '/public/images/model-gen-1.png'
import Img2 from '/public/images/model-gen-2.png'
import Img3 from '/public/images/model-gen-3.png'
import Img4 from '/public/images/model-gen-4.png'

const dummyImages = [Img1, Img2, Img3, Img4]

export const VariationsSection = () => {
  return (
    <>
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
        <div className="grid-area-variations gap-4 flex-1 max-h-">
          {dummyImages.map((img, idx) => (
            <div
              key={idx}
              className="rounded-[0.5rem] overflow-hidden relative aspectRatio-206/219"
            >
              <Image
                src={img}
                alt=""
                className="absolute-center"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
