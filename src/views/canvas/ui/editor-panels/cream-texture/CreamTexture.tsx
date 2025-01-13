import { useCreamTextureStore } from '@/views/canvas/model/useEditorPanelsStore'

import { UploadPanel } from '@/widgets/editor-panel'

import { UI_TEXT } from './model/constants'
import { CreamTextureRecentItems, CreamTextureTransparency } from './ui'

export const CreamTexture = () => {
  const isRecentItemsShow = useCreamTextureStore(
    (state) => state.isShowRecentItems
  )
  const setIsRecentItemsShow = useCreamTextureStore(
    (state) => state.setIsShowRecentItems
  )
  const setSelectedCreamTextureItem = useCreamTextureStore(
    (state) => state.setSelectedItem
  )

  return (
    <UploadPanel
      title={UI_TEXT.CREAM_TEXTURE}
      panelId="cream-texture"
      assetType="CREAM"
      onSuccess={(asset) => setSelectedCreamTextureItem(asset)}
      isRecentItemsShow={isRecentItemsShow}
      toggleRecentItemsShow={() => setIsRecentItemsShow(!isRecentItemsShow)}
      recentItems={<CreamTextureRecentItems />}
      transparency={<CreamTextureTransparency />}
    />
  )
}
