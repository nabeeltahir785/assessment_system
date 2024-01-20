"use client";
import React, { useState} from 'react';
import DropdownOptions, {IDropdownOption} from "@/components/assessments/create/DropdownOptions";
import CreateQuestions from "@/components/assessments/create/CreateQuestions";
import AssessmentTable from "@/components/assessments/create/AssessmentTable";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/TextArea";
import Dropdown from "@/components/Form/Dropdown";
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

interface Section {
    id: number;
    name?: string;
    questions: Question[];
}

interface Assessment {
    title: string;
    description: string;
    sections: Section[];
}

const AssessmentForm: React.FC = () => {
    const [assessment, setAssessment] = useState<Assessment>({
        title: '',
        description: '',
        sections: []
    });
    const [currentSectionId, setCurrentSectionId] = useState<IDropdownOption>(DropdownOptions[0]);






    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssessment({ ...assessment, title: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAssessment({ ...assessment, description: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const handleSectionChange = (newSectionId) => {
        setCurrentSectionId(newSectionId);
    };

    const handleAddQuestion = (sectionId: number, newQuestion: Question) => {
        setAssessment((prevAssessment: Assessment) => {
            let sectionExists = false;

            const updatedSections: Section[] = prevAssessment.sections.map((section: Section) => {
                if (section.id === sectionId) {
                    sectionExists = true;
                    // Clone the section and append the new question to its questions array
                    const updatedSection = { ...section, questions: [...section.questions, newQuestion] };
                    return updatedSection;
                }
                return section;
            });

            if (!sectionExists) {
                const newSection: Section = {
                    id: sectionId,
                    questions: [newQuestion]
                };
                // Return the updated assessment with the new section appended
                return { ...prevAssessment, sections: [...prevAssessment.sections, newSection] };
            }

            // Return the updated assessment with the updated sections
            return { ...prevAssessment, sections: updatedSections };
        });
    };




    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" value={assessment.title} onChange={handleTitleChange} placeholder="Assessment Title" />
            <Textarea value={assessment.description} onChange={handleDescriptionChange}    placeholder="Description"/>
            <Dropdown
                dropdownOptions={DropdownOptions}
                currentSectionId={currentSectionId}
                onSectionChange={handleSectionChange}
            />


            <button
                className="my-4 bg-rose text-white px-4 py-2 rounded hover:bg-[#ff2850] hover:shadow-lg transition duration-300">Submit
            </button>
            {currentSectionId &&  (
                <div key={currentSectionId.id}>
                    <h3>Section: {currentSectionId.label}</h3>
                    <CreateQuestions addQuestion={(question) => handleAddQuestion(DropdownOptions[currentSectionId].id, question)} />
                </div>
            )}

            <AssessmentTable assessment={assessment}/>
        </form>
    );
};

export default AssessmentForm;