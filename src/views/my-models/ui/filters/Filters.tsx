import { useClientSearchParams } from '@/shared/lib/hooks/useClientSearchParams'

import { MediaTypeDropdown } from './ui/media-type-dropdown'
import { MEDIA_TYPES_MAP } from './ui/media-type-dropdown/constant'
import { OrderDropdown } from './ui/order-dropdown'
import { ORDER_TYPES_MAP } from './ui/order-dropdown/constant'

export const Filters = () => {
  const { addSearchParams } = useClientSearchParams({ action: 'replace' })

  const handleChangeOrderValue = (value: string) => {
    addSearchParams({
      order: ORDER_TYPES_MAP[value as keyof typeof ORDER_TYPES_MAP]
    })
  }

  const handleChangeMediaTypeValue = (value: string) => {
    addSearchParams({
      mediaType: MEDIA_TYPES_MAP[value as keyof typeof MEDIA_TYPES_MAP]
    })
  }

  return (
    <>
      <OrderDropdown onChangeValue={handleChangeOrderValue} />
      <MediaTypeDropdown onChangeValue={handleChangeMediaTypeValue} />
    </>
  )
}
