import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const { device } = userAgent(request)
  const isMobile = device.type === 'mobile'

  if (pathname === '/signup' || pathname === '/login') {
    return NextResponse.next()
  }

  if (!isMobile && pathname === '/') {
    const newUrl = new URL('/explore?tagType=ALL', request.url)
    return NextResponse.redirect(newUrl)
  }

  if (!isMobile && pathname === '/generate' && searchParams.has('state')) {
    const generatePageInfo = searchParams.get('state')!
    const modelInfo = generatePageInfo.split('-')
    const modelName = modelInfo[1]
    const modelId = modelInfo[3]

    const newUrl = new URL(`/generate/${modelName}?id=${modelId}`, request.url)

    searchParams.forEach((value, key) => {
      newUrl.searchParams.append(key, value)
    })

    return NextResponse.redirect(newUrl)
  }

  if (
    isMobile &&
    pathname.startsWith('/explore') &&
    searchParams.has('oAuthProviderType') &&
    searchParams.has('code')
  ) {
    const newUrl = new URL(`/mobile${pathname}`, request.url)

    // 기존 searchParams를 새 URL에 복사
    searchParams.forEach((value, key) => {
      newUrl.searchParams.append(key, value)
    })

    return NextResponse.redirect(newUrl)
  }

  if (isMobile && !pathname.startsWith('/mobile')) {
    return NextResponse.redirect(new URL(`/mobile${pathname}`, request.url))
  }

  if (!isMobile && pathname.startsWith('/mobile')) {
    const newPathname = pathname.replace('/mobile', '')
    return NextResponse.redirect(new URL(newPathname || '/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
