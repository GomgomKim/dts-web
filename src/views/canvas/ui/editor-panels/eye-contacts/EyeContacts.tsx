import { useEyeContactsStore } from '@/views/canvas/model/useEditorPanelsStore'

import { UploadPanel } from '@/widgets/editor-panel'

import { UI_TEXT } from './model/constants'
import { EyeContactsRecentItems, EyeContactsTransparency } from './ui'

interface EyeContactsProps {
  id: string
}

export const EyeContacts = (props: EyeContactsProps) => {
  const isRecentItemsShow = useEyeContactsStore(
    (state) => state.isShowRecentItems
  )
  const setIsRecentItemsShow = useEyeContactsStore(
    (state) => state.setIsShowRecentItems
  )

  return (
    <UploadPanel
      title={UI_TEXT.EYE_CONTACTS}
      panelId={props.id}
      isRecentItemsShow={isRecentItemsShow}
      toggleRecentItemsShow={() => setIsRecentItemsShow(!isRecentItemsShow)}
      recentItems={<EyeContactsRecentItems />}
      transparency={<EyeContactsTransparency />}
    />
  )
}
