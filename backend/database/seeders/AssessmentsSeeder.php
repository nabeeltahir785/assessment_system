<?php

namespace Database\Seeders;

use App\Models\Assessment;
use App\Models\Question;
use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssessmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $assessment = Assessment::create([
            'title' => 'Sample Assessment',
            'description' => 'A sample assessment with multiple sections.',
        ]);

        $mathSection = Section::create([
            'assessment_id' => $assessment->id,
            'title' => 'Mathematics',
            'description' => 'Mathematics section with multiple choice questions.',
        ]);

        $englishSection = Section::create([
            'assessment_id' => $assessment->id,
            'title' => 'English',
            'description' => 'English section with multiple select questions.',
        ]);

        $mathQuestion = Question::create([
            'section_id' => $mathSection->id,
            'question_text' => 'What is 2 + 2?',
            'options' => json_encode([
                ['option' => '3', 'is_correct' => false],
                ['option' => '4', 'is_correct' => true],
                ['option' => '5', 'is_correct' => false],
                ['option' => '6', 'is_correct' => false],
            ]),
            'type' => 'MCQ',
        ]);

        $englishQuestion = Question::create([
            'section_id' => $englishSection->id,
            'question_text' => 'Select the synonyms of "Happy".',
            'options' => json_encode([
                ['option' => 'Sad', 'is_correct' => false],
                ['option' => 'Joyful', 'is_correct' => true],
                ['option' => 'Elated', 'is_correct' => true],
                ['option' => 'Angry', 'is_correct' => false],
            ]),
            'type' => 'MSQ',
        ]);
    }
}
