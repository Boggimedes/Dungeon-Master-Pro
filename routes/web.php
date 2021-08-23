<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});
Route::group(['middleware' => []], function () {
    Route::any('/app{all}', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/full{all}', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/pages{all}', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/page{all}', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/content{all}', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/login', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/signup', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
    Route::any('/company{all}', function () {
        return view('app');
    })->where('all', '^(?!api|assets).*$');
     Route::get('{any}', function () {
        return view('app');
     })->where('any', '.*');
 
 });