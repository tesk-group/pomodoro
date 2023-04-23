<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::prefix('/oauth/{service}')->group(function()
{
    Route::middleware(['auth:sanctum'])->get('/redirect', [App\Http\Controllers\OAuthController::class, 'redirect'])->name('oauth.redirect');
    Route::get('/callback', [App\Http\Controllers\OAuthController::class, 'callback'])->name('oauth.callback');
});