import { DummyData } from '@/entities/recent-items/model/types'

import contacts1 from '/public/images/eye-contacts-1.png'
import contacts2 from '/public/images/eye-contacts-2.png'

export const DUMMY_DATA: DummyData[] = [
  {
    id: '1',
    name: 'EyeCandys',
    src: contacts1,
    assetType: 'CONTACT_LENS'
  },
  {
    id: '2',
    name: 'EyeCandys',
    src: contacts2,
    assetType: 'CONTACT_LENS'
  }
]
