import { apiManager } from '../api-manager/apiManager';
import { IAssessment } from '@/interfaces/models/IAssessment';

/**
 * Service to handle Assessment API Calls
 */
export const createAssessment = async (assessment: IAssessment): Promise<any> => {
    // Note: The HTTP API Proxy wraps our request natively adding HttpOnly Contexts
    const url = `/api/admin/assessment`;

    // Map the internal frontend interface to strictly match the backend CreateAssessmentData DTO
    const payload = {
        assessment: {
            title: assessment.title,
            description: assessment.description,
        },
        sections: assessment.sections.map(section => ({
            id: section.id,
            questions: section.questions.map(question => ({
                question_text: question.name, // Explicit Backend mapping mapping our dynamic 'name' property
                type: question.type,
                options: question.options.map(opt => ({
                    option: opt.option,
                    is_correct: opt.is_correct
                }))
            }))
        }))
    };

    const { data } = await apiManager.request(url, payload, 'POST');
    return data;
};
