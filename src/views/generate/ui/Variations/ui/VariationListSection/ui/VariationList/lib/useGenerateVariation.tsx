import { useGetAiImageProgress } from '@/views/generate/ui/Variations/model/adapter'

import { useAiImageGeneratingStore } from '@/entities/generate/store'

export const useGenerateVariation = (mainImageId: string) => {
  const queries = useGetAiImageProgress(mainImageId)

  const { removeAiImageGeneratingList, updateAiImageItem } =
    useAiImageGeneratingStore.getState()

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i]

    if (query.isLoading) {
      // console.log('로딩중')
      continue
    }

    if (query.isError) {
      console.error(query.error)
      continue
    }

    if (query.data?.content.variation.progress === 100) {
      const { variationId } = query.data.content.variation
      removeAiImageGeneratingList(variationId)
      updateAiImageItem(query.data?.content.variation)
    }
  }
}
