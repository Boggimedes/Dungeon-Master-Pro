<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;
use \App\Models\Helpers\NameGenerator\Generator;


class Npc extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'gender',
        'profession_id',
        'alive',
        'married',
        'race_id',
        'spouse_id',
        'birth_parent_id',
        'parent_id',
        'region_id',
        'age',
        'birth_year',
        'generation',
        'abilities',
        'features',
        'notes',
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
        'features' => 'array',
        'events' => 'array',
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
		return $this->belongsTo(Npc::class);
	}

    public function parent()
	{
		return $this->belongsTo(Npc::class);
	}

    public function birthParent()
	{
		return $this->belongsTo(Npc::class);
	}

    public function children()
    {
        return Npc::where(function($q) {
            $q->where('birth_parent_id',$this->id)
                ->orWhere('parent_id',$this->id);
        });
    }
    
    public function getChildrenAttribute()
    {
        return $this->children()->get();
    }
	public function friends()
	{
            return $this->belongsToMany(\App\Models\Npc::class,
			'npc_friend',
			'npc_id',
			'friend_id',
			'id');
	}

	public function enemies()
	{
            return $this->belongsToMany(\App\Models\Npc::class,
			'npc_enemy',
			'npc_id',
			'enemy_id',
			'id');
	}

    public function generateName() 
    {
        $genString = 'fantasy';
        foreach($this->race->genders as $gender) {
            if ($gender[0] == $this->gender) $genString = $gender[1];
        }
        $g = New Generator($genString);
        $this->name =  $g->toString();
        $this->save();
    }

    public function isBirthing()
    {

        return $this->race->genders[0][0] == $this->gender;
    }
    public function isRelated(Npc $npc)
    {
        return in_array($npc->id, $this->family->toArray());
    }
    public function getFamilyAttribute()
    {
        $relatives = collect();
        if ($this->birthingParent && $this->birthingParent->children) $relatives->merge($this->birthingParent->children->pluck('id'));
        if ($this->parent && $this->parent->children) $relatives->merge($this->parent->children->pluck('id'));
        if ($this->children) $relatives->merge($this->children->pluck('id'));
        $relatives->merge(
            [$this->birth_parent_id],
            [$this->parent_id],
        );
        return $relatives;
    }

    public function getLineageAttribute()
    {
        $features = collect($this->features);
        if (!$features->has('lineage')) return "";
        return $features['lineage'];
    }

    public function getLineageNameAttribute()
    {
        $features = collect($this->features);
        if (!$features->has('lineage')) return "";
        $lineage = $features['lineage']['text'];
        return str_replace(['Immortal (',')'],['', ''], $lineage);
    }

    public function setLineageAttribute($value)
    {
        $features = collect($this->features);
        $features['lineage'] = ['name' => 'lineage', 'text' => $value];
        $this->features = $features->values();
    }

    public function setMannerismAttribute($value)
    {
        $features = collect($this->features);
        $features['mannerism'] = ['name' => 'mannerism', 'text' => $value];
        $this->features = $features->values();
    }

    public function getMannerismAttribute()
    {
        $features = collect($this->features);
        if (!$features->has('mannerism')) return "";
        return $features['mannerism'];
    }

    public function setQuirkAttribute($value)
    {
        $features = collect($this->features);
        $features['quirk'] = ['name' => 'quirk', 'text' => $value];
        $this->features = $features->values();
    }

    public function getQuirkAttribute()
    {
        $features = collect($this->features);
        if (!$features->has('quirk')) return "";
        return $features['quirk'];
    }

    public function getMarryAgeAttribute() {
        return $this->race->adulthood - $this->race->middle_age/12;
    }

    public function getAgeGroupAttribute() {
        if ($this->age < $this->race->adulthood) return 'youth';
        if ($this->age < $this->race->middle_age) return 'adult';
        if ($this->age < $this->race->old_age) return 'middle age';
        if ($this->age < $this->race->venerable) return 'old age';
        return 'venerable';
    }
    public function addEvent($event) {
        $events = $this->events;
        $events[] = $event;
        $this->events = $events;
        return $this;
    }
}
