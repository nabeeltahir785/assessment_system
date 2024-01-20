"use client"
import React from 'react';
import { AssessmentProvider } from '@/context/AssessmentContext';
import AssessmentForm from "@/components/assessments/create/AssessmentForm";

const Assessment: React.FC = () => {
    return (
        <AssessmentProvider>
            <AssessmentForm/>
        </AssessmentProvider>
    );
};

export default Assessment;