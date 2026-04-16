import { QuestionType } from '@/enums/QuestionType';
import { IOption } from './IOption';

export interface IQuestion {
    id: number;
    name: string;
    type: QuestionType | typeof QuestionType[keyof typeof QuestionType]; // Allows both Enum values and explicit string types
    options: IOption[];
    answer?: string | string[];
}
