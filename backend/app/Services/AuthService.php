<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;

class AuthService
{
    /**
     * Create a personal access token for the authenticated user.
     *
     * @return array{token: string, expiresIn: int}
     */
    public function createApiToken(User $user): array
    {
        $tokenResult = $user->createToken('API Access');

        $expiresAt = $tokenResult->token->expires_at;
        $expiresIn = $expiresAt ? $expiresAt->diffInSeconds(Carbon::now()) : 0;

        return [
            'token'     => $tokenResult->accessToken,
            'expiresIn' => $expiresIn,
        ];
    }
}
