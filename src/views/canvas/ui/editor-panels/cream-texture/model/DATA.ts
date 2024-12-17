import { StaticImageData } from 'next/image'

import cream1 from '/public/images/cream-1.png'
import cream2 from '/public/images/cream-2.png'
import cream3 from '/public/images/cream-3.png'
import cream4 from '/public/images/cream-4.png'

// TODO: api 나오면 shared에 선언
export interface DummyData {
  id: string
  name: string
  src: StaticImageData
}

export const DUMMY_DATA: DummyData[] = [
  {
    id: '1',
    name: 'EyeCandys',
    src: cream1
  },
  {
    id: '2',
    name: 'EyeCandys',
    src: cream2
  },
  {
    id: '3',
    name: 'EyeCandys',
    src: cream3
  },
  {
    id: '4',
    name: 'EyeCandys',
    src: cream4
  }
]
