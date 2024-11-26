import { useCallback, useState } from 'react'

interface UseBrandAssetsReturnType {
  imagePreviewUrls: Map<string, string>
  addImagePreviewUrl: (id: string, previewImgSrc: string) => void
  removeImagePreviewUrl: (id: string) => void
}

export const useBrandAssets = (): UseBrandAssetsReturnType => {
  const [imagePreviewUrls, setImagePreviewUrls] = useState(
    new Map<string, string>()
  )

  const addImagePreviewUrl = useCallback(
    (id: string, previewImgSrc: string) => {
      setImagePreviewUrls((prev) => new Map(prev).set(id, previewImgSrc))
    },
    []
  )

  const removeImagePreviewUrl = useCallback((id: string) => {
    setImagePreviewUrls((prev) => {
      const updatedMap = new Map(prev)
      updatedMap.delete(id)
      return updatedMap
    })
  }, [])

  return {
    imagePreviewUrls,
    addImagePreviewUrl,
    removeImagePreviewUrl
  }
}
