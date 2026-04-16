<?php

namespace App\Services;

use App\Contracts\Repositories\AssessmentRepositoryInterface;
use App\DTOs\CreateAssessmentData;
use App\Models\Assessment;
use Illuminate\Database\Eloquent\Collection;

class AssessmentService
{
    public function __construct(
        private readonly AssessmentRepositoryInterface $assessmentRepository
    ) {}

    /**
     * Create an assessment with sections and questions (transactional).
     */
    public function createWithSectionsAndQuestions(CreateAssessmentData $dto): Assessment
    {
        return $this->assessmentRepository->createWithSectionsAndQuestions($dto);
    }

    /**
     * Retrieve all assessments (for student listing).
     */
    public function getAllAssessments(): Collection
    {
        return $this->assessmentRepository->getAll();
    }

    /**
     * Retrieve a single assessment with full section/question tree.
     */
    public function findWithDetails(int $id): ?Assessment
    {
        return $this->assessmentRepository->findWithSectionsAndQuestions($id);
    }

    /**
     * Retrieve all assessments with their attempt counts.
     */
    public function getAllAttemptCounts(): Collection
    {
        return $this->assessmentRepository->getAllWithAttemptCounts();
    }
}
