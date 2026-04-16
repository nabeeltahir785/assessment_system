<?php

namespace App\Http\Requests;

use App\Enums\QuestionType;
use Illuminate\Support\Facades\Gate;

class CreateAssessmentRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('create_assessment');
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'assessment.title'                     => 'required|string|max:255',
            'assessment.description'               => 'required|string',
            'sections'                             => 'required|array|min:1',
            'sections.*.id'                        => 'required|exists:sections,id',
            'sections.*.questions'                 => 'required|array|min:1',
            'sections.*.questions.*.question_text' => 'required|string',
            'sections.*.questions.*.options'       => 'required|array|min:2',
            'sections.*.questions.*.options.*.option'     => 'required|string',
            'sections.*.questions.*.options.*.is_correct' => 'required|boolean',
            'sections.*.questions.*.type'          => 'required|in:' . QuestionType::valuesForValidation(),
        ];
    }
}
