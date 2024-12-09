import { URL_EXPLORE_LIST } from '@/views/explore/ui/gallery/model/constant'
import { URL_FAVORITE_LIST } from '@/views/favorites/ui/favorite-items/model/constant'

import {
  URL_AI_IMAGE_GENERATE,
  URL_AI_IMAGE_GENERATE_PROGRESS,
  URL_VARIATION_LIST
} from '@/entities/generate/constant'

import {
  AspectRatio,
  FaceAngle,
  MainItem,
  Variation,
  VariationImage
} from '@/shared/api/types'

import { faker } from '@faker-js/faker'
import { HttpResponse, http } from 'msw'

const ImageData = {
  MAKEUP: [
    {
      id: 1,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 2,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 3,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 4,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    }
  ],
  SKINCARE: [
    {
      id: 5,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    },
    {
      id: 6,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: true,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    }
  ],
  HAIR: [
    {
      id: 7,
      name: 'jisoo',
      description: '지수의 메인 이미지',
      isFavorite: false,
      encryptedThumbnailUrl: faker.image.urlLoremFlickr(),
      tags: ['tag1', 'tag2']
    }
  ]
}

let current = 0

// variationId마다 상태를 저장할 Map
const imageProgressMap = new Map<
  string,
  { startTime: number; finalProgressSent: boolean }
>()

export const handlers = [
  http.get(`${URL_EXPLORE_LIST}`, ({ request }) => {
    const url = new URL(request.url)
    const tagType = url.searchParams.get('tagType')
    const cursor = parseInt(url.searchParams.get('scrollKey') as string) || 1

    let responseImages: MainItem[] = []
    if (tagType === 'FEATURED' || tagType === 'ALL') {
      responseImages = [
        ...ImageData.MAKEUP,
        ...ImageData.SKINCARE,
        ...ImageData.HAIR
      ]
    } else if (tagType === 'MAKEUP') {
      responseImages = ImageData.MAKEUP
    } else if (tagType === 'SKINCARE') {
      responseImages = ImageData.SKINCARE
    } else if (tagType === 'HAIR') {
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
    const tagType = url.searchParams.get('tagType')
    let responseImages: MainItem[] = []
    if (tagType === 'FEATURED' || tagType === 'ALL') {
      responseImages = [
        ...ImageData.MAKEUP.filter((i) => i.isFavorite),
        ...ImageData.SKINCARE.filter((i) => i.isFavorite),
        ...ImageData.HAIR.filter((i) => i.isFavorite)
      ]
    } else if (tagType === 'MAKEUP') {
      responseImages = ImageData.MAKEUP.filter((i) => i.isFavorite)
    } else if (tagType === 'SKINCARE') {
      responseImages = ImageData.SKINCARE.filter((i) => i.isFavorite)
    } else if (tagType === 'HAIR') {
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
    const preset_1 = createVariationItem(111, 100)
    const preset_2 = createVariationItem(112, 100)
    const preset_3 = createVariationItem(113, 100)
    const responseVariations: Variation[] = [preset_1, preset_2, preset_3]

    return HttpResponse.json(
      {
        code: 0,
        message: null,
        content: {
          variations: responseVariations,
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
    const url = new URL(request.url)
    const mainImageId = url.searchParams.get('mainImageId')
    const requestCount = url.searchParams.get('requestCount')

    if (imageProgressMap.size >= 3) {
      return sendJsonResponse(5010, 'Too many requests', null, 409)
    }

    if (!mainImageId || !requestCount) {
      return sendJsonResponse(0, 'Invalid request parameter', null, 409)
    }

    const responseImages = Array.from({ length: Number(requestCount) }).map(
      () => {
        return {
          // 동일한 id 값 사용하는 점 주의
          variationId: Date.now(),
          isAiGenerated: true,
          images: [],
          progress: 10
        }
      }
    )

    return sendJsonResponse(
      0,
      null,
      {
        variations: responseImages,
        restriction: { current: ++current, max: 100 }
      },
      200
    )
  }),
  http.get(`${URL_AI_IMAGE_GENERATE_PROGRESS}`, ({ request }) => {
    const url = new URL(request.url)
    const variationImageId = url.searchParams.get('variationImageId')

    if (!variationImageId) {
      return sendJsonResponse(0, 'no variation Image Id', null, 400)
    }

    if (!imageProgressMap.has(variationImageId)) {
      imageProgressMap.set(variationImageId, {
        startTime: Date.now(),
        finalProgressSent: false
      })
    }

    const imageState = imageProgressMap.get(variationImageId)
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
      imageProgressMap.delete(variationImageId)
      const responseVariation = createVariationItem(
        Number(variationImageId),
        100
      )
      return sendJsonResponse(0, null, { variation: responseVariation }, 200, {
        'Cache-Control': 'no-store'
      })
    }

    if (elapsedTime < 10) {
      const responseVariation = createVariationItem(
        Number(variationImageId),
        75
      )
      return sendJsonResponse(0, null, { variation: responseVariation }, 200, {
        'Cache-Control': 'no-store'
      })
    }
  })
]

function createVariationImage(properties: { ratio: string; angle: string }) {
  let size = {
    width: 1080,
    height: 1920
  }

  if (properties.ratio === 'ASPECT_RATIO_1_1') {
    size = {
      width: 1080,
      height: 1080
    }
  }

  return {
    ratio: properties.ratio as AspectRatio,
    angle: properties.angle as FaceAngle,
    encryptedImageUrl: faker.image.urlLoremFlickr(size)
  }
}

// Helper function to create response images
function createResponseImages(): VariationImage[] {
  const variation_1 = createVariationImage({
    ratio: 'ASPECT_RATIO_9_16',
    angle: 'FRONT'
  })
  const variation_2 = createVariationImage({
    ratio: 'ASPECT_RATIO_9_16',
    angle: 'LEFT'
  })
  const variation_3 = createVariationImage({
    ratio: 'ASPECT_RATIO_9_16',
    angle: 'RIGHT'
  })
  const variation_4 = createVariationImage({
    ratio: 'ASPECT_RATIO_1_1',
    angle: 'FRONT'
  })
  const variation_5 = createVariationImage({
    ratio: 'ASPECT_RATIO_1_1',
    angle: 'LEFT'
  })
  const variation_6 = createVariationImage({
    ratio: 'ASPECT_RATIO_1_1',
    angle: 'RIGHT'
  })

  return [
    variation_1,
    variation_2,
    variation_3,
    variation_4,
    variation_5,
    variation_6
  ]
}

function createVariationItem(id: number, progress: number): Variation {
  return {
    variationId: id,
    isAiGenerated: true,
    images: createResponseImages(),
    progress
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
