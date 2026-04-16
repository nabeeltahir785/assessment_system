<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use ApiResponse;

class UserController extends Controller
{
    /**
     * Return the currently authenticated user.
     */
    public function currentUser(): JsonResponse
    {
        return ApiResponse::success(Auth::user(), 'User retrieved successfully.');
    }
}
