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

    Route::get('world/create', 'WorldController@createWorld');
    Route::get('world/{world}', 'WorldController@getWorld');
    Route::get('world/fr/{region}', 'WorldController@getWorldFromRegion');
    Route::post('world/{world}/region/add', 'WorldController@addRegion');
    Route::delete('region/{region}', 'WorldController@deleteRegion');
    Route::put('region/{region}', 'WorldController@saveRegion');
    Route::post('region/{region}', 'WorldController@saveRegion');
    Route::get('region/{region}', 'WorldController@getRegion');
    Route::get('region/{region}/seed', 'WorldController@seedRegion');
    Route::get('region/{region}/clear', 'WorldController@clearRegion');
    Route::get('region/{region}/age/{years}', 'WorldController@ageRegion');
    Route::get('region/{region}/npcs', 'WorldController@getNpcs');
    Route::get('region/{region}/npc-list', 'WorldController@getNpcList');
    Route::post('region/{region}/upload-map', 'WorldController@uploadMap');
    Route::put('npc/{npc}/generate-features', 'WorldController@generateFeatures');
    Route::put('region/{region}/poi', 'WorldController@updatePOI');
    Route::put('region/{region}/svg', 'WorldController@updateSVG');
    Route::put('npc/{npc}', 'WorldController@updateNpc');
    Route::get('npc/{npc}', 'WorldController@getNpc');
    Route::get('region/{region}/{type}/{i}', 'WorldController@getPOI');
    Route::post('region/{region}/{type}/{i}/{npc}', 'WorldController@attachNPC');
    Route::post('region/{region}/create-poi', 'WorldController@createPOI');
    Route::delete('region/{region}/{type}/{i}/{npc}', 'WorldController@detachNPC');

});