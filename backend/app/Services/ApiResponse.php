<?php

namespace App\Services;

use App\Contracts\ApiResponseInterface;
use Illuminate\Http\JsonResponse;

class ApiResponse implements ApiResponseInterface
{


    private function successResponse(string $message, mixed $data, int $code): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data,
        ], $code);
    }

    private function errorResponse(string $message, mixed $errors, int $code): JsonResponse
    {
        $payload = [
            'status'  => 'error',
            'message' => $message,
        ];

        if (!empty($errors)) {
            $payload['errors'] = $errors;
        }

        return response()->json($payload, $code);
    }



    public function success(mixed $data = null, string $message = 'Success', int $code = 200): JsonResponse
    {
        return $this->successResponse($message, $data, $code);
    }

    public function created(mixed $data = null, string $message = 'Created successfully', int $code = 201): JsonResponse
    {
        return $this->successResponse($message, $data, $code);
    }

    public function error(string $message = 'An error occurred', array $errors = [], int $code = 400): JsonResponse
    {
        return $this->errorResponse($message, $errors, $code);
    }

    public function unauthorized(string $message = 'Unauthorized access'): JsonResponse
    {
        return $this->errorResponse($message, [], 401);
    }

    public function forbidden(string $message = 'Insufficient permissions'): JsonResponse
    {
        return $this->errorResponse($message, [], 403);
    }

    public function validationError(mixed $errors = [], string $message = 'Validation errors'): JsonResponse
    {
        return $this->errorResponse($message, $errors, 422);
    }

    public function deleted(string $message = 'Resource deleted successfully'): JsonResponse
    {
        return $this->successResponse($message, null, 200);
    }

    public function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return $this->errorResponse($message, [], 404);
    }



    public function loginSuccess(mixed $user, string $token, string $message = 'Login successful'): JsonResponse
    {
        return $this->successResponse($message, [
            'user'  => $user,
            'token' => $token,
        ], 200);
    }
}
