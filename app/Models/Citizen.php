<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;


class Citizen extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'family_name',
        'gender',
        'profession_id',
        'alive',
        'married',
        'race_id',
        'spouse_id',
        'mother_id',
        'father_id',
        'region_id',
        'age',
        'birth_year',
        'generation',
        'mannerisms',
        'lineage',
        'quirks',
        'abilities',
        'features',
        'notes',

];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
    ];

    public function user()
	{
		return $this->belongsTo(User::class);
	}

    public function profession()
	{
		return $this->belongsTo(Profession::class);
	}

    public function race()
	{
		return $this->belongsTo(Race::class);
	}

    public function region()
	{
		return $this->belongsTo(Region::class);
	}

    public function spouse()
	{
		return $this->belongsTo(Citizen::class);
	}

    public function father()
	{
		return $this->belongsTo(Citizen::class);
	}

    public function mother()
	{
		return $this->belongsTo(Citizen::class);
	}

	public function children()
	{
            return $this->belongsToMany(\App\Models\Citizen::class,
			'citizen_child',
			'parent_id',
			'child_id',
			'id');
	}

	public function friends()
	{
            return $this->belongsToMany(\App\Models\Citizen::class,
			'citizen_friend',
			'citizen_id',
			'friend_id',
			'id');
	}

	public function enemies()
	{
            return $this->belongsToMany(\App\Models\Citizen::class,
			'citizen_enemy',
			'citizen_id',
			'enemy_id',
			'id');
	}

}