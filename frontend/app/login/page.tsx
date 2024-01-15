"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import {loginService} from "@/services/apiServices/loginService";
const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();
        const response = await loginService({ email, password });
        const token = response.data.token;

        if (token) {
            localStorage.setItem('token', token);
            router.push('/dashboard');
        } else {
            setErrorMessage('Login failed: No token received');
        }

        // try {
        //     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        //     const response = await fetch(`${baseUrl}/login`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email, password }),
        //     });
        //     if (!response.ok) {
        //         throw new Error('Login failed');
        //     }
        //
        //     const data = await response.json();
        //     const token = data.access_token;
        //
        //     if (token) {
        //         localStorage.setItem('token', token);
        //         router.push('/dashboard');
        //     } else {
        //         setErrorMessage('Login failed: No token received');
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;
