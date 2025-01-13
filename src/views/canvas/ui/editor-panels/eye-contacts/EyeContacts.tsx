import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { UploadPanel } from '@/widgets/editor-panel'

import { UI_TEXT } from './model/constants'
import { EyeContactsRecentItems, EyeContactsTransparency } from './ui'

export const EyeContacts = () => {
  const isRecentItemsShow = useEyeContactsStore(
    (state) => state.isShowRecentItems
  )
  const setIsRecentItemsShow = useEyeContactsStore(
    (state) => state.setIsShowRecentItems
  )

  const setSelectedEyeContactsItem = useEyeContactsStore(
    (state) => state.setSelectedItem
  )

  return (
    <UploadPanel
      title={UI_TEXT.EYE_CONTACTS}
      panelId="eye-contacts"
      assetType="CONTACT_LENS"
      onSuccess={(asset) => setSelectedEyeContactsItem(asset)}
      isRecentItemsShow={isRecentItemsShow}
      toggleRecentItemsShow={() => setIsRecentItemsShow(!isRecentItemsShow)}
      recentItems={<EyeContactsRecentItems />}
      transparency={<EyeContactsTransparency />}
    />
  )
}
