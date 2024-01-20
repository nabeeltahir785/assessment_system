import React, {useEffect, useState} from 'react';
import SectionForm from "@/components/assessments/create/SectionForm";
import DropdownOptions from "@/components/assessments/create/DropdownOptions";
import CreateQuestions from "@/components/assessments/create/CreateQuestions";
interface Option {
    option: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    name: string;
    type: 'MCQ' | 'MSQ';
    options: Option[];
    answer?: string | string[]; // Depending on question type
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



    const [currentSectionId, setCurrentSectionId] = useState<number | null>(DropdownOptions[0]?.id || null);


    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(()=>{
        console.log(assessment,"HERE ASSESSMENT",questions)
    },[assessment,questions])
    const addQuestion = (sectionId: number, question: Question) => {
        setAssessment(prevAssessment => {
            const updatedSections = prevAssessment.sections.map(section => {
                if (section.id === sectionId) {
                    return { ...section, questions: [...section.questions, question] };
                }
                return section;
            });

            return { ...prevAssessment, sections: updatedSections };
        });
    };


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
                // Create a new section with the new question
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


    // const handleAddQuestion = (sectionId, newQuestion) => {
    //     setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    //     setAssessment(prevAssessment => {
    //         const updatedSections = prevAssessment.sections.map(section => {
    //             if (section.id === sectionId) {
    //                 return { ...section, questions: [...section.questions, newQuestion] };
    //             }
    //             return section;
    //         });
    //
    //         return { ...prevAssessment, sections: updatedSections };
    //     });
    // };
    //
    // const handleAddQuestion = (newQuestion: Question) => {
    //     setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    // };



    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={assessment.title} onChange={handleTitleChange} placeholder="Assessment Title" />
            <textarea value={assessment.description} onChange={handleDescriptionChange} placeholder="Description" />
            <SectionForm
                dropdownOptions={DropdownOptions}
                currentSectionId={currentSectionId}
                onSectionChange={handleSectionChange}

            />
            {
                assessment.sections.map((section) => (
                    section.questions.map((question, index) => (
                        <div key={question.id}>
                            <div>Question {index + 1}: {question.name}</div>
                            <div>Type: {question.type}</div>
                            <ul>
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        Option: {option.option} {option.isCorrect ? "(Correct Answer)" : ""}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ))
            }
            {currentSectionId && (
                <div key={DropdownOptions[currentSectionId].id}>
                    <h3>Section: {DropdownOptions[currentSectionId].label}</h3>
                    <CreateQuestions addQuestion={(question) => handleAddQuestion(DropdownOptions[currentSectionId].id, question)} />
                </div>
            )}


            <button type="submit">Submit</button>
        </form>
    );
};

export default AssessmentForm;