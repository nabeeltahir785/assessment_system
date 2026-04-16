<?php

namespace App\DTOs;

final readonly class CreateAssessmentData
{
    /**
     * @param string $title
     * @param string $description
     * @param array<int, array{id: int, questions: array<int, array{question_text: string, options: array, type: string}>}> $sections
     */
    public function __construct(
        public string $title,
        public string $description,
        public array  $sections,
    ) {}

    public static function fromRequest(array $validated): self
    {
        return new self(
            title:       $validated['assessment']['title'],
            description: $validated['assessment']['description'],
            sections:    $validated['sections'],
        );
    }
}
