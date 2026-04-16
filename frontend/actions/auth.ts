'use server';

import { cookies } from 'next/headers';
import { apiManager } from '@/services/api-manager/apiManager';
import axios from 'axios';

/**
 * Server Action for handling authentication securely.
 * We fetch the token from the backend, and instead of passing it to
 * the client to put in localStorage, we wrap it in a secure HttpOnly cookie.
 */
export async function loginAction(prevState: unknown, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;
        
        // Native fetch inside Server Action is preferred in Next 15, but we can reuse API manager
        const { data } = await apiManager.request(url, { email, password }, "POST", process.env.NEXT_PUBLIC_API_BASE_URL);

        if (data && data.status === 'success' && data.data?.token) {
            const token = data.data.token;
            // The API returns expiresIn in seconds (from Laravel Passport)
            const expiresIn = data.data.expiresIn || 2592000; 
            
            // Set HttpOnly cookie using Next.js 15 standards.
            // Note: In Next 15, cookies() is awaited asynchronously.
            const cookieStore = await cookies();
            
            cookieStore.set({
                name: 'auth_token',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiresIn,
                path: '/',
            });

            return { success: true };
        } else {
             return { error: data?.message || 'Login failed' };
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data) {
             return { error: error.response.data.message || 'Invalid credentials' };
        }
        return { error: 'An unexpected error occurred. Please try again.' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    return { success: true };
}
