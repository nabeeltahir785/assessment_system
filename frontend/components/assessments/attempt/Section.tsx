import React from 'react';
import { Section as SectionType } from '@/context/AssessmentContext';
import Question from './Question';

interface SectionProps {
    section: SectionType;
}

const Section: React.FC<SectionProps> = ({ section }) => {
    return (
        <div>
            <h2>{section.name}</h2>
            {section.questions.map(question => (
                <Question key={question.id} question={question} />
            ))}
        </div>
    );
};

export default Section;