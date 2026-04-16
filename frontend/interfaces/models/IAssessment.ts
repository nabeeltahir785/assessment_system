import { ISection } from './ISection';

export interface IAssessment {
    title: string;
    description?: string;
    sections: ISection[];
}
