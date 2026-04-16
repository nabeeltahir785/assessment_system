import { IAssessment } from '@/interfaces/models/IAssessment';
import { QuestionType } from '@/enums/QuestionType';

export const AssessmentMockData: IAssessment = {
    title: '',
    description: '',
    sections: [
        {
            id: 1,
            questions: [
                {
                    id: 1,
                    name: 'What is your age',
                    type: QuestionType.MCQ,
                    options: [
                        { option: '20', is_correct: false },
                        { option: '22', is_correct: false },
                        { option: '23', is_correct: false },
                        { option: '24', is_correct: true },
                    ],
                },
                {
                    id: 2,
                    name: 'What is your name',
                    type: QuestionType.MSQ,
                    options: [
                        { option: '20', is_correct: true },
                        { option: '22', is_correct: true },
                        { option: '23', is_correct: false },
                        { option: '24', is_correct: true },
                    ],
                },
            ],
        },
        {
            id: 2,
            questions: [
                {
                    id: 3,
                    name: 'Where are you',
                    type: QuestionType.MCQ,
                    options: [
                        { option: '20', is_correct: false },
                        { option: '22', is_correct: false },
                        { option: '23', is_correct: false },
                        { option: '24', is_correct: true },
                    ],
                },
                {
                    id: 4,
                    name: 'Food Panda',
                    type: QuestionType.MSQ,
                    options: [
                        { option: '20', is_correct: true },
                        { option: '22', is_correct: true },
                        { option: '23', is_correct: false },
                        { option: '24', is_correct: true },
                    ],
                },
            ],
        },
    ],
};
