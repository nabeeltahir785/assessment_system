export interface IQuestion {
    question: string;
    options: Array<{ text: string; isCorrect: boolean }>;
    answer: string;
    type: string;
}