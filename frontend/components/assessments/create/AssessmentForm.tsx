"use client";
import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import DropdownOptions, {IDropdownOption} from "@/components/assessments/create/DropdownOptions";
import CreateQuestions from "@/components/assessments/create/CreateQuestions";
import AssessmentTable from "@/components/assessments/create/AssessmentTable";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/TextArea";
import Dropdown from "@/components/Form/Dropdown";
import { Button } from "@/components/Buttons";

import { IAssessment } from "@/interfaces/models/IAssessment";
import { ISection } from "@/interfaces/models/ISection";
import { IQuestion } from "@/interfaces/models/IQuestion";
import { createAssessment } from "@/services/apiServices/assessmentService";

const AssessmentForm: React.FC = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [globalError, setGlobalError] = useState<string>("");
    
    const [assessment, setAssessment] = useState<IAssessment>({
        title: '',
        description: '',
        sections: []
    });
    
    // Default to the first element in DropdownOptions
    const [currentSectionId, setCurrentSectionId] = useState<IDropdownOption>(DropdownOptions[0]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssessment({ ...assessment, title: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAssessment({ ...assessment, description: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGlobalError("");
        
        if (!assessment.title) {
            setGlobalError("Assessment title is required.");
            return;
        }
        
        startTransition(async () => {
             try {
                 await createAssessment(assessment);
                 // On success, redirect to assessments dashboard or reset form
                 setAssessment({ title: '', description: '', sections: [] });
                 router.push('/admin/assessment'); 
             } catch (error: unknown) {
                 setGlobalError((error as Error).message || "Failed to create assessment");
             }
        });
    };
    
    const handleSectionChange = (newSectionId: IDropdownOption) => {
        setCurrentSectionId(newSectionId);
    };

    const handleAddQuestion = (sectionId: number, newQuestion: IQuestion) => {
        setAssessment((prevAssessment: IAssessment) => {
            let sectionExists = false;

            const updatedSections: ISection[] = prevAssessment.sections.map((section: ISection) => {
                if (section.id === sectionId) {
                    sectionExists = true;
                    // Clone the section and append the new question to its questions array
                    return { ...section, questions: [...section.questions, newQuestion] };
                }
                return section;
            });

            if (!sectionExists) {
                const newSection: ISection = {
                    id: sectionId,
                    questions: [newQuestion]
                };
                return { ...prevAssessment, sections: [...prevAssessment.sections, newSection] };
            }

            return { ...prevAssessment, sections: updatedSections };
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {globalError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {globalError}
                </div>
            )}
            
            <Input type="text" value={assessment.title} onChange={handleTitleChange} placeholder="Assessment Title" />
            <Textarea value={assessment.description || ''} onChange={handleDescriptionChange} placeholder="Description"/>
            
            <div className="my-4">
                <Dropdown
                    dropdownOptions={DropdownOptions}
                    currentSectionId={currentSectionId}
                    onSectionChange={handleSectionChange}
                />
            </div>

            <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                isLoading={isPending}
                className="my-4"
            >
                Submit Assessment
            </Button>
            
            {currentSectionId && currentSectionId.id && (
                <div key={currentSectionId.id} className="mt-4 p-4 border rounded shadow-sm bg-white">
                    <h3 className="text-xl font-bold mb-3 border-b pb-2">Section: {currentSectionId.label}</h3>
                    {/* Bug fix: Access ID directly rather than treating an object as an array index */}
                    <CreateQuestions addQuestion={(question) => handleAddQuestion(currentSectionId.id, question)} />
                </div>
            )}

            <div className="mt-8">
                <AssessmentTable assessment={assessment}/>
            </div>
        </form>
    );
};

export default AssessmentForm;