<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\AuthService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_auth_service_returns_correct_token_payload()
    {
        // Arrange
        $user = User::factory()->create();
        
        // Mock passport's personal access client prerequisite (or avoid checking DB limits by just testing format)
        // Since Passport requires running `artisan passport:install` which isn't available in standard unit mock, 
        // we'll mock the user's createToken method for a pure unit test

        $mockTokenResult = new class {
            public $accessToken = 'mocked-jwt-token';
            public $token;
            public function __construct() {
                $this->token = new class {
                    public $expires_at;
                    public function __construct() {
                        $this->expires_at = Carbon::now()->addDays(15);
                    }
                };
            }
        };

        $mockUser = \Mockery::mock(User::class)->makePartial();
        $mockUser->shouldReceive('createToken')
                 ->with('API Access')
                 ->once()
                 ->andReturn($mockTokenResult);

        $service = new AuthService();

        // Act
        $result = $service->createApiToken($mockUser);

        // Assert
        $this->assertIsArray($result);
        $this->assertArrayHasKey('token', $result);
        $this->assertArrayHasKey('expiresIn', $result);
        $this->assertEquals('mocked-jwt-token', $result['token']);
        $this->assertGreaterThan(0, $result['expiresIn']);
    }
}
