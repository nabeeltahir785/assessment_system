import React from 'react';
import { Question as QuestionType } from '@/context/AssessmentContext';

interface QuestionProps {
    question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
    return (
        <div>
            <h3>{question.name}</h3>
            {question.type === 'MCQ' ? (
                question.options.map((option, index) => (
                    <div key={index}>
                        <input type="radio" name={question.name} value={option.option} />
                        {option.option}
                    </div>
                ))
            ) : (
                question.options.map((option, index) => (
                    <div key={index}>
                        <input type="checkbox" name={question.name} value={option.option} />
                        {option.option}
                    </div>
                ))
            )}
        </div>
    );
};

export default Question;