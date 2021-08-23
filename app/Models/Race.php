<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;


class Race extends Model
{
    public $timestamps = false;
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
        'genders',
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
        'genders' => 'array',
    ];


    public function user()
	{
		return $this->belongsTo(User::class);
	}

    public function getBirthGenderAttribute()
    {
        return key($this->genders[0]);
    }

    public function getOtherGenderAttribute()
    {
        if (count($this->genders) == 1) {
            return key($this->genders[0]);
        } else return key($this->genders[mt_rand(1, count($this->genders) - 1)]);
    }
  
    public function generateName()
    {
        if ($name->count() > 0) {
            return $names->random(1);
        } else return "Npc" . $this->id;

    }

    
}
