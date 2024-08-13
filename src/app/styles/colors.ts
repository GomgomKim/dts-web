const neutral = {
  0: '#0f1011',
  '0-50': 'rgba(15, 16, 17, 0.5)',
  '0-70': 'rgba(15, 16, 17, 0.7)',
  '0-80': 'rgba(15, 16, 17, 0.8)',
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

const neutralAlpha = {
  1: 'hsla(236, 8%, 61%, 0.13)',
  2: 'rgba(182, 183, 206, 0.18)',
  3: 'rgba(198, 199, 221, 0.23)',
  4: 'rgba(231, 232, 246, 0.38)',
  5: 'rgba(239, 240, 252, 0.46)'
}

export const colorMap = {
  neutral,
  neutralAlpha
}

export type Color = keyof typeof colorMap
