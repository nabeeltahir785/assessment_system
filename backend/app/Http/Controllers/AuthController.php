<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use ApiResponse;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return ApiResponse::unauthorized('Invalid credentials');
        }

        $user = auth()->user();
        $tokenDetails = $this->authService->createApiToken($user);

        return ApiResponse::loginSuccess($user, $tokenDetails['token']);
    }
}
