// import { URL_EXPLORE_SEARCH } from '@/views/explore/api/constants'
// import { http, HttpResponse } from 'msw'
// import { faker } from '@faker-js/faker'

// export interface Image {
//   id: number
//   name: string
//   description: string
//   path: string
// }

// const ImageData = {
//   MAKEUP: [
//     {
//       id: 10,
//       name: 'jisoo',
//       description: '지수의 메인 이미지',
//       path: faker.image.urlLoremFlickr()
//     },
//     {
//       id: 11,
//       name: 'jisoo',
//       description: '지수의 메인 이미지',
//       path: faker.image.urlLoremFlickr()
//     },
//     {
//       id: 12,
//       name: 'jisoo',
//       description: '지수의 메인 이미지',
//       path: faker.image.urlLoremFlickr()
//     }
//   ],
//   SKINCARE: [
//     {
//       id: 13,
//       name: 'jisoo',
//       description: '지수의 메인 이미지',
//       path: faker.image.urlLoremFlickr()
//     },
//     {
//       id: 14,
//       name: 'jisoo',
//       description: '지수의 메인 이미지',
//       path: faker.image.urlLoremFlickr()
//     }
//   ],
//   HAIR: [
//     {
//       id: 15,
//       name: 'jisoo',
//       description: '지수의 메인 이미지',
//       path: faker.image.urlLoremFlickr()
//     }
//   ]
// }

export const handlers = [
  //   http.get(`${URL_EXPLORE_SEARCH}`, ({ request }) => {
  //     const url = new URL(request.url)
  //     const tagType = url.searchParams.get('tagType')
  //     if (!tagType) {
  //       return HttpResponse.json(
  //         {
  //           code: 0,
  //           message: 'string',
  //           content: {
  //             images: [],
  //             hasNext: false,
  //             scrollKey: '0'
  //           }
  //         },
  //         { status: 200 }
  //       )
  //     }
  //     let responseImages: Image[] = []
  //     if (tagType === 'FEATURED') {
  //       responseImages = [
  //         ...ImageData.MAKEUP,
  //         ...ImageData.SKINCARE,
  //         ...ImageData.HAIR
  //       ]
  //     } else if (tagType === 'MAKEUP') {
  //       responseImages = ImageData.MAKEUP
  //     } else if (tagType === 'SKINCARE') {
  //       responseImages = ImageData.SKINCARE
  //     } else if (tagType === 'HAIR') {
  //       responseImages = ImageData.HAIR
  //     }
  //     return HttpResponse.json(
  //       {
  //         code: 0,
  //         message: 'string',
  //         content: {
  //           images: responseImages,
  //           hasNext: true,
  //           scrollKey: '10'
  //         }
  //       },
  //       { status: 200 }
  //     )
  //   })
]
