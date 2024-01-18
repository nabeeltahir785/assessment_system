import React from 'react';
import Input from "@/components/Form/Input";
import { useAssessment } from '@/context/AssessmentContext';
const AssessmentForm: React.FC = () => {
    const {state} = useAssessment()l
    return (
        <form>
            <Input
                type="text"
                value={state.email}
                onChange={handleEmailChange}
                placeholder="Assessment Title"
                error={emailError}
            />
            <textarea placeholder="Description"></textarea>
            <SectionDropdown />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AssessmentForm;
