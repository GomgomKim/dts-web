'use client'

import { useState } from 'react'

import { Variation } from '@/shared/api/types'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { Switch } from '@/shared/ui/switch'

import CheckIcon from '/public/icons/check.svg'

import { useEditorStore } from '../../model/useEditorHistoryStore'
import {
  EXPORT_QUALITY_OPTIONS_1_1,
  EXPORT_QUALITY_OPTIONS_9_16,
  FORMAT_OPTIONS
} from './constant'
import './styles.css'
import { ExportButton } from './ui/ExportButton'

interface DownloadDropdownProps {
  containerRef: React.RefObject<HTMLDivElement>
  selectedVariation: Variation | null
}

export const DownloadDropdown = (props: DownloadDropdownProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('png')
  const [selectedQuality] = useState<string>('small')
  const [isError] = useState<boolean>(false)

  const editedVariationList = useEditorStore((state) => state.items)

  let exportQualityOption = EXPORT_QUALITY_OPTIONS_9_16

  if (props.selectedVariation) {
    const variationId = props.selectedVariation.variationId.toString()
    if (editedVariationList.has(variationId)) {
      const { ratio } = editedVariationList.get(variationId)!.present
      exportQualityOption =
        ratio === 'ASPECT_RATIO_1_1'
          ? EXPORT_QUALITY_OPTIONS_1_1
          : EXPORT_QUALITY_OPTIONS_9_16
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Free Download</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[400px]" sideOffset={-20}>
        {/* menu 1 */}
        <DropdownMenuLabel>FORMAT</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          className="flex px-5 py-3 w-[252px] justify-between"
          value={selectedFormat}
          onValueChange={(value) => setSelectedFormat(value)}
        >
          {FORMAT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className={cn({
                'text-white': option.value === selectedFormat
              })}
              onSelect={(e) => e.preventDefault()}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        {/* menu 2 */}
        <DropdownMenuLabel className="pt-5 pb-1 bl-5">
          EXPORT QUALITY
        </DropdownMenuLabel>
        <div>
          {exportQualityOption.map((option, i) => {
            if (i == 0)
              return (
                <DropdownMenuItem
                  key={option.label}
                  className={cn('flex justify-between', {
                    selected: selectedQuality === option.value
                  })}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex gap-x-2">
                    <span className="text-[0.875rem]">{option.label}</span>
                    <span className="font-medium text-[0.875rem] text-[#616268]">
                      {option.subText}
                    </span>
                  </div>
                  {selectedQuality === option.value && <CheckIcon />}
                </DropdownMenuItem>
              )
            else
              return (
                <div
                  key={option.label}
                  className="flex justify-between cursor-not-allowed px-5 py-3 text-[0.875rem] text-[#AEAFB5] font-medium outline-none "
                >
                  <div className="flex gap-x-2">
                    <span className="text-[0.875rem]">{option.label}</span>
                    <span className="font-medium text-[0.875rem] text-[#616268]">
                      {option.subText}
                    </span>
                  </div>
                  <span className="text-white text-[0.875rem]">Pro Plan</span>
                </div>
              )
          })}
        </div>

        {/* menu 3 */}
        <DropdownMenuLabel className="px-5 pt-5 pb-1">
          WATERMARK
        </DropdownMenuLabel>
        <div className="flex justify-between px-5 py-3">
          <div>
            <span className="text-[0.875rem] font-medium text-white">
              Pro plan&nbsp;
            </span>
            <span className="text-[0.875rem] font-medium text-[#AEAFB5]">
              only for watermark removal
            </span>
          </div>
          <Switch disabled={true} />
        </div>

        {/* export button */}
        <div className="pt-3 px-5">
          <ExportButton
            imageType={selectedFormat}
            imageSize={
              exportQualityOption.find(
                (option) => option.value === selectedQuality
              )!.size
            }
            containerRef={props.containerRef}
            className={cn('rounded-[8px] text-[0.75rem] font-semibold', {
              'bg-[#FF8480]': isError
            })}
            stretch
          >
            Continue
          </ExportButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
