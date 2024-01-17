"use client"
import React, { createContext, useReducer, ReactNode } from 'react';

export interface Option {
    option: string;
    is_correct: boolean;
}

export interface Question {
    id: number;
    name: string;
    type: 'MCQ' | 'MSQ';
    options: Option[];
}

export interface Section {
    id: number;
    name?: string;
    questions: Question[];
}

export interface AssessmentState {
    sections: Section[];
}

const initialState: AssessmentState = {
    sections: [
        {
            "id":1,
            "questions":[
                {
                    "id":1,
                    "name":"What is your age",
                    "type":"MCQ",
                    "options":[
                        {
                            "option":"20",
                            "is_correct":false
                        },
                        {
                            "option":"22",
                            "is_correct":false
                        },
                        {
                            "option":"23",
                            "is_correct":false
                        },
                        {
                            "option":"24",
                            "is_correct":true
                        }
                    ]
                },
                {
                    "id":1,
                    "name":"What is your name",
                    "type":"MSQ",
                    "options":[
                        {
                            "option":"20",
                            "is_correct":true
                        },
                        {
                            "option":"22",
                            "is_correct":true
                        },
                        {
                            "option":"23",
                            "is_correct":false
                        },
                        {
                            "option":"24",
                            "is_correct":true
                        }
                    ]
                }
            ]
        },
        {
            "id":1,
            "questions":[
                {
                    "id":2,
                    "name":"What is your age",
                    "type":"MCQ",
                    "options":[
                        {
                            "option":"20",
                            "is_correct":false
                        },
                        {
                            "option":"22",
                            "is_correct":false
                        },
                        {
                            "option":"23",
                            "is_correct":false
                        },
                        {
                            "option":"24",
                            "is_correct":true
                        }
                    ]
                },
                {
                    "id":1,
                    "name":"What is your name",
                    "type":"MSQ",
                    "options":[
                        {
                            "option":"20",
                            "is_correct":true
                        },
                        {
                            "option":"22",
                            "is_correct":true
                        },
                        {
                            "option":"23",
                            "is_correct":false
                        },
                        {
                            "option":"24",
                            "is_correct":true
                        }
                    ]
                }
            ]
        }
    ],
};

type AssessmentAction =
    | { type: 'ADD_SECTION'; payload: Section }
    | { type: 'REMOVE_SECTION'; payload: { sectionId: number } }

const AssessmentContext = createContext<{
    state: AssessmentState;
    dispatch: React.Dispatch<AssessmentAction>;
}>({ state: initialState, dispatch: () => null });
const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
    switch (action.type) {
        case 'ADD_SECTION':
            return {
                ...state,
                sections: [...state.sections, action.payload],
            };
        case 'REMOVE_SECTION':
            return {
                ...state,
                sections: state.sections.filter(section => section.id !== action.payload.sectionId),
            };
        default:
            return state;
    }
};

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(assessmentReducer, initialState);

    return (
        <AssessmentContext.Provider value={{ state, dispatch }}>
            {children}
        </AssessmentContext.Provider>
    );
};

export const useAssessment = () => React.useContext(AssessmentContext);