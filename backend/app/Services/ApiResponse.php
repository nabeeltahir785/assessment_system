<?php
namespace App\Services;


use App\Contracts\ApiResponseInterface;
use Illuminate\Http\JsonResponse;



class ApiResponse implements ApiResponseInterface
{
    private function jsonResponse($message, $data, $code) : JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }
    public function success($data = null, $message = "success", $code = 200) : JsonResponse
    {
        return self::jsonResponse( $message, $data, $code);
    }

    public function created($data = null, $message = "success", $code = 201) : JsonResponse
    {
        return self::jsonResponse( $message, $data, $code);
    }
    public function error($message = "An error occurred", $errors = [], $code = 400) : JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    public function loginSuccess($user, $token, $message = "Login successful") : JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ], 200);
    }

    public function unauthorized($message = "Unauthorized access") : JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 401);
    }

    public function forbidden($message = "Insufficient permissions") : JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 403);
    }

    public function validationError($errors, $message = "Validation errors") : JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors
        ], 422);
    }

    public function deleted($message = "Resource deleted successfully.", $code = 204) : JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message
        ], $code);
    }

}
