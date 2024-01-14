<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\StudentController;
Route::post('/login', [AuthController::class, 'login'])->name("login");


$middlewareLists = ['auth:api', 'checkPermission'];

Route::middleware($middlewareLists)->prefix('admin')->group(function () {
    Route::post('/user', [UserController::class, 'currentUser'])->name('admin.user.current');
    Route::resource('/section', SectionController::class);
    Route::post('/assessment', [AssessmentController::class, 'createAssessmentWithSectionsAndQuestions']);
    Route::get('/assessments/attempt-counts', [AssessmentController::class, 'getAllAssessmentAttemptCounts']);
});

Route::middleware($middlewareLists)->prefix('student')->group(function () {
    Route::get('/assessments', [StudentController::class, 'getAllAssessments']);
    Route::get('/assessments/{id}', [StudentController::class, 'findAssessment']);
});
