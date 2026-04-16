<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Mock passport execution or create passport client if required
        // Passport setup is tricky in memory DB. Let's just mock the Auth service 
        // to bypass Passport, so we can test the Controller layer.
        
        $this->mock(\App\Services\AuthService::class, function ($mock) {
            $mock->shouldReceive('createApiToken')
                 ->andReturn(['token' => 'fake-jwt', 'expiresIn' => 3600]);
        });
    }

    public function test_login_validation_fails_on_missing_email()
    {
        $response = $this->postJson('/api/login', [
            'password' => 'secret123'
        ]);

        $response->assertStatus(422)
                 ->assertJsonPath('status', 'error')
                 ->assertJsonPath('message', 'Validation errors')
                 ->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_login_fails_with_invalid_credentials()
    {
        $user = User::factory()->create(['password' => bcrypt('correct-password')]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'wrong-password'
        ]);

        $response->assertStatus(401)
                 ->assertJsonPath('status', 'error')
                 ->assertJsonPath('message', 'Invalid credentials');
    }

    public function test_login_succeeds_with_correct_credentials()
    {
        $user = User::factory()->create(['password' => bcrypt('correct-password')]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'correct-password'
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('status', 'success')
                 ->assertJsonPath('data.token', 'fake-jwt')
                 ->assertJsonPath('data.user.id', $user->id);
    }
}
