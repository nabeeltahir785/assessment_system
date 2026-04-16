<?php

namespace App\Http\Controllers;

use App\Services\AssessmentService;
use Illuminate\Http\JsonResponse;
use ApiResponse;

class StudentController extends Controller
{
    public function __construct(
        private readonly AssessmentService $assessmentService
    ) {}

    /**
     * List all available assessments for students.
     */
    public function getAllAssessments(): JsonResponse
    {
        $assessments = $this->assessmentService->getAllAssessments();

        return ApiResponse::success($assessments, 'Assessments retrieved successfully.');
    }

    /**
     * Retrieve a single assessment with its sections and questions.
     */
    public function findAssessment(int $id): JsonResponse
    {
        $assessment = $this->assessmentService->findWithDetails($id);

        if (!$assessment) {
            return ApiResponse::notFound('Assessment not found');
        }

        return ApiResponse::success($assessment, 'Assessment retrieved successfully.');
    }
}
