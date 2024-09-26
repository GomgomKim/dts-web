export const convertImagesToBoxData = (assetImages: Map<string, string>) => {
  // 초기 위치로 reset
  const imageData = Array.from(assetImages.entries()).map(([id, image]) => ({
    id,
    createdAt: Date.now(),
    image,
    bottom: id === 'logo' ? 40 : 148,
    height: id === 'logo' ? 100 : 200,
    width: 200
  }))

  return imageData
}
