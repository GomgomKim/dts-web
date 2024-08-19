import Image from 'next/image'
import { useState } from 'react'

import LeftIcon from '/public/icons/arrow-left.svg'
import RightIcon from '/public/icons/arrow-right.svg'
import { Button } from '@/shared/ui'
import './styles.css'
import { Variation } from '@/entities/detail/model'
import { URL_VARIATION_LIST_IMAGE } from '@/entities/detail/constant'

type VariationsSectionProps = {
  data: Variation[] | undefined
  handleSelectedVariation: (variation: Variation) => void
}

const LIMIT_REQUEST = 3
const AMOUNT_PER_PAGE = 4
const INITIAL_PAGE = 1

export const VariationsSection = ({
  data,
  handleSelectedVariation
}: VariationsSectionProps) => {
  const [filteredData, setFilteredData] = useState<Variation[]>(
    data!.slice(0, AMOUNT_PER_PAGE)
  )
  const [reqCount, setReqCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE)
  const [totalPages, setTotalPages] = useState<number>(1)

  const handleClick = () => {
    setReqCount((prev) => prev + 1)

    setTotalPages((prev) => prev + 1)

    // TODO: data 길이 체크
    const newData =
      data?.slice(
        reqCount * AMOUNT_PER_PAGE,
        reqCount * AMOUNT_PER_PAGE + AMOUNT_PER_PAGE
      ) || []
    setFilteredData((prev) => [...newData, ...prev])
  }

  const isDisabled = (data && data.length < 5) || reqCount >= LIMIT_REQUEST

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h3>Variations</h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
            disabled={currentPage === INITIAL_PAGE}
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, INITIAL_PAGE))
            }
          >
            <LeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
          onClick={handleClick}
          disabled={isDisabled}
        >
          Generate New Variations
          <span>({reqCount} / 3)</span>
        </Button>
        <div className="grid-area-variations gap-4 flex-1">
          {filteredData
            .slice(
              (currentPage - 1) * AMOUNT_PER_PAGE,
              (currentPage - 1) * AMOUNT_PER_PAGE + AMOUNT_PER_PAGE
            )
            .map((item) => (
              <div
                key={item.encodedBaseImageId}
                className="rounded-[0.5rem] border-red-700 overflow-hidden relative aspectRatio-206/219 min-w-[206px] min-h-[219px] cursor-pointer"
                onClick={() => handleSelectedVariation(item)}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    `${URL_VARIATION_LIST_IMAGE}/` +
                    item.encodedBaseImageId
                  }
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
