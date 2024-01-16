import React, { useState } from 'react';
import {DropdownTypeProps} from "@/types/DropdownType";

const Dropdown: React.FC<DropdownTypeProps> = ({ options, onSelect }) => {
    const [selected, setSelected] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected(value);
        onSelect(value);
    };

    return (
        <select value={selected} onChange={handleChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
