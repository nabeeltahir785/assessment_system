<?php

namespace Database\Factories;

use App\Enums\QuestionType;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'section_id' => Section::factory(),
            'question_text' => $this->faker->sentence(),
            'type' => QuestionType::MCQ,
            'options' => [
                ['option' => 'A', 'is_correct' => true],
                ['option' => 'B', 'is_correct' => false],
            ],
        ];
    }
}
