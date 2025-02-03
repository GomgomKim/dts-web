export const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  const s = max === 0 ? 0 : diff / max
  const v = max

  if (diff !== 0) {
    switch (max) {
      case r:
        h = 60 * ((g - b) / diff + (g < b ? 6 : 0))
        break
      case g:
        h = 60 * ((b - r) / diff + 2)
        break
      case b:
        h = 60 * ((r - g) / diff + 4)
        break
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
