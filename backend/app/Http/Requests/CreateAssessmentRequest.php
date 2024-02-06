<?php

namespace App\Http\Requests;

use App\Services\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Contracts\Validation\Validator;
class CreateAssessmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create_assessment');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'assessment.title' => 'required|string|max:255',
            'assessment.description' => 'required|string',
            'sections' => 'required|array',
            'sections.*.id' => 'exists:sections,id',
            'sections.*.questions' => 'required|array',
            'sections.*.questions.*.question_text' => 'required|string',
            'sections.*.questions.*.options' => 'required|array',
            'sections.*.questions.*.options.*.option' => 'required|string',
            'sections.*.questions.*.options.*.is_correct' => 'required|boolean',
            'sections.*.questions.*.type' => 'required|in:MCQ,MSQ',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ApiResponse::validationError($validator->errors())
        );
    }
}
