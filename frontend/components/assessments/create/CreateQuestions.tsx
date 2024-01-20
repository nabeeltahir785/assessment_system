import React, { useState } from 'react';
import Input from "@/components/Form/Input";

interface Option {
    option: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    name: string;
    type: 'MCQ' | 'MSQ';
    options: Option[];
    answer?: string | string[];
}

interface QuestionsComponentProps {
    addQuestion: (question: Question) => void;
}

const CreateQuestions: React.FC<QuestionsComponentProps> = ({ addQuestion }) => {
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<'MCQ' | 'MSQ'>('MCQ');
    const [options, setOptions] = useState<Option[]>([
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
    ]);

    const handleAddQuestion = () => {
        if (options.some(opt => opt.option === '')) {
            alert('Please fill in all options.');
            return;
        }

        const newQuestion: Question = {
            id: Date.now(), // Unique ID, consider a more robust approach for production
            name: questionText,
            type: questionType,
            options: options
        };

        addQuestion(newQuestion);
        setQuestionText('');
        setQuestionType('MCQ');
        setOptions([
            { option: '', isCorrect: false },
            { option: '', isCorrect: false },
            { option: '', isCorrect: false },
            { option: '', isCorrect: false }
        ]);
    };


    const updateOption = (index: number, updatedOption: Option) => {
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
            return { ...option, isCorrect: i === index };
        });
        setOptions(newOptions);
    };


    return (
        <div>
            <Input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} placeholder="Question Text"/>
            <select className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={questionType} onChange={(e) => setQuestionType(e.target.value as 'MCQ' | 'MSQ')}>
                <option value="MCQ">MCQ</option>
                <option value="MSQ">MSQ</option>
            </select>
            {options.map((option, index) => (
                <div key={index} className="my-2">
                    <Input  type="text"
                            value={option.option}
                            onChange={(e) => updateOption(index, { ...option, option: e.target.value })}
                            placeholder="Option Text"/>

                    {questionType === 'MCQ' ? (
                        <input
                            type="radio"
                            name="mcqOption"
                            checked={option.isCorrect}
                            onChange={() => handleOptionSelectionForMCQ(index)}
                        />
                    ) : (
                        <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => updateOption(index, { ...option, isCorrect: e.target.checked })}
                        />
                    )}
                </div>
            ))}
            <button className="my-4 bg-rose text-white px-4 py-2 rounded hover:bg-[#ff2850] hover:shadow-lg transition duration-300"
                onClick={handleAddQuestion}>Add Question</button>
        </div>
    );
};

export default CreateQuestions;
