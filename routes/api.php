<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user-profile', 'AuthController@userProfile');
});

Route::group(['middleware' => ['api']], function ($router) {
	Route::get('monsters/{term?}', 'MonsterController@getMonsters');
	Route::post('monster', 'MonsterController@addMonster');
	Route::put('monster', 'MonsterController@updateMonster');
	Route::delete('monster', 'MonsterController@deleteMonster');

	Route::get('campaigns/{term?}', 'StoryController@getCampaigns');
	Route::get('campaign', 'StoryController@getCampaign');
	Route::post('map', 'StoryController@getMap');

});