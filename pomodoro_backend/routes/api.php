<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/users')->group(function() {
    Route::middleware('auth:sanctum')->get('/', [App\Http\Controllers\UserController::class, 'getUserData']);
    Route::post('/', [App\Http\Controllers\UserController::class, 'register']);
    Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
    Route::middleware('auth:sanctum')->get('/logout', [App\Http\Controllers\UserController::class, 'logout']);
});

Route::middleware(['auth:sanctum', App\Http\Middleware\FinishTimers::class])->prefix('/timers')->group(function() {
    Route::post('/', [App\Http\Controllers\TimerController::class, 'create']);
    Route::get('/', [App\Http\Controllers\TimerController::class, 'get']);
    Route::put('/interrupt', [App\Http\Controllers\TimerController::class, 'interrupt']);
    Route::put('/resume', [App\Http\Controllers\TimerController::class, 'resume']);
});

Route::middleware(['auth:sanctum'])->prefix('/tasks')->group(function() {
    Route::get('/', [App\Http\Controllers\TaskController::class, 'index']);
    Route::get('/{service}/sync', [App\Http\Controllers\TaskController::class, 'sync']);
});

Route::middleware(['auth:sanctum'])->prefix('/oauth/{service}')->group(function() {
    Route::get('/endpoint', [App\Http\Controllers\OAuthController::class, 'endpoint']);
});

Route::middleware(['auth:sanctum', App\Http\Middleware\FinishTimers::class])->prefix('/statistics')->group(function() {
    Route::get('/', [App\Http\Controllers\StatisticsController::class, 'get']);
    Route::get('/tasks/{task}', [App\Http\Controllers\StatisticsController::class, 'getForTask']);
});

Route::middleware(['auth:sanctum', App\Http\Middleware\FinishTimers::class])->prefix('/distractions')->group(function() {
    Route::get('/', [App\Http\Controllers\DistractionController::class, 'index']);
    Route::get('/tasks/{task}', [App\Http\Controllers\DistractionController::class, 'getForTask']);
});