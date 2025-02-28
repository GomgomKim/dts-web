import { URL_BASE_IMAGE_FILE } from '@/shared/api/constants'

export const getImageUrl = (imagePath: string) => {
  return process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? imagePath
    : process.env.NEXT_PUBLIC_API_URL + URL_BASE_IMAGE_FILE + imagePath
}
