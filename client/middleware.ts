import  { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login'
  
  // Get the authentication token from cookies
  const token = request.cookies.get('auth')?.value || ''
  
  // Redirect to login if trying to access a protected route without auth
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Redirect to dashboard if trying to access login while already authenticated
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

// Add paths that should be checked by the middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ]
}
 