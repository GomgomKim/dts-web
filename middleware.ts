import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { device } = userAgent(request)
  const isMobile = device.type === 'mobile'

  if (pathname === '/signup') {
    return NextResponse.next()
  }

  // if(pathname.startsWith('explore') && searchParams.has('oAuthProviderType') && searchParams.has('code')){
  // }

  if (isMobile && !pathname.startsWith('/mobile')) {
    return NextResponse.redirect(new URL(`/mobile`, request.url))
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
