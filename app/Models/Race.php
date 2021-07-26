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
        'adulthood',
        'middle_age',
        'old_age',
        'venerable',
        'max_age',
        'friend_rate',
        'enemy_rate',
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

}
