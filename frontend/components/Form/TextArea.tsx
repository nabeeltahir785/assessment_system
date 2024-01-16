import React, { useState, ChangeEvent } from 'react';
import {ITextAreaProps} from "@/interfaces/ITextArea";


const TextArea: React.FC<ITextAreaProps> = ({ placeholder, onChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};

export default TextArea;