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
    return view('welcome');
});
Route::post('interest', 'Common@interested');

Route::get('login/', function () {
    return view('app');
})->name('login');

Route::get('app/', function () {
    return view('app');
});

Route::get('signup/', function () {
    return view('app');
});

Route::get('welcome/', function () {
    return view('welcome')->with('interested', false);
});

Route::get('/', function () {
    return view('welcome')->with('interested', false);
});

Route::group(['middleware' => []], function () {
    Route::get('region/{region}/map', 'WorldController@getMap');
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