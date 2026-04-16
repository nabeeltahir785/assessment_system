import { IQuestion } from './IQuestion';

export interface ISection {
    id: number;
    name?: string;
    questions: IQuestion[];
}
