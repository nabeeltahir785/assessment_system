<?php

namespace App\Contracts;

interface ApiResponseInterface
{
    public function success($data = null, $message = "success", int $code = 200);

    public function created($data = null, $message = "success", int $code = 201);

    public function error($message = "An error occurred", array $errors = [], int $code = 400);

    public function loginSuccess($user, $token, $message = "Login successful");

    public function unauthorized($message = "Unauthorized access");

    public function forbidden($message = "Insufficient permissions");

    public function validationError(array $errors, $message = "Validation errors");

    public function deleted($message = "Resource deleted successfully.", int $code = 204);
}
