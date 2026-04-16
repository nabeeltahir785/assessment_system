<?php

namespace App\Repositories;

use App\Contracts\Repositories\AssessmentRepositoryInterface;
use App\DTOs\CreateAssessmentData;
use App\Models\Assessment;
use App\Models\Question;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AssessmentRepository implements AssessmentRepositoryInterface
{
    public function getAll(): Collection
    {
        return Assessment::all();
    }

    public function findOrFail(int $id): Model
    {
        return Assessment::findOrFail($id);
    }

    public function create(array $data): Model
    {
        return Assessment::create($data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    public function createWithSectionsAndQuestions(CreateAssessmentData $dto): Assessment
    {
        return DB::transaction(function () use ($dto) {
            $assessment = Assessment::create([
                'title'       => $dto->title,
                'description' => $dto->description,
            ]);

            foreach ($dto->sections as $sectionData) {
                $assessment->sections()->attach($sectionData['id']);

                foreach ($sectionData['questions'] as $questionData) {
                    Question::create([
                        'section_id'    => $sectionData['id'],
                        'question_text' => $questionData['question_text'],
                        'options'       => $questionData['options'],
                        'type'          => $questionData['type'],
                    ]);
                }
            }

            return $assessment;
        });
    }

    /**
     * Eagerly load sections and questions for a given assessment.
     */
    public function findWithSectionsAndQuestions(int $id): ?Assessment
    {
        return Assessment::with('sections.questions')->find($id);
    }

    /**
     * Retrieve all assessments selecting only id and attempt_count.
     */
    public function getAllWithAttemptCounts(): Collection
    {
        return Assessment::select(['id', 'title', 'attempt_count'])->get();
    }
}
