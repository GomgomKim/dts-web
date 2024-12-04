'use client'

import { useState } from 'react'

import { ImageInputBox } from '@/features/remove-background'

import { Slider } from '@/shared/ui/Slider'
import { EditorPanel } from '@/shared/ui/editor-panel'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'

import { RecentItems } from './ui/recent-items'

interface UploadPanelProps {
  title: string
  panelId: string
}

export const UploadPanel = (props: UploadPanelProps) => {
  const [isRecentItemsShow, setIsRecentItemsShow] = useState(false)

  return (
    <EditorPanel title={props.title}>
      {/* image upload */}
      <div className="shrink-0 basis-[160px] lg:my-1">
        <ImageInputBox disabled={true} panelId={props.panelId} />
      </div>

      {/* Recent */}
      <div className="flex items-center justify-between *:text-neutral-7">
        <h4 className="text-[1rem]">Recent</h4>
        <div className="flex items-center gap-2">
          <Label htmlFor="recent-show-mode" className="text-[0.875rem]">
            {isRecentItemsShow ? 'Show' : 'Hide'}
          </Label>
          <Switch
            id="recent-show-mode"
            checked={isRecentItemsShow}
            onCheckedChange={() => setIsRecentItemsShow((prev) => !prev)}
          />
        </div>
      </div>
      {isRecentItemsShow ? (
        <div className="mr-[-10px] grow overflow-x-hidden overflow-y-scroll">
          <RecentItems />
        </div>
      ) : null}

      {/* Transparency */}
      <div className="mt-4">
        <h4 className="mb-2 text-[1rem] text-neutral-7">Transparency</h4>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    </EditorPanel>
  )
}
