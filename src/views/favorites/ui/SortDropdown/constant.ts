import { SortingType, SortingTypeLabel } from '../../types'

export const SORTING_TYPES = ['OLDEST', 'NEWEST']

export const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' }
]

export const SORTING_TYPE_MAP: Record<string, SortingType> = {
  newest: 'NEWEST',
  oldest: 'OLDEST'
}

export const SORTING_TYPE_REVER_MAP: Record<SortingType, string> = {
  NEWEST: 'newest',
  OLDEST: 'oldest'
}

export const SORTING_TYPE_LABEL_MAP: Record<string, SortingTypeLabel> = {
  newest: 'Newest first',
  oldest: 'Oldest first'
}
