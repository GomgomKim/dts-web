import { EXPORT_IMAGE_FORMAT, EXPORT_IMAGE_QUALITY } from './type'

interface ExportFormatOption {
  label: string
  value: EXPORT_IMAGE_FORMAT
}

interface ExportQualityOption {
  label: string
  value: EXPORT_IMAGE_QUALITY
  subText: string
  size: {
    width: number
    height: number
  }
}

export const FORMAT_OPTIONS: ExportFormatOption[] = [
  { label: '.png', value: 'png' },
  { label: '.jpeg', value: 'jpeg' },
  { label: '.webp', value: 'webp' }
]

export const EXPORT_QUALITY_OPTIONS_9_16: ExportQualityOption[] = [
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

export const EXPORT_QUALITY_OPTIONS_1_1: ExportQualityOption[] = [
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
