<?php

namespace Tests\Feature;

use App\Models\Assessment;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class StudentControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $studentUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->studentUser = User::factory()->create();
        $role = Role::factory()->create(['name' => 'student']);
        $permission = Permission::factory()->create(['name' => 'attempt_assessment']);
        
        $role->permissions()->attach($permission);
        $this->studentUser->roles()->attach($role);
    }

    public function test_retrieves_all_assessments_successfully()
    {
        Assessment::factory()->count(3)->create();

        Passport::actingAs($this->studentUser);

        $response = $this->getJson('/api/student/assessments');

        $response->assertStatus(200)
                 ->assertJsonPath('status', 'success')
                 ->assertJsonCount(3, 'data');
    }

    public function test_cannot_access_without_permission()
    {
        $unauthorizedUser = User::factory()->create();
        Passport::actingAs($unauthorizedUser);

        $response = $this->getJson('/api/student/assessments');

        $response->assertStatus(403);
    }
    
    public function test_find_assessment_returns_404_if_missing()
    {
        Passport::actingAs($this->studentUser);

        $response = $this->getJson('/api/student/assessments/999');

        $response->assertStatus(404)
                 ->assertJsonPath('status', 'error')
                 ->assertJsonPath('message', 'Assessment not found');
    }
}
