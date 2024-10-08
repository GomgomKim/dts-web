export const convertFileToFormData = (file: File) => {
  const formData = new FormData()
  formData.append('source', file)
  return formData
}
