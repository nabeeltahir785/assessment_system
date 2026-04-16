import React, { useState } from 'react';
import Input from "@/components/Form/Input";
import { Button } from "@/components/Buttons";
import { IQuestion } from "@/interfaces/models/IQuestion";
import { IOption } from "@/interfaces/models/IOption";
import { QuestionType } from "@/enums/QuestionType";

interface QuestionsComponentProps {
    addQuestion: (question: IQuestion) => void;
}

const CreateQuestions: React.FC<QuestionsComponentProps> = ({ addQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MCQ);
    const [options, setOptions] = useState<IOption[]>([
        { option: '', is_correct: false },
        { option: '', is_correct: false },
        { option: '', is_correct: false },
        { option: '', is_correct: false }
    ]);

    const handleAddQuestion = () => {
        if (options.some(opt => opt.option === '')) {
            alert('Please fill in all options.');
            return;
        }

        const newQuestion: IQuestion = {
            id: Date.now(), // Unique ID naturally generated
            name: questionText,
            type: questionType,
            options: options
        };

        addQuestion(newQuestion);
        setQuestionText('');
        setQuestionType(QuestionType.MCQ);
        setOptions([
            { option: '', is_correct: false },
            { option: '', is_correct: false },
            { option: '', is_correct: false },
            { option: '', is_correct: false }
        ]);
    };

    const updateOption = (index: number, updatedOption: IOption) => {
        const newOptions = options.map((option, i) => {
            if (i === index) {
                return updatedOption;
            }
            return option;
        });
        setOptions(newOptions);
    };

    const handleOptionSelectionForMCQ = (index: number) => {
        const newOptions = options.map((option, i) => {
            return { ...option, is_correct: i === index };
        });
        setOptions(newOptions);
    };

    return (
        <div>
            <Input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Question Text"/>
            <select className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={questionType} onChange={(e) => setQuestionType(e.target.value as QuestionType)}>
                <option value={QuestionType.MCQ}>MCQ</option>
                <option value={QuestionType.MSQ}>MSQ</option>
            </select>
            
            {options.map((option, index) => (
                <div key={index} className="my-2">
                    <Input  type="text"
                            value={option.option}
                            onChange={(e) => updateOption(index, { ...option, option: e.target.value })}
                            placeholder="Option Text"/>

                    {questionType === QuestionType.MCQ ? (
                        <input
                            type="radio"
                            name="mcqOption"
                            checked={option.is_correct}
                            onChange={() => handleOptionSelectionForMCQ(index)}
                        />
                    ) : (
                        <input
                            type="checkbox"
                            checked={option.is_correct}
                            onChange={(e) => updateOption(index, { ...option, is_correct: e.target.checked })}
                        />
                    )}
                </div>
            ))}
            
            <div className="mt-4">
               <Button onClick={handleAddQuestion} variant="secondary" type="button">
                   Add Question
               </Button>
            </div>
        </div>
    );
};

export default CreateQuestions;
