import React, { ChangeEvent } from 'react';
import {InputFieldProps} from "@/types/InputFieldType"

const Input: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder, error }) => {
    return (
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">{placeholder}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className={`text-red-500 text-sm mt-2`}>{error}</p>}
        </div>
    );
};

export default Input;