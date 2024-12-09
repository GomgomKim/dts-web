export const revertMap = <T extends string, U extends string>(
  map: Record<T, U>
): Record<U, T> => {
  return Object.entries(map).reduce(
    (acc, [key, value]) => {
      acc[value as U] = key as T
      return acc
    },
    {} as Record<U, T>
  )
}
