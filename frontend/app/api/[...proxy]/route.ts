import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function ANY(req: NextRequest, { params }: { params: { proxy: string[] } }) {
    const backendUrl = process.env.API_BASE_URL || 'http://localhost:8000/api';
    
    // Construct the target URL
    const path = params.proxy.join('/');
    const query = req.nextUrl.search;
    const targetUrl = `${backendUrl}/${path}${query}`;

    // Read the HttpOnly cookie safely inside the Next.js server context
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const headers: Record<string, string> = {
        'Content-Type': req.headers.get('content-type') || 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const bodyText = await req.text();
        const data = bodyText ? JSON.parse(bodyText) : undefined;

        const response = await axios({
            method: req.method,
            url: targetUrl,
            headers: headers,
            data: data,
            validateStatus: () => true // Allow us to proxy all statuses unchanged
        });

        return NextResponse.json(response.data, {
            status: response.status,
            headers: {
                // Ensure CORS or other NextJS headers propagate cleanly
                'Content-Type': 'application/json'
            }
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json(
            { error: 'Internal Server Proxy Error', message: errorMessage },
            { status: 500 }
        );
    }
}

// NextJS 15 requires explicitly defining methods if not using wildcard or requires specific handler exports natively.
// To be safe, we map standard verbs to our ANY handler.
export const GET = ANY;
export const POST = ANY;
export const PUT = ANY;
export const PATCH = ANY;
export const DELETE = ANY;
