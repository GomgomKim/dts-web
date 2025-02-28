import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { useGetArchives } from '@/views/my-models/model/adapter'

import { URL_BASE_IMAGE_FILE } from '@/shared/api/constants'

import { useVirtualizer } from '@tanstack/react-virtual'

export const GenerativesItems: React.FC = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetArchives() // TODO: sorting type

  const allGroupedData = data
    ? data.pages.flatMap((page) => page.content.data)
    : []

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allGroupedData.length + 1 : allGroupedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // 각 그룹의 예상 높이
    overscan: 5,
    measureElement: (element) => element.getBoundingClientRect().height
  })

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allGroupedData.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allGroupedData.length,
    isFetchingNextPage,
    virtualizer.getVirtualItems()
  ])

  const getItemStyle = (
    index: number,
    totalItems: number,
    containerWidth: number
  ) => {
    const itemWidth = 120 // 아이템의 최소 너비
    const gap = 4 // 아이템 간 간격
    const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap))

    const isFirstRow = index < itemsPerRow
    const isLastRow = index >= totalItems - itemsPerRow
    const isLeftColumn = index % itemsPerRow === 0
    const isRightColumn =
      (index + 1) % itemsPerRow === 0 || index === totalItems - 1

    return {
      aspectRatio: '1 / 1',
      padding: '10px',
      minWidth: `${itemWidth}px`,
      maxWidth: `${itemWidth}px`,
      // minWidth: `${itemWidth}px`,
      // maxWidth: '200px',
      // flex: `1 1 ${itemWidth}px`,
      background: '#202124',
      borderTopLeftRadius: isFirstRow && isLeftColumn ? '8px' : '0',
      borderTopRightRadius: isFirstRow && isRightColumn ? '8px' : '0',
      borderBottomLeftRadius: isLastRow && isLeftColumn ? '8px' : '0',
      borderBottomRightRadius: isLastRow && isRightColumn ? '8px' : '0'
    }
  }

  const [containerWidth, setContainerWidth] = useState(100)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()

    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useLayoutEffect(() => {
    if (status === 'success' && containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [status, data])

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <span>Error: {(error as Error).message}</span>

  return (
    <div>
      <div
        ref={parentRef}
        style={{
          height: '75vh',
          width: '100%',
          overflow: 'auto'
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allGroupedData.length - 1
            const group = allGroupedData[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    'Loading more...'
                  ) : (
                    'Nothing more to load'
                  )
                ) : (
                  <>
                    <h3
                      style={{ padding: '5px' }}
                      className="mt-5 text-[1.125rem] font-semibold text-neutral-7"
                    >
                      {/* TODO: formatted */}
                      {formattedDate(group.createdDate)}
                    </h3>
                    <div
                      ref={containerRef}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '5px',
                        gap: '4px'
                      }}
                    >
                      {group.contents.map((item, index) => (
                        <div
                          key={item.contentsId}
                          className="relative overflow-hidden"
                          style={getItemStyle(
                            index,
                            group.contents.length,
                            containerWidth
                          )}
                        >
                          <Image
                            src={getImageUrl(item.encryptedContentsPath)}
                            alt={`${item.modelId}-${item.contentsId}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {isFetching && !isFetchingNextPage ? (
        <div>Background Updating...</div>
      ) : null}
    </div>
  )
}

const formattedDate = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth()는 0부터 시작
  const day = date.getDate()

  return `${year}. ${month}. ${day}`
}

// TODO: shared/utils 적용
export const getImageUrl = (imagePath: string) => {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? imagePath
    : process.env.NEXT_PUBLIC_API_URL + URL_BASE_IMAGE_FILE + imagePath
}
