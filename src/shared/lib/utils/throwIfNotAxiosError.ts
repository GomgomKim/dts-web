export const throwIfNotAxiosError = (e: unknown) => {
  if (e instanceof Error) {
    throw e
  } else {
    throw new Error('UNKNOWN_ERROR')
  }
}
