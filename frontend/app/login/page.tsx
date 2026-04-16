import React, { useState, ChangeEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation'
import { loginAction } from "@/actions/auth";
import Input from "@/components/Form/Input";

const LoginForm: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [globalError, setGlobalError] = useState<string>("");
    const [isPending, startTransition] = useTransition();

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

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const pass = e.target.value;
        setPassword(pass);

        if (!pass) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setGlobalError("");
        
        // Use React transition to handle pending state for server actions cleanly
        startTransition(async () => {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            
            const result = await loginAction({}, formData);
            
            if (result?.error) {
                setGlobalError(result.error);
            } else if (result?.success) {
                router.push('/admin/assessment/create');
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        {globalError && (
                            <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
                                {globalError}
                            </div>
                        )}
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
                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:opacity-50"
                            >
                                {isPending ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
