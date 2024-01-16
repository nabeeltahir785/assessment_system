import React, { ChangeEvent } from 'react';
import {InputFieldPropsType} from "@/types/InputFieldType";



const Input: React.FC<InputFieldPropsType> = ({ type, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default Input;
