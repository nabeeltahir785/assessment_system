import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("HELLOW")
    // return NextResponse.redirect(new URL('/login', request.url))
}