<?php

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\adminstration\EventController;
use App\Http\Controllers\Api\adminstration\SchoolController;
use App\Http\Controllers\Api\adminstration\auth\AuthController;
use App\Http\Controllers\Api\adminstration\AdminstrationController;
use App\Http\Controllers\Api\adminstration\auth\PasswordController;
use App\Http\Controllers\Api\adminstration\auth\ForgotPasswordController;

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


Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum', 'adminstration_admin');
});
Route::post('forgot-password', [ForgotPasswordController::class, 'forgot']);
Route::post('reset-password', [ForgotPasswordController::class, 'reset']);

Route::group(['middleware' => 'auth:sanctum','adminstration_admin'], function () {
    Route::get('/showProfile', [AdminstrationController::class, 'showProfile']);
    Route::post('/updateProfile', [AdminstrationController::class, 'updateProfile']);
    Route::post('/updatePassword', [PasswordController::class, 'updatePassword']);
    Route::post('/addSchool', [SchoolController::class, 'addSchool']);
    Route::get('/showSchool', [SchoolController::class, 'showSchool']);
    Route::post('/updateSchool/{id}', [SchoolController::class, 'updateSchool']);
    Route::post('/deleteSchool/{id}', [SchoolController::class, 'deleteSchool']);
    Route::post('/addEvent', [EventController::class, 'addEvent']);
    Route::get('/showEvent', [EventController::class, 'showEvent']);
    Route::post('/updateEvent/{id}', [EventController::class, 'updateEvent']);
    Route::post('/deleteEvent/{id}', [EventController::class, 'deleteEvent']);
});






// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
