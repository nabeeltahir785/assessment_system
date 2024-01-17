"use client"
import React from 'react';
import { AssessmentProvider } from '@/context/AssessmentContext';
import Sections from './Sections';

const Assessment: React.FC = () => {
    return (
        <AssessmentProvider>
            <Sections />
        </AssessmentProvider>
    );
};

export default Assessment;