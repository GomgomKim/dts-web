'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs/Tabs'

import { MY_ACCOUNT_TABS } from './model'
import { Credits, Settings, Subscriptions } from './ui'

type MyAccountTabs = keyof typeof MY_ACCOUNT_TABS

const DEFAULT_TAB = MY_ACCOUNT_TABS.subscriptions

export default function MyAccount() {
  const searchParams = useSearchParams()
  const [currentTab, setCurrentTab] = useState<MyAccountTabs>(
    () => (searchParams.get('tab') || DEFAULT_TAB) as MyAccountTabs
  )

  useEffect(() => {
    setCurrentTab((searchParams.get('tab') || DEFAULT_TAB) as MyAccountTabs)
  }, [searchParams])

  return (
    <>
      <h1 className="mb-5 h-[2.375rem] text-[1.25rem] font-semibold lg:mb-8 lg:text-[2rem]">
        My Account
      </h1>

      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as MyAccountTabs)}
      >
        {/* 탭 */}
        <TabsList className="mb-5">
          <TabsTrigger value={MY_ACCOUNT_TABS.subscriptions} asChild>
            <Link
              href={{
                pathname: '/my-account',
                query: `tab=${MY_ACCOUNT_TABS.subscriptions}`
              }}
            >
              {capitalizeFirstLetter(MY_ACCOUNT_TABS.subscriptions)}
            </Link>
          </TabsTrigger>
          <TabsTrigger value={MY_ACCOUNT_TABS.credits} asChild>
            <Link
              href={{
                pathname: '/my-account',
                query: `tab=${MY_ACCOUNT_TABS.credits}`
              }}
            >
              {capitalizeFirstLetter(MY_ACCOUNT_TABS.credits)}
            </Link>
          </TabsTrigger>
          <TabsTrigger value={MY_ACCOUNT_TABS.settings} asChild>
            <Link
              href={{
                pathname: '/my-account',
                query: `tab=${MY_ACCOUNT_TABS.settings}`
              }}
            >
              {capitalizeFirstLetter(MY_ACCOUNT_TABS.settings)}
            </Link>
          </TabsTrigger>
        </TabsList>

        {/* 탭 콘텐츠 */}
        <TabsContent value={MY_ACCOUNT_TABS.subscriptions} className="h-full">
          <Subscriptions />
        </TabsContent>
        <TabsContent value={MY_ACCOUNT_TABS.credits}>
          <Credits />
        </TabsContent>
        <TabsContent value={MY_ACCOUNT_TABS.settings}>
          <Settings />
        </TabsContent>
      </Tabs>
    </>
  )
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
