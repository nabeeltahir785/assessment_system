<?php

namespace App\Enums;

enum QuestionType: string
{
    case MCQ = 'MCQ';
    case MSQ = 'MSQ';

    /**
     * Get all valid type values as a comma-separated string (for validation rules).
     */
    public static function valuesForValidation(): string
    {
        return implode(',', array_column(self::cases(), 'value'));
    }
}
