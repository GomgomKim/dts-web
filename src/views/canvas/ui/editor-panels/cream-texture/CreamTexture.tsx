import { useCreamTextureStore } from '@/views/canvas/model/useEditorPanelsStore'

import { UploadPanel } from '@/widgets/editor-panel'

import { UI_TEXT } from './model/constants'
import { CreamTextureRecentItems, CreamTextureTransparency } from './ui'

interface CreamTextureProps {
  id: string
}

export const CreamTexture = (props: CreamTextureProps) => {
  const isRecentItemsShow = useCreamTextureStore(
    (state) => state.isShowRecentItems
  )
  const setIsRecentItemsShow = useCreamTextureStore(
    (state) => state.setIsShowRecentItems
  )

  return (
    <UploadPanel
      title={UI_TEXT.CREAM_TEXTURE}
      panelId={props.id}
      isRecentItemsShow={isRecentItemsShow}
      toggleRecentItemsShow={() => setIsRecentItemsShow(!isRecentItemsShow)}
      recentItems={<CreamTextureRecentItems />}
      transparency={<CreamTextureTransparency />}
    />
  )
}
