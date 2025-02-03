import HairGreen from '/public/images/hair-mint.png'
import HairPink from '/public/images/hair-pink.png'
import HairPurple from '/public/images/hair-purple.png'
import HairRed from '/public/images/hair-red.png'
import HairYellow from '/public/images/hair-yellow.png'

export const UI_TEXT = {
  HAIR_COLOR: 'Hair Color'
}

interface HairColorPreset {
  name: string
  color: [number, number, number]
  backgroundImage: string
}

export const HAIR_COLOR_PRESETS: HairColorPreset[] = [
  {
    name: 'Y.01',
    color: [255, 249, 222],
    backgroundImage: HairYellow.src
  },
  {
    name: 'R.01',
    color: [255, 237, 237],
    backgroundImage: HairRed.src
  },
  {
    name: 'P.01',
    color: [255, 222, 238],
    backgroundImage: HairPink.src
  },
  {
    name: 'G.01',
    color: [222, 248, 255],
    backgroundImage: HairGreen.src
  },
  {
    name: 'P.02',
    color: [234, 222, 255],
    backgroundImage: HairPurple.src
  }
]
