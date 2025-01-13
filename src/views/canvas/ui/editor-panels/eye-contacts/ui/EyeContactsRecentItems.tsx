import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { RecentItems } from '@/entities/recent-items'
import { DummyData } from '@/entities/recent-items/model/types'

import { Asset } from '@/shared/api/types'

import { DUMMY_DATA } from '../model/DATA'

export const EyeContactsRecentItems = () => {
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const setSelectedEyeContactsItem = useEyeContactsStore(
    (state) => state.setSelectedItem
  )

  return (
    <RecentItems<DummyData | Asset>
      data={DUMMY_DATA}
      assetType="CONTACT_LENS"
      selectedItem={selectedEyeContactsItem}
      onClickCheckbox={(item) => setSelectedEyeContactsItem(item)}
    />
  )
}
