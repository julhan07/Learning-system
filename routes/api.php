<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassRoomController;
use App\Http\Controllers\ClassRoomStudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/login", [App\Http\Controllers\AuthController::class, 'login']);

Route::middleware(['return-json','api-auth'])->group(function () {
    Route::get("/user/list", [UserController::class, 'index']);

    Route::get("/user/me", [UserController::class, 'showMe']);
    Route::get("/user/role", [UserController::class, 'showRole']);
    Route::get("/user/{id}", [UserController::class, 'show']);

    Route::post("/user/create", [UserController::class, 'create']);
    Route::put("/user/{id}", [UserController::class, 'update']);
    Route::delete("/user/{id}", [UserController::class, 'destroy']);


    // teacher
    Route::get("/teacher/list", [TeacherController::class, 'index']);
    Route::post("/teacher/create", [TeacherController::class, 'create']);
    Route::put("/teacher/{id}", [TeacherController::class, 'update']);
    Route::get("/teacher/{id}", [TeacherController::class, 'show']);
    Route::delete("/teacher/{id}", [TeacherController::class, 'destroy']);

    // student
    Route::get("/student/list", [StudentController::class, 'index']);
    Route::post("/student/create", [StudentController::class, 'create']);
    Route::put("/student/{id}", [StudentController::class, 'update']);
    Route::get("/student/{id}", [StudentController::class, 'show']);
    Route::delete("/student/{id}", [StudentController::class, 'destroy']);
    // class_room
    
    Route::get("/class_room/list", [ClassRoomController::class, 'index']);
    Route::post("/class_room/create", [ClassRoomController::class, 'create']);
    Route::put("/class_room/{id}", [ClassRoomController::class, 'update']);
    Route::get("/class_room/{id}", [ClassRoomController::class, 'show']);
    Route::delete("/class_room/{id}", [ClassRoomController::class, 'destroy']);

    Route::get("/class_room/{id}/students", [ClassRoomStudentController::class, 'index']);

    // class_room_student

    Route::post("/class_room_student/create", [ClassRoomStudentController::class, 'create']);
});

Route::get("/authentication", function (Request $request) {
    return array(
        'status' => 'error',
        'message' => 'unauthentication',
    );
})->name("authentication");