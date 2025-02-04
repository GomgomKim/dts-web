import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // 현재 브랜치 정보 가져오기
  //   const branch = process.env.VERCEL_GIT_COMMIT_REF

  //   // 브랜치별로 robots 설정
  //   if (branch === 'release') {
  //     return {
  //       rules: {
  //         userAgent: '*',
  //         allow: '/',
  //         disallow: ['/private/'] // TODO:
  //       }
  //       //   sitemap: 'https://production-domain.com/sitemap.xml' // TODO:  app/sitemap.ts 파일 작성
  //     }
  //   }

  // 그 외 브랜치 크롤링 차단
  return {
    rules: {
      userAgent: '*',
      disallow: '/'
    }
  }
}
