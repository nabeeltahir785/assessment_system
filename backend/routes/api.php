<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Public routes (no auth required)
|
*/

Route::post('/login', [AuthController::class, 'login'])->name('login');

/*
|--------------------------------------------------------------------------
| Admin Routes — requires 'create_assessment' permission
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:api', 'checkPermission:create_assessment'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {
        Route::post('/user', [UserController::class, 'currentUser'])->name('user.current');
        Route::resource('/section', SectionController::class);
        Route::post('/assessment', [AssessmentController::class, 'createAssessmentWithSectionsAndQuestions'])->name('assessment.store');
        Route::get('/assessments/attempt-counts', [AssessmentController::class, 'getAllAssessmentAttemptCounts'])->name('assessment.attempt-counts');
    });

/*
|--------------------------------------------------------------------------
| Student Routes — requires 'attempt_assessment' permission
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:api', 'checkPermission:attempt_assessment'])
    ->prefix('student')
    ->as('student.')
    ->group(function () {
        Route::get('/assessments', [StudentController::class, 'getAllAssessments'])->name('assessments.index');
        Route::get('/assessments/{id}', [StudentController::class, 'findAssessment'])->name('assessments.show');
    });
