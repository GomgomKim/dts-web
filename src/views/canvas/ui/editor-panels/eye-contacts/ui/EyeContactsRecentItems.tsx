import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { RecentItems } from '@/entities/recent-items'

import { DUMMY_DATA } from '../model/DATA'

export const EyeContactsRecentItems = () => {
  const selectedEyeContactsItem = useEyeContactsStore(
    (state) => state.selectedItem
  )
  const setSelectedEyeContactsItem = useEyeContactsStore(
    (state) => state.setSelectedItem
  )

  return (
    <RecentItems<(typeof DUMMY_DATA)[0]>
      data={DUMMY_DATA}
      selectedItem={selectedEyeContactsItem}
      onClickCheckbox={(item) => setSelectedEyeContactsItem(item)}
    />
  )
}
