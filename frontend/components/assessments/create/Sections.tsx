import React from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import Section from './Section';

const Sections: React.FC = () => {
    const { state } = useAssessment();

    return (
        <div>
            {state.sections.map(section => (
                <Section key={section.id} section={section} />
            ))}
        </div>
    );
};

export default Sections;