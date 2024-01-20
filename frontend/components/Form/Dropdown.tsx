import React, { useState, useEffect } from 'react';
import {IDropdown} from "@/interfaces/IDropdown";

const Dropdown: React.FC<IDropdown> = ({ dropdownOptions, currentSectionId, onSectionChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        const selected = dropdownOptions.find(option => option.id === selectedId);
        if (selected) {
            onSectionChange(selected);
        }
    };

    return (
        <select
            value={currentSectionId.id}
            onChange={handleChange}
            className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
            {dropdownOptions.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
