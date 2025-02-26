'use client'

import { useRef } from 'react'

import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { ModalComponentProps } from '@/shared/ui/modal/model/types'

// import { useGenerativeItemStore } from '../../model/useGenerativeItemStore'
import {
  CloseButton,
  DeleteButton,
  DownloadButton,
  EditWithAIToolButton,
  NewGenerateButton,
  NextButton,
  PreviousButton
} from './ui'

interface GenerativeItemViewModalProps extends ModalComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevId: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextId: any
}

export const GenerativeItemViewModal = (
  props: GenerativeItemViewModalProps
) => {
  const { onCloseModal } = props
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, onCloseModal)

  // const itemIndex = useGenerativeItemStore((state) => state.index)
  // const setItemIndex = useGenerativeItemStore((state) => state.setIndex)

  // const item = DATA[itemIndex]

  const hasPrevious = true
  const hasNext = true

  const handleClickPrevious = () => {
    // setItemIndex(Math.max(0, itemIndex - 1))
  }

  const handleClickNext = () => {
    // setItemIndex(Math.min(DATA.length - 1, itemIndex + 1))
  }

  console.log(props.item.content)
  console.log(props.prevId, props.nextId)
  console.log(props.data)
  // console.log(props.data[])
  const [page, col, cell] = props.prevId.split('-')
  console.log(
    page,
    col,
    cell,
    props.data[page]['items'],
    props.data[page]['items'][col]
    // props.data[page]['items'][col]['items'][cell]
  )
  // const prevItem = props.data[page]['items'][col][cell]
  // console.log(prevItem)

  return (
    <div
      id="modal-bg"
      className="absolute inset-0 z-50 inline-block bg-neutral-0/90 text-[100px] "
    >
      <div
        className="absolute-center h-[90%] w-[85%] rounded-lg border border-neutral-1 bg-black"
        ref={modalRef}
      >
        <PreviousButton
          hasPrevious={hasPrevious}
          onClickPrevious={handleClickPrevious}
        />
        <CloseButton onClickClose={onCloseModal} />
        {/* content */}
        <div className="h-full p-10">
          <div className="flex h-full gap-10">
            <div className="grow rounded-[0.5rem] bg-neutral-1/50">
              {/* TODO: 이미지 정렬 및 반응형 */}
              {/* {item.thumbnail} */}
            </div>
            <div className="flex basis-[280px] flex-col justify-between">
              <div>
                <h4 className="mb-3 text-[1.5rem] font-semibold leading-[29px]">
                  {/* {item.name} */}
                </h4>
                <p className="mb-5 leading-[19px] text-neutral-7">
                  {/* TODO: api 나오면 날짜 형식 변환 */}
                  Generated on
                  {/* {item.date} */}
                </p>
                <div className="flex items-center gap-2">
                  <DeleteButton />
                  <DownloadButton />
                </div>
              </div>

              <div>
                <EditWithAIToolButton />
                <NewGenerateButton />
              </div>
            </div>
          </div>
        </div>
        <NextButton hasNext={hasNext} onClickNext={handleClickNext} />
      </div>
    </div>
  )
}
