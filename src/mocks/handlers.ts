import { URL_EXPLORE_LIST } from '@/views/explore/ui/ExploreList/constant'
import { URL_FAVORITE_LIST } from '@/views/favorites/ui/FavoriteList/constant'

import { PostAiImageReqData } from '@/features/generate-variation/model/types'

import {
  URL_AI_IMAGE_GENERATE,
  URL_AI_IMAGE_GENERATE_PROGRESS,
  URL_VARIATION_LIST
} from '@/entities/detail/constant'

import {
  AspectRatio,
  FaceAngle,
  ModelImageItem,
  Variation
} from '@/shared/api/types'

import { faker } from '@faker-js/faker'
import { HttpResponse, http } from 'msw'
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
    const preset_1 = createResponseImages('abcd', 100)
    const preset_2 = createResponseImages('efg', 100)
    const preset_3 = createResponseImages('hij', 100)
    const responseImages: Variation[] = [preset_1, preset_2, preset_3]

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
    const { encodedBaseImageId } = newAiImageInfo as PostAiImageReqData

    if (!encodedBaseImageId) {
      return sendJsonResponse(0, 'Invalid request data', null, 400)
    }

    const responseImages = {
      encodedBaseImageId: randomString,
      properties: {
        aspectRatio: 'ASPECT_RATIO_9_16',
        faceAngle: 'FRONT'
      },
      isAiGenerated: true,
      encryptedImageUrl: '', // nullable??
      progress: 10,
      encodedAiBasedImageId: randomString,
      isFail: false,
      isTimeout: false,
      variations: null
    }

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
      const responseImages = {
        encodedBaseImageId: encodedImageId,
        properties: {
          aspectRatio: 'ASPECT_RATIO_9_16',
          faceAngle: 'FRONT'
        },
        isAiGenerated: true,
        encryptedImageUrl: '', // nullable??
        progress: 80,
        encodedAiBasedImageId: encodedImageId,
        isFail: false,
        isTimeout: false,
        variations: null
      }
      return sendJsonResponse(0, null, { variation: responseImages }, 200, {
        'Cache-Control': 'no-store'
      })
    }
  })
]

function createVariation(properties: {
  aspectRatio: string
  faceAngle: string
}) {
  const randomString = uuidv4()

  let size = {
    width: 1080,
    height: 1920
  }

  if (properties.aspectRatio === 'ASPECT_RATIO_1_1') {
    size = {
      width: 1080,
      height: 1080
    }
  }

  return {
    encodedBaseImageId: randomString,
    properties: {
      aspectRatio: properties.aspectRatio as AspectRatio,
      faceAngle: properties.faceAngle as FaceAngle
    },
    isAiGenerated: true,
    encryptedImageUrl: faker.image.urlLoremFlickr(size),
    progress: 100,
    encodedAiBasedImageId: '',
    isFail: false,
    isTimeout: false
  }
}

// Helper function to create response images
function createResponseImages(
  encodedBaseImageId: string,
  progress: number
): Variation & { variations: Variation[] } {
  const variation_1 = createVariation({
    aspectRatio: 'ASPECT_RATIO_9_16',
    faceAngle: 'LEFT'
  })
  const variation_2 = createVariation({
    aspectRatio: 'ASPECT_RATIO_9_16',
    faceAngle: 'FRONT'
  })
  const variation_3 = createVariation({
    aspectRatio: 'ASPECT_RATIO_9_16',
    faceAngle: 'RIGHT'
  })
  const variation_4 = createVariation({
    aspectRatio: 'ASPECT_RATIO_1_1',
    faceAngle: 'LEFT'
  })
  const variation_5 = createVariation({
    aspectRatio: 'ASPECT_RATIO_1_1',
    faceAngle: 'FRONT'
  })
  const variation_6 = createVariation({
    aspectRatio: 'ASPECT_RATIO_1_1',
    faceAngle: 'RIGHT'
  })

  return {
    ...variation_2,
    encodedBaseImageId,
    progress,
    variations: [
      variation_1,
      variation_2,
      variation_3,
      variation_4,
      variation_5,
      variation_6
    ]
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
