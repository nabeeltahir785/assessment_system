import React, {useEffect, useState} from 'react';
interface Section {
    id: number;
    selectedValue?: number;
    name?: string;
    questions: Question[];
}
interface Question {
    id: number;
    name: string;
    type: 'MCQ' | 'MSQ';
    options: Option[];
    answer?: string | string[];
}
interface Option {
    option: string;
    isCorrect: boolean;
}
interface SectionFormProps {
    dropdownOptions: DropdownOption[];
    currentSectionId: number | null;
    onSectionChange: (newSectionId: number | null) => void;
}
interface DropdownOption {
    id: number;
    label: string;
}


const SectionForm: React.FC<SectionFormProps> = ({ dropdownOptions, currentSectionId, onSectionChange }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(currentSectionId);

    useEffect(() => {
        setSelectedOption(currentSectionId);
    }, [currentSectionId]);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const newSelection = Number(value);

        if (newSelection === 0) {
            // Treat id: 0 as null
            setSelectedOption(null);
            onSectionChange(null);
        } else {
            setSelectedOption(newSelection);
            onSectionChange(newSelection);
        }
    };


    return (
        <div>
            <select value={selectedOption === null ? '' : selectedOption} onChange={handleDropdownChange}>
                {dropdownOptions.map(section => (
                    <option key={section.id} value={section.id}>{section.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SectionForm;