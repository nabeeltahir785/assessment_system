"use client"
import React, { createContext, useReducer, ReactNode, Dispatch  } from 'react';

// Domain Models
import { IAssessment } from '@/interfaces/models/IAssessment';
import { ISection } from '@/interfaces/models/ISection';

// Constants & Enums
import { AssessmentMockData } from '@/constants/Mocks/AssessmentMock';
import { AssessmentActionType } from '@/constants/AssessmentActions';

type AssessmentContextProps = {
    state: IAssessment;
    dispatch: Dispatch<AssessmentAction>;
};

type AssessmentAction =
    | { type: typeof AssessmentActionType.ADD_SECTION; payload: ISection }
    | { type: typeof AssessmentActionType.REMOVE_SECTION; payload: { sectionId: number } }
    | { type: typeof AssessmentActionType.UPDATE_ANSWER; payload: { sectionId: number, questionId: number, answer: string | string[] } };

export const AssessmentContext = createContext<AssessmentContextProps | undefined>(undefined);

const assessmentReducer = (state: IAssessment, action: AssessmentAction): IAssessment => {
    switch (action.type) {
        case AssessmentActionType.ADD_SECTION:
            return {
                ...state,
                sections: [...state.sections, action.payload],
            };
        case AssessmentActionType.REMOVE_SECTION:
            return {
                ...state,
                sections: state.sections.filter(section => section.id !== action.payload.sectionId),
            };
        case AssessmentActionType.UPDATE_ANSWER:
            const updatedSections = state.sections.map(section => {
                if (section.id === action.payload.sectionId) {
                    return {
                        ...section,
                        questions: section.questions.map(question => {
                            if (question.id === action.payload.questionId) {
                                return {
                                    ...question,
                                    answer: action.payload.answer
                                };
                            }
                            return question;
                        })
                    };
                }
                return section;
            });

            return {
                ...state,
                sections: updatedSections
            };
        default:
            return state;
    }
};

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Utilize Mock for now, but gracefully swapped inside standard production contexts
    const [state, dispatch] = useReducer(assessmentReducer, AssessmentMockData);

    return (
        <AssessmentContext.Provider value={{ state, dispatch }}>
            {children}
        </AssessmentContext.Provider>
    );
};

export const useAssessment = () => {
    const context = React.useContext(AssessmentContext);
    if (context === undefined) {
        throw new Error('useAssessment must be used within an AssessmentProvider');
    }
    return context;
};