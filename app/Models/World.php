<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;


class World extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'user_id',
        'genders',
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

    public function races()
    {
        return $this->hasMany(Race::class);
    }

    public function descriptives()
    {
        return $this->hasMany(Descriptive::class);
    }

    public function professions()
    {
        return $this->hasMany(Profession::class);
    }

    public function regions()
    {
        return $this->hasMany(Region::class);
    }

    public function stats()
    {
        $stats = [];
        foreach($this->races as $race) {
            $stats[] = [
                'race' => $race->name,
                'average_age%' => round(100*Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', 1)->avg('age')/$race->old_age),
                'children' => Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[0,$race->adulthood+1])->count(),
                'adults' => Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[$race->adulthood,$race->middle_age+1])->count(),
                'middle_age' => Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[$race->middle_age,$race->old_age+1])->count(),
                'old_age' => Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', 1)->where('age','>', $race->old_age)->count(),
                'immortal' => Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', '>',1)->where('age','>', $race->old_age)->count(),
                'living' => Npc::whereIn('region_id', $this->regions->pluck('id')->toArray())->where('race_id',$race->id)->where('alive', '>',0)->count()
            ];
        }
        return $stats;
    }

}
