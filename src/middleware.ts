import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  
  const publicPaths = ['/', '/login', '/signup', '/courses', '/contact', '/verifyemail' , '/forgotpassword' , '/resetpassword' , 
    '/sendverificationemail'];
  const isPublicPath = publicPaths.includes(path);
  const token = request.cookies.get("token")?.value || null;

  if(path === '/' && token){
    return NextResponse.next();
  }
  if(path === '/verifyemail' && token){
    return NextResponse.next();
  }
  if(path === '/contact' || path === '/courses'){
    return NextResponse.next();
  }
  
  if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  return NextResponse.next();

}

export const config = {
  matcher: [
    "/",
    "/courses",
    "/contact",
    "/forgotpassword",
    "/login",
    "/logout",
    "/signup",
    "/profile",
    "/resetpassword",
    "/verifyemail",
    "/sendverificationemail"
  ]
}
