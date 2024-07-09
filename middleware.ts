import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/'])

export default clerkMiddleware((auth, req) => {
  // 인증되지 않은 사용자를 로그인 경로로 자동 리디렉션
  if (isProtectedRoute(req)) auth().protect()

  return NextResponse.next()
})

// matcher 에 설정된 URL 과 일치하면 미들웨어 함수를 호출한다.
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
