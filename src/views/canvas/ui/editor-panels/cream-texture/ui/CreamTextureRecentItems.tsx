import { useCreamTextureStore } from '@/views/canvas/model/useEditorPanelsStore'

import { RecentItems } from '@/entities/recent-items'

import { DUMMY_DATA } from '../model/DATA'

export const CreamTextureRecentItems = () => {
  const selectedCreamTextureItem = useCreamTextureStore(
    (state) => state.selectedItem
  )
  const setSelectedCreamTextureItem = useCreamTextureStore(
    (state) => state.setSelectedItem
  )

  return (
    <RecentItems<(typeof DUMMY_DATA)[0]>
      data={DUMMY_DATA}
      selectedItem={selectedCreamTextureItem}
      onClickCheckbox={(item) => setSelectedCreamTextureItem(item)}
    />
  )
}
