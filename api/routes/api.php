<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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



/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/me', [AuthController::class, 'me'])->name('me');

Route::resource('products',ProductController::class);
Route::get('products/lista/aleatorio',[ProductController::class,'productosAleatorios']);

Route::middleware('auth:api')->group(function () {
   Route::resource('users',UserController::class);
   
   Route::resource('categories',CategorieController::class);
   
   Route::post('products/{id}',[ProductController::class,'update']);
});
Route::resource('orders',OrderController::class);