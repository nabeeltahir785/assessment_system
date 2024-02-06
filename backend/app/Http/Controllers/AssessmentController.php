<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssessmentRequest;
use App\Models\Assessment;
use App\Models\Question;
use Illuminate\Support\Facades\DB;
use ApiResponse;

class AssessmentController extends Controller
{
    /**
     * Create a new assessment with associated sections and questions.
     *
     * @param CreateAssessmentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createAssessmentWithSectionsAndQuestions(CreateAssessmentRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $this->createAssessment($request->validated());
            });
            return ApiResponse::created(null,'Assessment created successfully',201);
        } catch (\Exception $e) {
            return ApiResponse::error('Failed to create assessment',[],500);
        }
    }
    private function createAssessment(array $data)
    {
        $assessment = Assessment::create([
            'title' => $data['assessment']['title'],
            'description' => $data['assessment']['description'],
        ]);

        foreach ($data['sections'] as $sectionData) {
            $assessment->sections()->attach($sectionData['id']);
            foreach ($sectionData['questions'] as $questionData) {
                $this->createQuestionForSection($sectionData['id'], $questionData);
            }
        }
    }

    private function createQuestionForSection($sectionId, array $questionData)
    {
        Question::create([
            'section_id' => $sectionId,
            'question_text' => $questionData['question_text'],
            'options' => json_encode($questionData['options']),
            'type' => $questionData['type'],
        ]);
    }


    public function getStudentAttemptCount($id)
    {
        $assessment = Assessment::find($id);

        if (!$assessment) {
            return ApiResponse::error('Assessment not found',[],404);
        }

        $attemptCount = $assessment->attempt_count;
        return ApiResponse::success([
            'assessment_id' => $id,
            'attempt_count' => $attemptCount
        ]);

    }


    public function getAllAssessmentAttemptCounts()
    {
        $assessments = Assessment::all();

        $attemptCounts = [];

        foreach ($assessments as $assessment) {
            $attemptCounts[] = [
                'assessment_id' => $assessment->id,
                'attempt_count' => $assessment->attempt_count,
            ];
        }

        return ApiResponse::success($attemptCounts);
    }
}
