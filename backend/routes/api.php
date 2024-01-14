<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\AssessmentController;
Route::post('/login', [AuthController::class, 'login'])->name("login");


Route::middleware('auth:api')->group(function() {
   Route::post('/user',[UserController::class,'currentUser'])->name("info");
   Route::resource('/section',SectionController::class);
   Route::post('/assessment',[AssessmentController::class,'createAssessmentWithSectionsAndQuestions']);
    Route::get('/assessments/{id}/attempts',[AssessmentController::class,'getStudentAttemptCount']);
    Route::get('/assessments/attempt-counts',[AssessmentController::class,'getAllAssessmentAttemptCounts']);
});
