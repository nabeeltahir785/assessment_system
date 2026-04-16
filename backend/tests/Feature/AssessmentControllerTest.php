<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class AssessmentControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminUser = User::factory()->create();
        $role = Role::factory()->create(['name' => 'admin']);
        $permission = Permission::factory()->create(['name' => 'create_assessment']);
        
        $role->permissions()->attach($permission);
        $this->adminUser->roles()->attach($role);
    }

    public function test_requires_create_assessment_permission()
    {
        // User without roles
        $studentUser = User::factory()->create();
        Passport::actingAs($studentUser);

        $response = $this->postJson('/api/admin/assessment', []);

        $response->assertStatus(403)
                 ->assertJsonPath('status', 'error')
                 ->assertJsonPath('message', 'Insufficient permissions');
    }

    public function test_validates_complex_nested_payload()
    {
        Passport::actingAs($this->adminUser);

        // Missing sections and questions
        $response = $this->postJson('/api/admin/assessment', [
            'assessment' => ['title' => 'Title', 'description' => 'Desc']
        ]);

        $response->assertStatus(422)
                 ->assertJsonPath('status', 'error');
                 
        $this->assertArrayHasKey('sections', $response->json('errors'));
    }
    
    // Testing the success path would require creating sections in the DB to satisfy
    // the 'exists:sections,id' validation rule. 
}
