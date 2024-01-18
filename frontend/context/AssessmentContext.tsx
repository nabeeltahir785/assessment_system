"use client"
import React, { createContext, useReducer, ReactNode, Dispatch  } from 'react';
//TODO: Export these interfaces to their respective directories
export interface Option {
    option: string;
    is_correct: boolean;
}

export interface Question {
    id: number;
    name: string;
    type: 'MCQ' | 'MSQ';
    options: Option[];
    answer?: string | string[];

}

export interface Section {
    id: number;
    name?: string;
    questions: Question[];
}

export interface AssessmentState {
    title : string;
    description?: string;
    sections: Section[];
}

type AssessmentContextProps = {
    state: AssessmentState;
    dispatch: Dispatch<AssessmentAction>;
};

const initialState: AssessmentState = {
    title: '',
    description: '',
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
                    "name":"Where are you",
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
                    "name":"Food Panda",
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
    | { type: 'UPDATE_ANSWER'; payload: { sectionId: number, questionId: number, answer: string | string[] } };
// TODO: Split context providers into separate files Organize and split the context providers into individual files with each file representing a specific context or intent.
export const AssessmentContext = createContext<AssessmentContextProps | undefined>(undefined);

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
        case 'UPDATE_ANSWER':
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
    const [state, dispatch] = useReducer(assessmentReducer, initialState);

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