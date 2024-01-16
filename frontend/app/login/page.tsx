"use client";
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'
import {loginService} from "@/services/apiServices/loginService";
import Input from "@/components/Form/Input";
const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        };
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                placeholder="Email"
            />
            <Input
                type="password"
                value={password}
                onChange={handleChange(setPassword)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;
