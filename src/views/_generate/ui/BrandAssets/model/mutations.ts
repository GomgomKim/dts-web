import { useMutation, useQueryClient } from '@tanstack/react-query'

import { uploadBrandAsset } from './api'

export const useUploadBrandAssetMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => uploadBrandAsset(file),
    onSuccess: () => {
      // 업로드 성공 시 브랜드 에셋 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['brandAssets'] })
    }
  })
}
