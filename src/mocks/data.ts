import { ArchiveItem } from '@/views/my-models/model/type'

import { faker } from '@faker-js/faker'

export const ImageData = {
  MAKEUP: [
    {
      id: 1,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 2,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 3,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 4,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    }
  ],
  SKINCARE: [
    {
      id: 5,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 6,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    }
  ],
  HAIR: [
    {
      id: 7,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailPath: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    }
  ]
}

export const ArchiveData: ArchiveItem[] = [
  {
    createdDate: '2025-02-24T19:02:00+09:00',
    contents: [
      {
        contentsId: 1001,
        modelId: 5001,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1002,
        modelId: 5002,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1003,
        modelId: 5001,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      }
    ]
  },
  {
    createdDate: '2025-02-27T19:02:00+09:00',
    contents: [
      {
        contentsId: 1001,
        modelId: 5001,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1002,
        modelId: 5002,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1003,
        modelId: 5003,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1004,
        modelId: 5004,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1005,
        modelId: 5005,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1006,
        modelId: 5006,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      }
    ]
  },
  {
    createdDate: '2025-02-28T19:02:00+09:00',
    contents: [
      {
        contentsId: 1001,
        modelId: 5001,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1002,
        modelId: 5002,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      },
      {
        contentsId: 1003,
        modelId: 5001,
        encryptedContentsPath: faker.image.urlLoremFlickr()
      }
    ]
  }
]
