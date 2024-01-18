"use client";
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'
import {loginService} from "@/services/apiServices/loginService";
import Input from "@/components/Form/Input";
const LoginForm: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const isValidEmail = (email: string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!newEmail) {
            setEmailError('Email is required');
        } else if (!isValidEmail(newEmail)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await loginService({ email, password });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            router.push('/admin/assessment/create');
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);

        if (!password) {
            setPasswordError('Password is required');
        }

    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
            <div className="mt-4">
                <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    error={emailError}
                />
                <div className="mt-4">
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        error={passwordError}
                    />
                </div>
                <div className="flex items-baseline justify-between">
                    <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    );
};

export default LoginForm;
