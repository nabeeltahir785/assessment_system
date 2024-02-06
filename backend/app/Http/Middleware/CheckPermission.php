<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use ApiResponse;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $permission
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle($request, Closure $next)
    {
        if ($request->route()->getPrefix() === 'api/admin' && Auth::user()->hasPermission('create_assessment') ) {
            return $next($request);
        }

        if ($request->route()->getPrefix() === 'api/student' && Auth::user()->hasPermission('attempt_assessment')) {
            return $next($request);
        }

        return ApiResponse::forbidden();
    }
}
