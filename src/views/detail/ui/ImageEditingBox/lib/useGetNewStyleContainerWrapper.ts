import * as React from 'react'

import {
  ASPECT_RATIO_MAP_NUMBER,
  ASPECT_RATIO_REVERT_MAP
} from '@/entities/detail/constant'

export const useGetNewStyleContainerWrapper = (
  boardRef: React.RefObject<HTMLDivElement>
) => {
  const getFitDirection = React.useCallback(
    (ratio: number) => {
      if (!boardRef.current?.clientHeight || !boardRef.current?.clientWidth)
        return 'height'

      const boardRefHeight = boardRef.current?.clientHeight
      const boardRefWidth = boardRef.current?.clientWidth

      const containerRatio = boardRefWidth / boardRefHeight

      // 컨테이너가 가로로 긴 경우
      if (containerRatio >= 1) return 'height'

      // 컨테이너가 세로로 긴 경우
      if (containerRatio < ratio) {
        return 'width'
      } else {
        return 'height'
      }
    },
    [boardRef]
  )

  const getNewStyleContainerWrapper = (aspectRatio: string) => {
    const fitDirection =
      aspectRatio === '1:1' ? getFitDirection(1) : getFitDirection(9 / 16)

    const otherFitDirection = fitDirection === 'height' ? 'width' : 'height'

    const newStyle: React.CSSProperties = {
      aspectRatio:
        ASPECT_RATIO_MAP_NUMBER[ASPECT_RATIO_REVERT_MAP[aspectRatio]],
      [fitDirection]: '100%',
      [otherFitDirection]: 'fit-content',
      margin: 'auto'
    }

    return newStyle
  }

  return getNewStyleContainerWrapper
}
