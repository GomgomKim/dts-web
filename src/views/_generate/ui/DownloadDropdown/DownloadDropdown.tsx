'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { ASPECT_RATIO_MAP } from '@/entities/generate/constant'

import { AspectRatio, Variation } from '@/shared/api/types'
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
import { EXPORT_IMAGE_FORMAT, EXPORT_IMAGE_QUALITY } from './type'
import { ExportButton } from './ui/ExportButton'

interface DownloadDropdownProps {
  isLoading: boolean
  containerRef: React.RefObject<HTMLDivElement>
  selectedVariation: Variation | null
}

export const DownloadDropdown = (props: DownloadDropdownProps) => {
  const pathname = usePathname()
  const modelName = pathname.split('/')[2]

  const [selectedFormat, setSelectedFormat] =
    useState<EXPORT_IMAGE_FORMAT>('png')
  const [selectedQuality] = useState<EXPORT_IMAGE_QUALITY>('small')

  const editedVariationList = useEditorStore((state) => state.items)

  const variationId = props.selectedVariation?.variationId.toString()

  let imageRatio: AspectRatio = 'ASPECT_RATIO_9_16'
  let exportQualityOption = EXPORT_QUALITY_OPTIONS_9_16

  if (variationId !== undefined && editedVariationList.has(variationId)) {
    const { ratio } = editedVariationList.get(variationId)!.present
    exportQualityOption =
      ratio === 'ASPECT_RATIO_1_1'
        ? EXPORT_QUALITY_OPTIONS_1_1
        : EXPORT_QUALITY_OPTIONS_9_16
    imageRatio = ratio
  }

  const isClient = typeof window !== 'undefined'
  const isSafari =
    isClient && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-neutral-1/50 2xl:h-[80px] 2xl:text-[1.5rem]"
          disabled={!variationId || !props.containerRef || props.isLoading}
        >
          Free Download
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[400px]" sideOffset={-20}>
        {/* menu 1 */}
        <DropdownMenuLabel>FORMAT</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          className={cn('flex gap-10 px-5 py-3', {
            'gap-5': isSafari
          })}
          value={selectedFormat}
          onValueChange={(value) =>
            setSelectedFormat(value as EXPORT_IMAGE_FORMAT)
          }
        >
          {FORMAT_OPTIONS.map((option) => {
            const isWebp = option.value == 'webp'
            return (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className={cn('text-nowrap', {
                  'text-white': option.value === selectedFormat
                })}
                onSelect={(e) => e.preventDefault()}
                disabled={isSafari && isWebp}
              >
                {option.label}
                {isSafari && isWebp ? ' - Unavailable on Safari' : ''}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>

        {/* menu 2 */}
        <DropdownMenuLabel className="pt-5">EXPORT QUALITY</DropdownMenuLabel>
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
                    <span className="text-[0.875rem] font-medium text-neutral-4">
                      {option.subText}
                    </span>
                  </div>
                  {selectedQuality === option.value && (
                    <CheckIcon width={16} height={16} stroke="white" />
                  )}
                </DropdownMenuItem>
              )
            else
              return (
                <div
                  key={option.label}
                  className="flex cursor-not-allowed justify-between px-5 py-3 text-[0.875rem] font-medium text-[#AEAFB5] outline-none "
                >
                  <div className="flex gap-x-2">
                    <span className="text-[0.875rem]">{option.label}</span>
                    <span className="text-[0.875rem] font-medium text-neutral-4">
                      {option.subText}
                    </span>
                  </div>
                  <span className="text-[0.875rem] text-white">Pro Plan</span>
                </div>
              )
          })}
        </div>

        {/* menu 3 */}
        <DropdownMenuLabel className="pt-5">WATERMARK</DropdownMenuLabel>
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
        <div className="px-5 pt-3">
          <ExportButton
            imageName={modelName}
            imageRatio={ASPECT_RATIO_MAP[imageRatio]}
            imageFormat={selectedFormat}
            imageQuality={selectedQuality}
            imageSize={
              exportQualityOption.find(
                (option) => option.value === selectedQuality
              )!.size
            }
            containerRef={props.containerRef}
            stretch
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
