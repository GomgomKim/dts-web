'use client'

import { Suspense } from 'react'

import { ImageInputBox } from '@/features/upload-asset'

import { RecentItemsSkeleton } from '@/entities/recent-items'

import { Asset, AssetType } from '@/shared/api/types'
import { EditorPanel } from '@/shared/ui/editor-panel'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'

import { UI_TEXT } from './model/constant'

interface UploadPanelProps {
  title: string // TODO: 타입 구체화
  panelId: string
  assetType: AssetType
  onSuccess: (asset: Asset) => void
  isRecentItemsShow: boolean
  toggleRecentItemsShow: () => void
  recentItems: React.ReactNode
  transparency: React.ReactNode
}

export const UploadPanel = (props: UploadPanelProps) => {
  return (
    <EditorPanel title={props.title} id={props.panelId}>
      {/* image upload */}
      <div className="shrink-0 basis-[160px] lg:my-1">
        <ImageInputBox
          disabled={false}
          assetType={props.assetType}
          onSuccess={props.onSuccess}
        />
      </div>

      {/* Recent */}
      <div className="flex items-center justify-between *:text-neutral-7">
        <h4 className="text-[1rem]">{UI_TEXT.RECENTS}</h4>
        <div className="flex items-center gap-2">
          <Label htmlFor="recent-show-mode" className="text-[0.875rem]">
            {props.isRecentItemsShow ? 'Show' : 'Hide'}
          </Label>
          <Switch
            id="recent-show-mode"
            checked={props.isRecentItemsShow}
            onCheckedChange={props.toggleRecentItemsShow}
          />
        </div>
      </div>
      {props.isRecentItemsShow ? (
        <div className="mr-[-10px] grow overflow-x-hidden overflow-y-scroll">
          <Suspense fallback={<RecentItemsSkeleton />}>
            {props.recentItems}
          </Suspense>
        </div>
      ) : null}

      {/* Transparency */}
      <div className="mt-4">
        <h4 className="mb-2 text-[1rem] text-neutral-7">
          {UI_TEXT.TRANSPARENCY}
        </h4>
        {props.transparency}
      </div>
    </EditorPanel>
  )
}
