<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;


class Effect extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'desc',
        'sounds',
        'volume',
        'pre_delay',
        'loop',
        'delay_min',
        'delay_max',
        'optional',
        'seq',
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

}
