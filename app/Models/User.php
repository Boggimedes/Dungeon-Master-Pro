<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

// JWT contract
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject {
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'settings' => 'object'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }

	public function professions()
	{
		return $this->hasMany(Profession::class, 'user_id');
	}

    
	public function descriptives()
	{
		return $this->hasMany(Descriptive::class, 'user_id');
	}

	public function races()
	{
		return $this->hasMany(Race::class, 'user_id');
	}
    
	public function spells()
	{
		return $this->hasMany(Spell::class, 'user_id');
	}
    
	public function campaigns()
	{
		return $this->hasMany(Campaign::class, 'user_id');
	}
    
	public function maps()
	{
		return $this->hasMany(Map::class, 'user_id');
	}
    
	public function monsters()
	{
		return $this->hasMany(Monster::class, 'user_id');
	}
    
	public function worlds()
	{
		return $this->hasMany(World::class, 'user_id');
	}
    
	public function scenes()
	{
		return $this->hasMany(Scene::class, 'user_id');
	}
    
	public function effects()
	{
		return $this->hasMany(Effect::class, 'user_id');
	}
    
	public function npcNames()
	{
		return $this->hasMany(NpcName::class, 'user_id');
	}
    
	public function sounds()
	{
		return $this->hasMany(Sound::class, 'user_id');
	}
    
	public function sceneCollections()
	{
		return $this->hasMany(SceneCollection::class, 'user_id');
	}
    
	public function withSearchList()
	{
		$user = $this->toArray();
		$locationList = $this->worlds()->leftJoin('regions','worlds.id','=','regions.world_id')->select('worlds.name as world_name', 'regions.name as region_name', 'worlds.id as world_id', 'regions.id as region_id')->get();
		$i = 0;
		$searchList = [];
		foreach ($locationList as $region) {
			if (!$i++ || $region->world_id != $lastWorld) {
				$lastWorld = $region->world_id;
				$searchList[] = [
					'name' => $region['world_name'] .' | World',
					'id' => $region['world_id'],
					'type' => 'world',
					'url' => '/app/world/' . $region['world_id'] . '/edit',
					'icon' => "ft-globe"
				];
			}

		$searchList[] = [
					'name' => $region['region_name'] .' | Region',
					'id' => $region['region_id'],
					'world_id' => $region['world_id'],
					'type' => 'region',
					'url' => '/app/region/' . $region['region_id'] . '/story',
					'alt_url' => '/region/' . $region['region_id'] . '/map-generator',
					'icon' => "ft-book"
		];

		}
		$user['search_list'] = $searchList;
		return $user;
	}
}
