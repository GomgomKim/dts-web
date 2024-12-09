import { revertMap } from '@/shared/lib/utils/revertMap'

import { MediaType, MediaTypeLabel, MediaTypeValue } from './types'

export const MEDIA_TYPE_OPTIONS: {
  label: MediaTypeLabel
  value: MediaTypeValue
}[] = [
  { label: 'All media', value: 'all' },
  { label: 'Image', value: 'image' },
  { label: 'Video', value: 'video' }
]

export const MEDIA_TYPES_MAP: Record<MediaTypeValue, MediaType> = {
  all: 'All',
  image: 'IMAGE',
  video: 'VIDEO'
}

export const MEDIA_TYPES_REVERT_MAP = revertMap(MEDIA_TYPES_MAP)
