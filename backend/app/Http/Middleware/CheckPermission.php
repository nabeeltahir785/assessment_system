<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use ApiResponse;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  string|null  $permission  The required permission name
     */
    public function handle(Request $request, Closure $next, ?string $permission = null): Response
    {
        $user = Auth::user();

        if (!$user) {
            return ApiResponse::unauthorized();
        }

        // If no specific permission is required, allow any authenticated user through
        if ($permission === null) {
            return $next($request);
        }

        if ($user->hasPermission($permission)) {
            return $next($request);
        }

        return ApiResponse::forbidden();
    }
}
