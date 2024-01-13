<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
Route::post('/login', [AuthController::class, 'login'])->name("login");


Route::middleware('auth:api')->group(function() {
   Route::post('/user',[UserController::class,'currentUser'])->name("info");
});
