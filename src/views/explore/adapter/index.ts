import { getExploreImages } from '@/views/explore/api'
import { useQuery } from '@tanstack/react-query'

const useGetExploreImages = (tagType: string) => {
  const { data, status, error } = useQuery({
    queryKey: ['explore', tagType],
    queryFn: () => getExploreImages({ tagType })
  })

  return { data, status, error }
}

export default useGetExploreImages
