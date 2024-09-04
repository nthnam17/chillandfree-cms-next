import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import Cookies from 'js-cookie';

export function middleware(request: NextRequest) {
    //AUTHEN
    const userToken = request.cookies.get('accessToken');
    // console.log('======================')
    // console.log(userToken, 'userToken')
    // console.log(Cookies.get('accessToken'))
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login';
    if (isPublicPath && userToken) {
        // console.log("1")
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (!isPublicPath && !userToken) {
        // console.log("2")
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/news/:path*',
        '/services/:path*',
        '/general-setting/:path*',
        '/news/:path*',
        '/partner',
        '/recruitment',
        '/feedback',
        '/tektra-labeling',
        '/login',
    ],
};
