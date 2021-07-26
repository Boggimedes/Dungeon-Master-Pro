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
        'page',
        'challenge_rating',
        'speed',
        'armor_class',
        'armor_class_notes',
        'challenge_rating',
        'hit_points',
        'desc',
        'sounds',
        'vol',
        'initiative',
        'str',
        'dex',
        'con',
        'int',
        'wis',
        'cha',
        'str_save',
        'dex_save',
        'con_save',
        'int_save',
        'wis_save',
        'cha_save',
        'senses',
        'special',
        'environment',
        'skills',
        'attacks',
        'size',
        'legendary',
        'legendary_actions',
        'image',
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
        'skills' => 'object',
        'attacks' => 'object',
    ];


    public function user()
	{
		return $this->belongsTo(User::class);
	}

}
