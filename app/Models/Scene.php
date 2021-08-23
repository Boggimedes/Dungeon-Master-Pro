<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;


class Scene extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'img',
        'desc',
        'volume',
        'fade_in',
        'fade_out',
        'scene_solo',
        'user_id',
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

	public function effects()
	{
            return $this->belongsToMany(\App\Models\Effect::class,
			'scene_effect',
			'scene_id',
			'effect_id',
			'id');
	}
}
