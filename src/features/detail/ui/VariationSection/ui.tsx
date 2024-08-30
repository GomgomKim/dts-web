import Image from 'next/image'
import { useState } from 'react'

import AngleBracketIcon from '/public/icons/angle-bracket-open.svg'
import { Button } from '@/shared/ui'
import { Variation } from '@/entities/detail/model'
import { URL_VARIATION_LIST_IMAGE } from '@/entities/detail/constant'
import { useGetVariationImages } from '@/entities/detail/adapter'
import { useSearchParams } from 'next/navigation'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type VariationsSectionProps = {
  handleSelectedVariation: (variation: Variation) => void
}

const AMOUNT_PER_PAGE = 4
const INITIAL_PAGE = 1

export const VariationsSection = ({
  handleSelectedVariation
}: VariationsSectionProps) => {
  const searchParams = useSearchParams()
  const encodedBaseImageInfoId = searchParams.get('id') || ''

  const { data: variationImagesData } = useGetVariationImages(
    encodedBaseImageInfoId
  )

  // 첫 로드시 가져온 static image data + 새롭게 생성한 image data
  const [allData, setAllData] = useState(variationImagesData)

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE)
  const [totalPages, setTotalPages] = useState<number>(() => {
    return Math.ceil(allData.length / AMOUNT_PER_PAGE)
  })
  console.log(setAllData, setTotalPages)

  // const handlePagenation = () => {
  // polling 중이면 실행되도록
  // 현재 데이터가 n(한 페이지당 이미지 개수)의 배수면 다음 페이지 이동
  // 1. 이미지가 새로 생성되는거면 마지막 페이지로 이동,
  // 2. 새로 페이지 진입시 작업중인 내용이 있던거면 해당 페이지로 이동 + setSelectedVariation
  // setTotalPages((prev) => prev + 1)
  // }

  const renderData = allData.slice(
    (currentPage - 1) * AMOUNT_PER_PAGE,
    (currentPage - 1) * AMOUNT_PER_PAGE + AMOUNT_PER_PAGE
  )

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
            <AngleBracketIcon />
          </Button>
          <div className="flex items-center text-center text-neutral-5">
            <span className="block w-[25px]">{currentPage}</span>
            <span> / </span>
            <span className="block w-[25px]">{totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="w-5 h-5 rounded-[4px] bg-inherit hover:bg-secondary"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <AngleBracketIcon className="rotate-180" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 min-h-[120px] h-">
        {/*  */}
        {renderData.map((item) => (
          <div
            key={item.encodedBaseImageId}
            className="rounded-[0.5rem] overflow-hidden relative aspect-[206/219] w-full cursor-pointer border border-border"
            onClick={() => handleSelectedVariation(item)}
          >
            {/* TODO: progress < 100이면 polling & 스켈레톤 */}
            {item.isAiGenerated && item.progress < 100 ? (
              <Skeleton height="100%" />
            ) : (
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
            )}
          </div>
        ))}
        {/* null card */}
        {renderData.length < AMOUNT_PER_PAGE &&
          Array.from({ length: AMOUNT_PER_PAGE - renderData.length }).map(
            (_, index) => (
              <div
                // Key 변경
                key={index}
                className="border border-dotted border-border rounded-[0.5rem] aspect-[206/219] w-full"
              ></div>
            )
          )}
      </div>
    </>
  )
}
