import React, {ChangeEvent, useState} from 'react';
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";

const AssessmentForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
        };
    const handleTextChange = (newValue: string) => {
        setDescription(newValue);
    };

    return (
        <>
            <Input
                type="text"
                value={title}
                onChange={handleChange(setTitle)}
                placeholder="Assessment Title"
            />
            <TextArea
                placeholder="Enter your text here"
                onChange={handleTextChange}
            />
        </>

    );
};

export default AssessmentForm;
