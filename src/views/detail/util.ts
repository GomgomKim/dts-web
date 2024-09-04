export const convertImagesToBoxData = (assetImages: Map<string, string>) => {
  const imageData = Array.from(assetImages.entries()).map(([id, image]) => ({
    id,
    image
  }))

  const boxesData = imageData.map((imageItem, idx) => ({
    ...imageItem,
    // TODO: 컨테이너 넘어가지 않게 추가 처리
    left: 50 + idx * 50,
    top: 50 + idx * 50,
    width: 200,
    height: 200,
    zIndex: 1
  }))

  return boxesData
}
