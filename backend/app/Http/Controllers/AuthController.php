<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Carbon\Carbon;
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

        return $this->successResponse($tokenDetails);
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

    private function successResponse(array $tokenDetails)
    {

        return response()->json(['token_type' => 'Bearer','access_token'=>$tokenDetails['token'],'expires_in'=>$tokenDetails['expiresIn']]);
    }


    private function invalidCredentialsResponse()
    {
        return response()->json([
            'error' => 'invalid_credentials',
            'message' => 'The user credentials were incorrect.'
        ], 401);
    }
}
