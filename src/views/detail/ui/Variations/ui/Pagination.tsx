import { Button } from '@/shared/ui'

import AngleBracketIcon from '/public/icons/angle-bracket-open.svg'

interface PaginationProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
}

const INITIAL_PAGE = 1

export const Pagination = (props: PaginationProps) => {
  return (
    <div className="flex gap-1">
      <Button
        variant="sub2"
        size="icon"
        className="w-8 h-8 rounded-[0.25rem]"
        disabled={props.currentPage === INITIAL_PAGE}
        onClick={() =>
          props.setCurrentPage((prev) => Math.max(prev - 1, INITIAL_PAGE))
        }
      >
        <AngleBracketIcon />
      </Button>
      <div className="flex items-center text-center text-neutral-5 gap-[2px]">
        <span className="block w-[25px] text-neutral-8">
          {props.currentPage}
        </span>
        <span> / </span>
        <span className="block w-[25px]">{props.totalPage}</span>
      </div>
      <Button
        variant="sub2"
        size="icon"
        className="w-8 h-8 rounded-[0.25rem]"
        disabled={props.currentPage >= props.totalPage}
        onClick={() =>
          props.setCurrentPage((prev) => Math.min(prev + 1, props.totalPage))
        }
      >
        <AngleBracketIcon className="rotate-180" />
      </Button>
    </div>
  )
}
