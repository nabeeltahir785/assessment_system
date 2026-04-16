<?php

namespace Tests\Unit;

use App\Models\Attempt;
use App\Models\Assessment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttemptObserverTest extends TestCase
{
    use RefreshDatabase;

    public function test_attempt_creation_increments_assessment_attempt_count()
    {
        // 1. Arrange
        $user = User::factory()->create();
        $assessment = Assessment::factory()->create(['attempt_count' => 0]);

        $this->assertEquals(0, $assessment->attempt_count);

        // 2. Act — creating the Attempt should fire the Observer
        $attempt = Attempt::factory()->create([
            'user_id' => $user->id,
            'assessment_id' => $assessment->id,
        ]);

        // 3. Assert — refresh from DB to see the increment
        $assessment->refresh();
        $this->assertEquals(1, $assessment->attempt_count);

        // 4. Act — deleting the attempt should decrement
        $attempt->delete();
        
        $assessment->refresh();
        $this->assertEquals(0, $assessment->attempt_count);
    }
}
