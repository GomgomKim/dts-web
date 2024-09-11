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
import { Button } from '@/shared/ui'
import { useState } from 'react'
import './styles.css'

import CheckIcon from '/public/icons/check.svg'
import { cn } from '@/shared/lib/utils'
import { ExportButton } from '@/entities/detail/ui/ExportButton'
import { Variation } from '@/entities/detail/model'

interface Props {
  containerRef: React.RefObject<HTMLDivElement>
  selectedVariation: Variation | null
}

const DownloadDropdown = (props: Props) => {
  const [selectedFormat, setSelectedFormat] = useState('png')
  const [selectedQuality] = useState('small')
  const [isError] = useState(false)

  console.log(props.selectedVariation?.properties)

  const exportQualityOption =
    // props.selectedVariation?.properties.aspectRatio === '1:1'
    props.selectedVariation
      ? EXPORT_QUALITY_OPTIONS_1_1
      : EXPORT_QUALITY_OPTIONS_9_16

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
          onValueChange={setSelectedFormat}
        >
          {FORMAT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className={cn({
                'text-white': option.value === selectedFormat
              })}
              onSelect={(e) => {
                e.preventDefault()
              }}
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
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
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

        <div className="pt-3 px-5">
          <ExportButton
            imgType={selectedFormat}
            imgSize={
              exportQualityOption.find(
                (option) => option.value === selectedQuality
              )?.size
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

export { DownloadDropdown }

const FORMAT_OPTIONS = [
  { label: '.png', value: 'png' },
  { label: '.jpeg', value: 'jpeg' },
  { label: '.webp', value: 'webp' }
]

const EXPORT_QUALITY_OPTIONS_9_16 = [
  {
    label: 'Small',
    value: 'small',
    subText: '720 x 1280',
    size: { width: 720, height: 1280 }
  },
  {
    label: 'Medium',
    value: 'medium',
    subText: '1080 x 1920',
    size: { width: 1080, height: 1920 }
  },
  {
    label: 'Large',
    value: 'large',
    subText: '1920 x 2560',
    size: { width: 1920, height: 2560 }
  }
]

const EXPORT_QUALITY_OPTIONS_1_1 = [
  {
    label: 'Small',
    value: 'small',
    subText: '1280 x 1280',
    size: { width: 1280, height: 1280 }
  },
  {
    label: 'Medium',
    value: 'medium',
    subText: '1920 x 1920',
    size: { width: 1920, height: 1920 }
  },
  {
    label: 'Large',
    value: 'large',
    subText: '2560 x 2560',
    size: { width: 2560, height: 2560 }
  }
]
