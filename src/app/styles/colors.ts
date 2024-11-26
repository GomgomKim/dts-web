const neutral = {
  0: '#0f1011',
  '0-50': 'rgba(15, 16, 17, 0.5)',
  '0-70': 'rgba(15, 16, 17, 0.7)',
  '0-80': 'rgba(15, 16, 17, 0.8)',
  '0-90': 'rgba(15, 16, 17, 0.9)',
  1: '#202124',
  2: '#2d2e33',
  3: '#393a40',
  4: '#616268',
  5: '#76777d',
  6: '#8f9096',
  7: '#aeafb5',
  8: '#d2d3d9',
  9: '#fff'
}

export const colorMap = {
  neutral
}

export type Color = keyof typeof colorMap
