<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;

class StoreSectionRequest extends BaseFormRequest
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
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
        ];
    }
}
