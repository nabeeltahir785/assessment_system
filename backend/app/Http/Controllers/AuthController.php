<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Services\ApiResponse;
class AuthController extends Controller
{
    private $auth;

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$this->auth->attempt($credentials)) {
            return $this->invalidCredentialsResponse();
        }

        $user = $this->auth->user();
        $tokenDetails = $this->createApiToken($user);
//        $cookie = cookie('token', $tokenDetails['token'], 60);

//        return ApiResponse::loginSuccess($user, $tokenDetails['token'])->withCookie($cookie);
        return ApiResponse::loginSuccess($user, $tokenDetails['token']);

    }

    private function createApiToken($user)
    {
        $tokenResult = $user->createToken('API Access');
        $expirationSeconds = $tokenResult->token->expires_at->diffInSeconds(Carbon::now());

        return [
            'token' => $tokenResult->accessToken,
            'expiresIn' => $expirationSeconds,
        ];
    }



    private function invalidCredentialsResponse()
    {
        return ApiResponse::unauthorized("Invalid Credentials");
    }
}
