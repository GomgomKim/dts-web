const IMAGE_MAX_SIZE = 5 * 1024 * 1024

export const isValidImageSize = (file: File) => {
  return file.size > IMAGE_MAX_SIZE ? false : true
}
