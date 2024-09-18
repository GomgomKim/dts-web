import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

import { ModelImageItem, Variation } from '@/shared/api/types'
import {
  ASPECT_RATIO_REVERT_MAP,
  FACE_ANGLE_REVERT_MAP,
  URL_AI_IMAGE_GENERATE,
  URL_AI_IMAGE_GENERATE_PROGRESS,
  URL_VARIATION_LIST
} from '@/entities/detail/constant'
import { PostAiImageReqData } from '@/views/detail/ui/EditVariation/model/types'
import { URL_EXPLORE_LIST } from '@/views/explore/ui/ExploreList/constant'
import { URL_FAVORITE_LIST } from '@/views/favorites/ui/FavoriteList/constant'

import { v4 as uuidv4 } from 'uuid'

const ImageData = {
  MAKEUP: [
    {
      encodedImageInfoId: 'aaaa',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encodedMainImageId: faker.image.urlLoremFlickr()
    },
    {
      encodedImageInfoId: 'bbbb',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encodedMainImageId: faker.image.urlLoremFlickr()
    },
    {
      encodedImageInfoId: 'cccc',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encodedMainImageId: faker.image.urlLoremFlickr()
    },
    {
      encodedImageInfoId: 'dddd',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encodedMainImageId: faker.image.urlLoremFlickr()
    }
  ],
  SKINCARE: [
    {
      encodedImageInfoId: 'AAA',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encodedMainImageId: faker.image.urlLoremFlickr()
    },
    {
      encodedImageInfoId: 'BBB',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encodedMainImageId: faker.image.urlLoremFlickr()
    }
  ],
  HAIR: [
    {
      encodedImageInfoId: 'qqqq',
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encodedMainImageId: faker.image.urlLoremFlickr()
    }
  ]
}

let current = 0

// encodedImageId마다 상태를 저장할 Map
const imageProgressMap = new Map<
  string,
  { startTime: number; finalProgressSent: boolean }
>()

export const handlers = [
  http.get(`${URL_EXPLORE_LIST}`, ({ request }) => {
    const url = new URL(request.url)
    const filterType = url.searchParams.get('filterType')
    const cursor = parseInt(url.searchParams.get('scrollKey') as string) || 1

    let responseImages: ModelImageItem[] = []
    if (filterType === 'FEATURED' || filterType === 'ALL') {
      responseImages = [
        ...ImageData.MAKEUP,
        ...ImageData.SKINCARE,
        ...ImageData.HAIR
      ]
    } else if (filterType === 'MAKEUP') {
      responseImages = ImageData.MAKEUP
    } else if (filterType === 'SKINCARE') {
      responseImages = ImageData.SKINCARE
    } else if (filterType === 'HAIR') {
      responseImages = ImageData.HAIR
    }

    const scrollkey = 10 * cursor === 1000 ? null : (10 * cursor).toString()
    return HttpResponse.json(
      {
        code: 0,
        message: null,
        content: {
          images: responseImages,
          hasNext: scrollkey === null ? false : true,
          scrollKey: scrollkey
        }
      },
      { status: 200 }
    )
  }),
  http.get(`${URL_FAVORITE_LIST}`, ({ request }) => {
    const url = new URL(request.url)
    const filterType = url.searchParams.get('filterType')
    let responseImages: ModelImageItem[] = []
    if (filterType === 'FEATURED' || filterType === 'ALL') {
      responseImages = [
        ...ImageData.MAKEUP.filter((i) => i.isFavorite),
        ...ImageData.SKINCARE.filter((i) => i.isFavorite),
        ...ImageData.HAIR.filter((i) => i.isFavorite)
      ]
    } else if (filterType === 'MAKEUP') {
      responseImages = ImageData.MAKEUP.filter((i) => i.isFavorite)
    } else if (filterType === 'SKINCARE') {
      responseImages = ImageData.SKINCARE.filter((i) => i.isFavorite)
    } else if (filterType === 'HAIR') {
      responseImages = ImageData.HAIR.filter((i) => i.isFavorite)
    }
    return HttpResponse.json(
      {
        code: 0,
        message: null,
        content: {
          images: responseImages,
          hasNext: false,
          scrollKey: null
        }
      },
      { status: 200 }
    )
  }),
  http.get(`${URL_VARIATION_LIST}`, () => {
    const responseImages: Variation[] = [
      {
        encodedBaseImageId: 'abcd',
        properties: {
          aspectRatio: 'ASPECT_RATIO_1_1',
          faceAngle: 'FRONT'
        },
        isAiGenerated: false,
        encryptedImageUrl: faker.image.urlLoremFlickr({
          width: 1080,
          height: 1080
        }),
        progress: 100,
        encodedAiBasedImageId: 'cccc',
        isFail: false,
        isTimeout: false
      },
      {
        encodedBaseImageId: 'efg',
        properties: {
          aspectRatio: 'ASPECT_RATIO_9_16',
          faceAngle: 'FRONT'
        },
        isAiGenerated: false,
        encryptedImageUrl: faker.image.urlLoremFlickr({
          width: 1080,
          height: 1920
        }),
        progress: 100,
        encodedAiBasedImageId: 'cccc',
        isFail: false,
        isTimeout: false
      },
      {
        encodedBaseImageId: 'hij',
        properties: {
          aspectRatio: 'ASPECT_RATIO_1_1',
          faceAngle: 'RIGHT'
        },
        isAiGenerated: false,
        encryptedImageUrl: faker.image.urlLoremFlickr({
          width: 1920,
          height: 1920
        }),
        progress: 100,
        encodedAiBasedImageId: 'cccc',
        isFail: false,
        isTimeout: false
      }
    ]

    return HttpResponse.json(
      {
        code: 0,
        message: null,
        content: {
          mainImageIndex: 0,
          variations: responseImages,
          restriction: {
            current: current,
            max: 100
          }
        }
      },
      { status: 200 }
    )
  }),
  http.post(`${URL_AI_IMAGE_GENERATE}`, async ({ request }) => {
    const newAiImageInfo = await request.json()
    if (!newAiImageInfo) {
      throw new Error('Invalid request data')
    }
    const randomString = uuidv4()
    const {
      // encodedBaseImageId,
      properties: { aspectRatio, faceAngle }
    } = newAiImageInfo as PostAiImageReqData

    const responseImages = createResponseImages(
      randomString,
      10,
      aspectRatio,
      faceAngle
    )

    return sendJsonResponse(
      0,
      null,
      {
        variation: responseImages,
        restriction: { current: ++current, max: 100 }
      },
      200
    )
  }),
  http.get(`${URL_AI_IMAGE_GENERATE_PROGRESS}`, ({ request }) => {
    const url = new URL(request.url)
    const encodedImageId = url.searchParams.get('encodedImageId')

    if (!encodedImageId) {
      return sendJsonResponse(0, 'no encodedImageId', null, 400)
    }

    if (!imageProgressMap.has(encodedImageId)) {
      imageProgressMap.set(encodedImageId, {
        startTime: Date.now(),
        finalProgressSent: false
      })
    }

    const imageState = imageProgressMap.get(encodedImageId)
    if (!imageState) {
      return sendJsonResponse(
        0,
        'Unexpected error: Image state not found.',
        null,
        400
      )
    }

    const currentTime = Date.now()
    const elapsedTime = (currentTime - imageState.startTime) / 1000

    if (elapsedTime >= 10 && !imageState.finalProgressSent) {
      imageProgressMap.delete(encodedImageId)
      const responseImages = createResponseImages(encodedImageId, 100)
      return sendJsonResponse(0, null, { variation: responseImages }, 200, {
        'Cache-Control': 'no-store'
      })
    }

    if (elapsedTime < 10) {
      const responseImages = createResponseImages(encodedImageId, 80)
      return sendJsonResponse(0, null, { variation: responseImages }, 200, {
        'Cache-Control': 'no-store'
      })
    }
  })
]

// Helper function to create response images
function createResponseImages(
  encodedBaseImageId: string,
  progress: number,
  aspectRatio = '1:1',
  faceAngle = 'Front'
): Variation {
  return {
    encodedBaseImageId,
    properties: {
      aspectRatio: ASPECT_RATIO_REVERT_MAP[aspectRatio],
      faceAngle: FACE_ANGLE_REVERT_MAP[faceAngle]
    },
    isAiGenerated: true,
    encryptedImageUrl: faker.image.urlLoremFlickr({
      width: 1080,
      height: 1080
    }),
    progress,
    encodedAiBasedImageId: encodedBaseImageId,
    isFail: false,
    isTimeout: false
  }
}

// Helper function to send HTTP JSON response
function sendJsonResponse(
  code: number,
  message: string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any,
  status: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any
) {
  return HttpResponse.json({ code, message, content }, { status, headers })
}
