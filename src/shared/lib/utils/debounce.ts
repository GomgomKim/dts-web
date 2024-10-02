const DEFAULT_DEBOUNCE_WAIT = 300

export const debounce = <F extends (...args: never[]) => unknown>(
  func: F,
  wait = DEFAULT_DEBOUNCE_WAIT
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => func(...args), wait)
  }
}
