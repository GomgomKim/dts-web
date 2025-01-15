import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs/Tabs'

import { getArchives } from './lib/api'
import { EditsCardItems } from './ui/edits-card-items'
import { Filters } from './ui/filters'
import { Generatives } from './ui/generatives'

const MY_MODELS_TABS = {
  generatives: 'generatives',
  edits: 'edits'
} as const

type MyModelsTabs = keyof typeof MY_MODELS_TABS

const DEFAULT_TAB = MY_MODELS_TABS.generatives

export default function MyModels() {
  const searchParams = useSearchParams()
  const [currentTab, setCurrentTab] = useState<MyModelsTabs>(
    () => (searchParams.get('tab') || DEFAULT_TAB) as MyModelsTabs
  )

  useEffect(() => {
    const res = getArchives({})
    console.log('archives res', res)
  }, [])

  useEffect(() => {
    setCurrentTab((searchParams.get('tab') || DEFAULT_TAB) as MyModelsTabs)
  }, [searchParams])

  return (
    <>
      <h1 className="mb-5 h-[2.375rem] text-[1.25rem] font-semibold lg:mb-8 lg:text-[2rem]">
        My Models
      </h1>

      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as MyModelsTabs)}
      >
        <div className="mb-5 flex flex-nowrap items-center">
          {/* 탭 */}
          <TabsList>
            <TabsTrigger value={MY_MODELS_TABS.generatives} asChild>
              <Link
                href={{
                  pathname: '/my-models',
                  // TODO: 상수 조합으로 수정
                  query: 'tab=generatives&order=NEWEST&mediaType=All' // tabs 플로우(필터링 옵션 그대로인지 초기화인지)에 따라 수정 예정
                }}
              >
                Generatives
              </Link>
            </TabsTrigger>
            <TabsTrigger value={MY_MODELS_TABS.edits} asChild>
              <Link
                href={{
                  pathname: '/my-models',
                  query: 'tab=edits&order=NEWEST&mediaType=All' // tabs 플로우(필터링 옵션 그대로인지 초기화인지)에 따라 수정 예정
                }}
              >
                Edits
              </Link>
            </TabsTrigger>
          </TabsList>
          {/* 정렬 및 필터 */}
          <div className="ml-auto">
            <Filters />
          </div>
        </div>
        {/* 탭 콘턴츠 */}
        <TabsContent value={MY_MODELS_TABS.generatives} className="h-full">
          <Generatives />
        </TabsContent>
        <TabsContent value={MY_MODELS_TABS.edits}>
          <EditsCardItems />
        </TabsContent>
      </Tabs>
    </>
  )
}
