import React, { useEffect, useRef, useState } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

interface Item {
  id: string
  content: string
  date: string
}

interface GroupedData {
  date: string
  items: Item[]
}

interface ServerResponse {
  groupedData: GroupedData[]
  nextCursor: number | null
}

async function fetchGroupedData(cursor: number = 0): Promise<ServerResponse> {
  // 서버에서 데이터를 가져오는 로직을 구현합니다.
  // 이 예제에서는 더미 데이터를 생성합니다.
  const groupedData: GroupedData[] = new Array(5).fill(null).map((_, i) => ({
    date: new Date(2025, 1, 25 + i).toISOString().split('T')[0],
    items: new Array(Math.floor(Math.random() * 5) + 1)
      .fill(null)
      .map((_, j) => ({
        id: `${cursor}-${i}-${j}`,
        content: `Item ${j + 1} for ${new Date(2025, 1, 25 + i).toDateString()}`,
        date: new Date(2025, 1, 25 + i).toISOString().split('T')[0]
      }))
  }))

  await new Promise((resolve) => setTimeout(resolve, 500)) // 서버 지연 시뮬레이션

  return {
    groupedData,
    nextCursor: cursor + 1
  }
}

export const GenerativesItems: React.FC = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['groupedData'],
    queryFn: ({ pageParam = 0 }) => fetchGroupedData(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0
  })

  const allGroupedData = data
    ? data.pages.flatMap((page) => page.groupedData)
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
    const itemWidth = 120 // 아이템의 최대 너비
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
      border: '1px solid #ddd',
      maxWidth: `${itemWidth}px`,
      flex: `1 1 ${itemWidth}px`,
      borderTopLeftRadius: isFirstRow && isLeftColumn ? '8px' : '0',
      borderTopRightRadius: isFirstRow && isRightColumn ? '8px' : '0',
      borderBottomLeftRadius: isLastRow && isLeftColumn ? '8px' : '0',
      borderBottomRightRadius: isLastRow && isRightColumn ? '8px' : '0'
    }
  }

  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <span>Error: {(error as Error).message}</span>

  return (
    <div>
      <h1>Grouped Infinite Scroll</h1>
      <div
        ref={parentRef}
        style={{
          height: '500px',
          width: '100%',
          overflow: 'auto',
          border: '1px solid #ccc'
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
                    <h3 style={{ backgroundColor: '#f0f0f0', padding: '5px' }}>
                      {group.date}
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
                      {group.items.map((item, index) => (
                        <div
                          key={item.id}
                          style={getItemStyle(
                            index,
                            group.items.length,
                            containerWidth
                          )}
                        >
                          {item.content}
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
