import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'

import { Button } from '@/shared/ui'
import { useState } from 'react'

import CheckIcon from '/public/icons/check.svg'
import { Switch } from '../switch'
import { cn } from '@/shared/lib/utils'
const DownloadDropdown = () => {
  const [selectedFormat, setSelectedFormat] = useState('png')
  const [selectedQuality] = useState('small')
  const [isError] = useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Download</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px]">
        <DropdownMenuLabel>Format</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          className="flex px-5 py-3 w-[252px] justify-between"
          value={selectedFormat}
          onValueChange={setSelectedFormat}
        >
          {FORMAT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuLabel className="pt-5 pb-1 bl-5">
          EXPORT QUALITY
        </DropdownMenuLabel>
        <div>
          {EXPORT_QUALITY_OPTIONS.map((option, i) => {
            if (i == 0)
              return (
                <DropdownMenuItem
                  className="flex justify-between"
                  key={option.label}
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <div className="flex gap-x-2">
                    <span>{option.label}</span>
                    <span className="font-medium text-sm text-[#616268]">
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
                  className="flex justify-between cursor-not-allowed px-5 py-3 text-sm text-[#AEAFB5] font-medium outline-none "
                >
                  <div className="flex gap-x-2">
                    <span>{option.label}</span>
                    <span className="font-medium text-sm text-[#616268]">
                      {option.subText}
                    </span>
                  </div>
                  <span className="text-white">Pro Plan</span>
                </div>
              )
          })}
        </div>
        <DropdownMenuLabel className="px-5 pt-5 pb-1">
          WATERMARK
        </DropdownMenuLabel>
        <div className="flex justify-between px-5 py-3">
          <div>
            <span className="text-sm font-medium text-white">
              Pro plan&nbsp;
            </span>
            <span className="text-sm font-medium text-[#AEAFB5]">
              only for watermark removal
            </span>
          </div>
          <Switch disabled={true} />
        </div>
        <DropdownMenuCheckboxItem></DropdownMenuCheckboxItem>
        <div className="pt-3 px-5">
          <Button
            className={cn('rounded-[8px]', { 'bg-[#FF8480]': isError })}
            stretch={true}
            onClick={() => {
              alert(
                `let's download! format: ${selectedFormat} quality: ${selectedQuality}`
              )
            }}
          >
            Continue
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DownloadDropdown }

const FORMAT_OPTIONS = [
  { label: '.png', value: 'png' },
  { label: '.jpg', value: 'jpg' },
  { label: '.webp', value: 'webp' }
]

const EXPORT_QUALITY_OPTIONS = [
  {
    label: 'Small',
    value: 'small',
    subText: '720 x 1280'
  },
  {
    label: 'Medium',
    value: 'medium',
    subText: '1080 x 1920'
  },
  {
    label: 'Large',
    value: 'large',
    subText: '1920 x 2560'
  }
]
