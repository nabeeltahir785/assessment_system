<?php

namespace Tests\Unit;

use App\Contracts\Repositories\AssessmentRepositoryInterface;
use App\DTOs\CreateAssessmentData;
use App\Models\Assessment;
use App\Services\AssessmentService;
use PHPUnit\Framework\TestCase;
use Mockery;

class AssessmentServiceTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_create_with_sections_and_questions_passes_dto_to_repository()
    {
        // 1. Arrange
        $dto = new CreateAssessmentData(
            title: 'Mock DB Test',
            description: 'Desc',
            sections: []
        );

        $mockAssessment = new Assessment(['title' => 'Mock DB Test']);

        // Mock the repository — asserting that the correct method is called with our DTO
        $repositoryMock = Mockery::mock(AssessmentRepositoryInterface::class);
        $repositoryMock->shouldReceive('createWithSectionsAndQuestions')
            ->once()
            ->with($dto)
            ->andReturn($mockAssessment);

        $service = new AssessmentService($repositoryMock);

        // 2. Act
        $result = $service->createWithSectionsAndQuestions($dto);

        // 3. Assert
        $this->assertEquals('Mock DB Test', $result->title);
    }
}
