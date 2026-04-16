<?php

namespace App\Contracts;

use Illuminate\Http\JsonResponse;

interface ApiResponseInterface
{
    public function success(mixed $data = null, string $message = 'Success', int $code = 200): JsonResponse;

    public function created(mixed $data = null, string $message = 'Created successfully', int $code = 201): JsonResponse;

    public function error(string $message = 'An error occurred', array $errors = [], int $code = 400): JsonResponse;

    public function unauthorized(string $message = 'Unauthorized access'): JsonResponse;

    public function forbidden(string $message = 'Insufficient permissions'): JsonResponse;

    public function validationError(mixed $errors = [], string $message = 'Validation errors'): JsonResponse;

    public function deleted(string $message = 'Resource deleted successfully'): JsonResponse;

    public function notFound(string $message = 'Resource not found'): JsonResponse;
}
