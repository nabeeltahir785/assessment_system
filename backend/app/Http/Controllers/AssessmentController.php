<?php

namespace App\Http\Controllers;

use App\DTOs\CreateAssessmentData;
use App\Http\Requests\CreateAssessmentRequest;
use App\Services\AssessmentService;
use Illuminate\Http\JsonResponse;
use ApiResponse;

class AssessmentController extends Controller
{
    public function __construct(
        private readonly AssessmentService $assessmentService
    ) {}

    /**
     * Create a new assessment with associated sections and questions.
     */
    public function createAssessmentWithSectionsAndQuestions(CreateAssessmentRequest $request): JsonResponse
    {
        try {
            $dto = CreateAssessmentData::fromRequest($request->validated());
            $assessment = $this->assessmentService->createWithSectionsAndQuestions($dto);

            return ApiResponse::created($assessment, 'Assessment created successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Failed to create assessment', [], 500);
        }
    }

    /**
     * Retrieve all assessments with their attempt counts.
     */
    public function getAllAssessmentAttemptCounts(): JsonResponse
    {
        $attemptCounts = $this->assessmentService->getAllAttemptCounts();

        return ApiResponse::success($attemptCounts);
    }
}
