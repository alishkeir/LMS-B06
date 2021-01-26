<?php

use Illuminate\Support\Facades\Route;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',

], function ($router) {

    Route::resource('/teachers', 'TeacherController');
    Route::post('register', 'JWTAuthController@register');
    Route::post('login', 'JWTAuthController@login');
    Route::post('logout', 'JWTAuthController@logout');
    Route::post('refresh', 'JWTAuthController@refresh');
    Route::get('profile', 'JWTAuthController@profile');

    Route::get("students", "StudentsController@index");
    Route::post("students", "StudentsController@store");
    Route::get("students/{id}", "StudentsController@show");
    Route::put("students/{id}", "StudentsController@update");
    Route::delete('students/{id}', "StudentsController@destroy");
    
    Route::resource("classes", "ClassesController");
    // Route::get("classes","ClassesController@index");
    // Route::post("classes","ClassesController@store");
    // Route::get("classes/{id}","ClassesController@show");
    // Route::put("classes/{id}","ClassesController@update");
    // Route::delete("classes/{id}","ClassesController@destroy");

    Route::resource("sections", "SectionsController");
    // Route::get("sections","SectionsController@index");
    // Route::post("sections","SectionsController@store");
    // Route::get("sections/{id}","SectionsController@show");
    // Route::put("sections/{id}","SectionsController@update");
    // Route::delete("sections/{id}","SectionsController@destroy");


});



// Route::get("students", "StudentsController@index");
// Route::post("students", "StudentsController@store");
// Route::get("students/{id}", "StudentsController@show");
// Route::put("students/{id}", "StudentsController@update");
// Route::delete('students/{id}', "StudentsController@destroy");
