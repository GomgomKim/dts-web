import { StaticImageData } from 'next/image'

import contacts1 from '/public/images/eye-contacts-1.png'
import contacts2 from '/public/images/eye-contacts-2.png'

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
    src: contacts1
  },
  {
    id: '2',
    name: 'EyeCandys',
    src: contacts2
  },
  {
    id: '3',
    name: 'EyeCandys',
    src: contacts2
  },
  {
    id: '4',
    name: 'EyeCandys',
    src: contacts2
  },
  {
    id: '5',
    name: 'EyeCandys',
    src: contacts1
  },
  {
    id: '6',
    name: 'EyeCandys',
    src: contacts2
  },
  {
    id: '7',
    name: 'EyeCandys',
    src: contacts2
  },
  {
    id: '8',
    name: 'EyeCandys',
    src: contacts2
  }
]
