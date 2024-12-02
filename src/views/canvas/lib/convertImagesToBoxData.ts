import { Box } from '@/views/canvas/ui/image-editing-box/ui'

export const convertImageToBoxData = (
  id: string,
  previewImgSrc: string
): Box => {
  const width = 200
  const height = id === 'logo' ? 100 : 200
  const bottomDistance = id === 'logo' ? 40 : 148

  return {
    id,
    createdAt: Date.now(),
    image: previewImgSrc,
    centerX: 0, // 상위 컨테이너 중심에 위치
    centerY: bottomDistance, // 하단에서부터 위치
    width,
    height
  }
}
