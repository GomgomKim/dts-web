import { useCreamTextureStore } from '@/views/canvas/model/useEditorPanelsStore'

import { RecentItems } from '@/entities/recent-items'
import { DummyData } from '@/entities/recent-items/model/types'

import { Asset } from '@/shared/api/types'

import { DUMMY_DATA } from '../model/DATA'

export const CreamTextureRecentItems = () => {
  const selectedCreamTextureItem = useCreamTextureStore(
    (state) => state.selectedItem
  )
  const setSelectedCreamTextureItem = useCreamTextureStore(
    (state) => state.setSelectedItem
  )

  return (
    <RecentItems<DummyData | Asset>
      data={DUMMY_DATA}
      assetType="CREAM"
      selectedItem={selectedCreamTextureItem}
      onClickCheckbox={(item) => setSelectedCreamTextureItem(item)}
    />
  )
}
