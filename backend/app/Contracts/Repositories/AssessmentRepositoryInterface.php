<?php

namespace App\Contracts\Repositories;

use App\DTOs\CreateAssessmentData;
use App\Models\Assessment;
use Illuminate\Database\Eloquent\Collection;

interface AssessmentRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Create an assessment and attach sections with their questions.
     */
    public function createWithSectionsAndQuestions(CreateAssessmentData $dto): Assessment;

    /**
     * Retrieve an assessment with its sections and questions eagerly loaded.
     */
    public function findWithSectionsAndQuestions(int $id): ?Assessment;

    /**
     * Retrieve all assessments with attempt counts.
     */
    public function getAllWithAttemptCounts(): Collection;
}
