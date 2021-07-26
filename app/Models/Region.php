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
        'racial_balance',
        'prof_balance',
        'epoch',
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
        'racial_balance' => 'object',
        'prof_balance' => 'object',
    ];


    public function user()
	{
		return $this->belongsTo(User::class);
	}

}
