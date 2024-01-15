<?php
namespace App\Services;

class ApiResponse
{
    private static function jsonResponse($message, $data, $code)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }
    public static function success($data = null, $message = "success", $code = 200)
    {
        return self::jsonResponse( $message, $data, $code);
    }

    public static function created($data = null, $message = "success", $code = 201)
    {
        return self::jsonResponse( $message, $data, $code);
    }
    public static function error($message = "An error occurred", $errors = [], $code = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    public static function loginSuccess($user, $token, $message = "Login successful")
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

    public static function unauthorized($message = "Unauthorized access")
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 401);
    }

    public static function forbidden($message = "Insufficient permissions")
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 403);
    }

    public static function validationError($errors, $message = "Validation errors")
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors
        ], 422);
    }

    public static function deleted($message = "Resource deleted successfully.", $code = 204)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message
        ], $code);
    }

}
