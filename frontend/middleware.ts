import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Exclude the login page (and other pages as needed) from the middleware
    // const path = request.nextUrl.pathname;
    // console.log("Path: ", path)
    // if (path === '/login') {
    //     return NextResponse.next();
    // }
    //
    // // Check for the token cookie
    // const tokenCookie = request.cookies.get('token');
    // console.log("Token Cookie:", tokenCookie);
    //
    // if (!tokenCookie) {
    //     // If the token is not present, redirect to the login page
    //     console.log("Redirecting to login page");
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    //
    // // If the token exists, proceed normally
    return NextResponse.next();
}
